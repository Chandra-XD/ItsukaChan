import fs from 'fs';
import path from 'path';
import nodezip from 'node-zip';
import sharp from 'sharp';
import pdfkit from 'pdfkit';

/**
 * Push image file as a page to pdf file
 * @param {pdfkit|null} pdf - Target pdf object
 * @param {string|buffer} imageFile - Target image file path/data
 * @param {string} pdfName - Target pdf file path to save
 * @returns {pdfkit} Target pdf object
 */
export async function pushImageToPdf(pdf, imageFile, pdfName) {
  const image = sharp(imageFile);
  const metadata = await image.metadata();

  // 画像サイズに合わせたページを追加
  if (!pdf) {
    // PDFファイル新規作成
    pdf = new pdfkit({
      size: [metadata.width, metadata.height],
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    pdf.pipe(fs.createWriteStream(pdfName));
  } else {
    pdf.addPage({
      size: [metadata.width, metadata.height],
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });
  }
  // 画像追加
  pdf.image(imageFile, {
    width: metadata.width,
    height: metadata.height,
    align: 'center',
    valign: 'center',
  });
  return pdf;
}

/**
 * Convert zip file to pdf file
 * @param {string} zipFile - Target zip file path
 * @param {string} pdfFile - Target pdf file path to save
 */
export async function convertZipToPdf(zipFile, pdfFile) {
  const zip = new nodezip(
    fs.readFileSync(zipFile, { encoding: 'binary' }),
    {
      base64: false,
      checkCRC32: true
    }
  );
  let pdf = null;

  for (const fileName of Object.keys(zip.files)) {
    try {
      const imageBuffer = Buffer.from(zip.files[fileName]._data, 'binary');
      pdf = await pushImageToPdf(pdf, imageBuffer, pdfFile);
      console.log('Add:', fileName);
    } catch (e) {
      console.log('Skip:', fileName);
    }
  }

  if (pdf) {
    pdf.end();
  }
}

import {
    fileURLToPath,
    URL
} from 'url'
import chalk from 'chalk'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`))
    import(`${file}?update=${Date.now()}`)
})