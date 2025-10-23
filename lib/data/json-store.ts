// lib/data/json-store.js

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Ensures the data directory exists, handling read-only file systems.
 * @param {object} options
 * @param {boolean} [options.writable=false] - If true, throws an error if the file system is read-only during a write operation.
 * @returns {Promise<void>}
 */
async function ensureDirectory({ writable = false } = {}) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    const code = (error)?.code; // Using any for error due to NodeJS.ErrnoException being TS-specific

    if (code === 'EEXIST') {
      return;
    }

    if (code === 'EROFS') {
      // The deployment file system is read-only (e.g. Vercel serverless).
      // Reads can still proceed because the directory already exists in the bundle,
      // but writes should surface a clearer error upstream.
      if (writable) {
        const message =
          'JSON data store is not writable on this environment (read-only file system)';
        const err = new Error(message);
        err.code = code;
        throw err;
      }
      return;
    }

    throw error;
  }
}

/**
 * Reads a JSON file from the data directory.
 * @template T
 * @param {string} filename - The name of the file to read.
 * @returns {Promise<T>} The parsed JSON data.
 */
export async function readJsonFile(filename) {
  await ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Writes data to a JSON file in the data directory.
 * @template T
 * @param {string} filename - The name of the file to write.
 * @param {T} data - The data to write, which will be stringified.
 * @returns {Promise<void>}
 */
export async function writeJsonFile(filename, data) {
  await ensureDirectory({ writable: true });
  const filePath = path.join(DATA_DIR, filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    const code = (error)?.code; // Using any for error due to NodeJS.ErrnoException being TS-specific
    if (code === 'EROFS') {
      const err = new Error(
        'JSON data store is not writable on this environment (read-only file system)'
      );
      err.code = code;
      throw err;
    }
    throw error;
  }
}
