const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs").promises;
const uploadPath = "/files/";

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

async function main() {
  const ext = ".pdf";
  const inputPath = path.join(__dirname, `output.docx`);
  const outputPath = path.join(__dirname, `/generated_docs/output.pdf`);

  const docxBuf = await fs.readFile(inputPath);

  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

  await fs.writeFile(outputPath, pdfBuf);
}

main();

// libreoffice
