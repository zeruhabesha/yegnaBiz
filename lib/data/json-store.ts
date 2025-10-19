import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

async function ensureDirectory() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

export async function readJsonFile<T>(filename: string): Promise<T> {
  await ensureDirectory()
  const filePath = path.join(DATA_DIR, filename)
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as T
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDirectory()
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}
