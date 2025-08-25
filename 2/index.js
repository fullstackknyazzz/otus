import fs from "fs/promises";
import path from "path";


const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Использование: node index.js <dir> [-d depth]");
  process.exit(1);
}


const targetDir = path.resolve(args[0]);

const depthFlagIndex = args.findIndex((a) => a === "-d" || a === "--depth");
let maxDepth = Infinity;
if (depthFlagIndex !== -1 && args[depthFlagIndex + 1]) {
  maxDepth = Number(args[depthFlagIndex + 1]);
  if (isNaN(maxDepth)) maxDepth = Infinity;
}

let dirCount = 0;
let fileCount = 0;

async function walk(dir, prefix = "", currentDepth = 0) {
  if (currentDepth > maxDepth) return;

  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Ошибка чтения ${dir}:`, err.message);
    return;
  }

  const lastIndex = entries.length - 1;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const isLast = i === lastIndex;
    const pointer = isLast ? "└── " : "├── ";
    const childPrefix = prefix + (isLast ? "    " : "│   ");

    console.log(prefix + pointer + entry.name);

    if (entry.isDirectory()) {
      dirCount++;
      if (currentDepth < maxDepth) {
        await walk(path.join(dir, entry.name), childPrefix, currentDepth + 1);
      }
    } else {
      fileCount++;
    }
  }
}

async function main() {
  console.log(path.basename(targetDir));
  await walk(targetDir, "", 1);
  console.log(`\n${dirCount} directories, ${fileCount} files`);
}

main();
