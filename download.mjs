import fs from 'fs';
import https from 'https';
import path from 'path';

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307 || response.statusCode === 308) {
        return resolve(download(response.headers.location, dest));
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  fs.mkdirSync(path.join(process.cwd(), 'public', 'logos'), { recursive: true });
  try {
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Naver_wordmark.svg/512px-Naver_wordmark.svg.png', './public/logos/naver.png');
    console.log('Downloaded Naver logo');
    
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kakao_logo_%282015%29.svg/512px-Kakao_logo_%282015%29.svg.png', './public/logos/kakao.png');
    console.log('Downloaded Kakao logo');
  } catch (err) {
    console.error(err);
  }
}

run();
