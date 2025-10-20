import { promises as fs } from "fs";
import path from "path";

const projectRoot = process.cwd();
const nextDir = path.join(projectRoot, ".next");

async function ensureFileExists(target, source) {
  const dir = path.dirname(target);
  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile(source, target);
  console.log(`Created ${path.relative(projectRoot, target)} from ${path.relative(projectRoot, source)}`);
}

async function ensureLayoutCss() {
  const cssDir = path.join(nextDir, "static", "css");
  const layoutPath = path.join(cssDir, "app", "layout.css");
  try {
    await fs.access(layoutPath);
    return;
  } catch {
    // continue
  }

  let cssFiles = [];
  try {
    cssFiles = await fs.readdir(cssDir);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return;
    }
    throw error;
  }

  const sourceName = cssFiles.find((file) => file.endsWith(".css"));
  if (!sourceName) {
    return;
  }

  const sourcePath = path.join(cssDir, sourceName);
  await ensureFileExists(layoutPath, sourcePath);
}

async function run() {
  await ensureLayoutCss();
}

run().catch((error) => {
  console.error("[ensure-next-assets] failed", error);
  process.exit(1);
});
