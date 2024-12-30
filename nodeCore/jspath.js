import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

console.log(import.meta.url)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const paths = path.join(__dirname, "../../index.js", "index.js")
console.log(paths)