// Run after editing public/icon.svg: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
const icons = [{size:32,path:'public/favicon-32.png'},{size:180,path:'public/apple-touch-icon.png'},{size:192,path:'public/icon-192.png'},{size:512,path:'public/icon-512.png'}];
for (const {size,path} of icons) await sharp('public/icon.svg').resize(size,size).png().toFile(path);
// ICO containing PNG frames for browsers that request /favicon.ico directly.
const frames = await Promise.all([16,32,48].map(size => sharp('public/icon.svg').resize(size,size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1,2); header.writeUInt16LE(frames.length,4);
let offset = header.length;
frames.forEach((frame,i)=>{ const at=6+16*i; header[at]=[16,32,48][i];header[at+1]=header[at]; header.writeUInt16LE(1,at+4);header.writeUInt16LE(32,at+6);header.writeUInt32LE(frame.length,at+8);header.writeUInt32LE(offset,at+12);offset+=frame.length; });
await writeFile('public/favicon.ico',Buffer.concat([header,...frames]));
