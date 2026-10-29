// Gera as versões leves das artes e vídeos usadas pelo site.
//   media-src/img/**      -> public/media/art/{full,thumb}/**.webp  (+ src/data/media-sizes.json)
//   media-src/motion/*    -> public/media/motion/*.mp4 + poster .webp   (precisa do ffmpeg no PATH)
// Rode com `npm run media`. Arquivos que já existem e são mais novos que o original são pulados.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC_IMG = join(ROOT, 'media-src/img');
const SRC_MOTION = join(ROOT, 'media-src/motion');
const OUT_ART = join(ROOT, 'public/media/art');
const OUT_MOTION = join(ROOT, 'public/media/motion');
const SIZES_JSON = join(ROOT, 'src/data/media-sizes.json');

const FULL_MAX = 2200;
const THUMB_MAX = 760;
// ícones do site antigo, não são artes
const SKIP = new Set(['facebook', 'ico', 'insta', 'instagram', 'livepix', 'patreon', 'paypal', 'tt', 'whatsapp', 'tcc', 'github']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const isFresh = (out, src) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;

async function images() {
  if (!existsSync(SRC_IMG)) return {};
  const sizes = {};
  const files = walk(SRC_IMG).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  for (const file of files) {
    const id = relative(SRC_IMG, file).replace(/\\/g, '/').replace(extname(file), '');
    if (SKIP.has(id)) continue;
    const full = join(OUT_ART, 'full', `${id}.webp`);
    const thumb = join(OUT_ART, 'thumb', `${id}.webp`);
    mkdirSync(dirname(full), { recursive: true });
    mkdirSync(dirname(thumb), { recursive: true });

    const meta = await sharp(file).metadata();
    sizes[id] = { w: meta.width, h: meta.height };
    if (isFresh(full, file) && isFresh(thumb, file)) continue;

    const base = sharp(file, { limitInputPixels: false }).rotate();
    await base.clone().resize({ width: FULL_MAX, height: FULL_MAX, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toFile(full);
    await base.clone().resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(thumb);
    console.log('img  ', id);
  }
  return sizes;
}

function videos() {
  if (!existsSync(SRC_MOTION)) return;
  mkdirSync(OUT_MOTION, { recursive: true });
  for (const name of readdirSync(SRC_MOTION)) {
    const src = join(SRC_MOTION, name);
    const id = name.replace(extname(name), '');
    const mp4 = join(OUT_MOTION, `${id}.mp4`);
    const poster = join(OUT_MOTION, `${id}.webp`);
    if (isFresh(mp4, src) && isFresh(poster, src)) continue;
    const isGif = /\.gif$/i.test(name);
    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', src,
      '-vf', "scale='min(1280,iw)':-2:flags=lanczos,format=yuv420p",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-movflags', '+faststart',
      ...(isGif ? ['-an'] : ['-c:a', 'aac', '-b:a', '128k']),
      mp4,
    ]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', mp4, '-frames:v', '1', '-vf', "scale='min(960,iw)':-2", poster]);
    console.log('video', id);
  }
}

const sizes = await images();
if (Object.keys(sizes).length) writeFileSync(SIZES_JSON, JSON.stringify(sizes, null, 2) + '\n');
videos();
console.log('pronto');
