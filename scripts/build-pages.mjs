import {cp,mkdir,readFile,readdir,writeFile,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=path.join(root,'dist');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
await cp(path.join(root,'public'),out,{recursive:true,filter:source=>!source.endsWith('.md')&&!source.endsWith('/assets/photos')});
await mkdir(path.join(out,'assets/photos'),{recursive:true});
const ids=(await import('../public/catalog.js')).catalog.map(g=>g.id);
await Promise.all(ids.map(id=>sharp(path.join(root,'public/assets/photos',id+'.png')).resize({width:900,withoutEnlargement:true}).webp({quality:80}).toFile(path.join(out,'assets/photos',id+'.webp'))));
await mkdir(path.join(root,'public/assets/icons'),{recursive:true});
for(const size of [192,512]){const buffer=await sharp(path.join(root,'public/brand/rove2trove-approved.png')).resize(size,size,{fit:'contain',background:'#faf8f2'}).png().toBuffer();await writeFile(path.join(out,`assets/icons/icon-${size}.png`),buffer);await writeFile(path.join(root,`public/assets/icons/icon-${size}.png`),buffer)}
await writeFile(path.join(out,'runtime.js'),"export const runtime={staticDemo:true,photoExtension:'webp'};\n");
let html=await readFile(path.join(out,'index.html'),'utf8');html=html.replace('LOCAL PROTOTYPE · SAMPLE COLLECTION','GIFT DISCOVERY · SAMPLE COLLECTION').replace('Your brief stays in this session. If AI is configured, it is sent to OpenAI to personalize explanations. No name or contact details needed.','Your brief stays on your device in this demo. No name or contact details needed.');await writeFile(path.join(out,'index.html'),html);
await writeFile(path.join(out,'.nojekyll'),'');
async function files(dir){let result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);result.push(...(entry.isDirectory()?await files(full):[full]))}return result}
const assets=(await files(out)).filter(p=>!['sw.js','precache.json','.nojekyll'].includes(path.basename(p)));
const hash=createHash('sha256');for(const file of assets.sort())hash.update(await readFile(file));
const worker=(await readFile(path.join(out,'sw.js'),'utf8')).replace('BUILD_VERSION',hash.digest('hex').slice(0,16));await writeFile(path.join(out,'sw.js'),worker);
await writeFile(path.join(out,'precache.json'),JSON.stringify(['./',...assets.map(file=>'./'+path.relative(out,file).split(path.sep).join('/'))]));
console.log(`GitHub Pages web app built in dist/: ${ids.length} optimized photos, standalone manifest, offline cache.`);
