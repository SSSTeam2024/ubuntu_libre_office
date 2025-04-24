// const fs = require("fs");
// const { TemplateHandler, MimeType } = require("easy-template-x");

// const templateFile = fs.readFileSync("input.docx");

// const data = {
//   studentName: "Ali Hassan",
//   department: "Computer Science",
//   submissionDate: "2025-04-21",
//   profileImage: {
//     _type: "image",
//     source: fs.readFileSync("pic.png"),
//     format: MimeType.Jpeg,
//     width: 50,
//     height: 50,
//     altText: "Profile Picture",
//   },
// };

// const handler = new TemplateHandler();
// handler
//   .process(templateFile, data)
//   .then((doc) => {
//     fs.writeFileSync("output.docx", doc);
//     console.log("Document with text and image created!");
//   })
//   .catch((err) => {
//     console.error("Error generating document:", err);
//   });

const fs = require("fs");
const axios = require("axios");
const { TemplateHandler, MimeType } = require("easy-template-x");

async function fetchQRImageBuffer(qrData) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
    qrData
  )}`;
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
}

async function generateDoc() {
  const templateFile = fs.readFileSync("input.docx");

  const fakeData = "Student: Ali Hassan | Dept: CS | Date: 2025-04-21";
  const qrImage = await fetchQRImageBuffer(fakeData);

  const data = {
    studentName: "Ali Hassan",
    department: "Computer Science",
    submissionDate: "2025-04-21",
    open_parenthese: ")",
    closed_parenthese: "(",
    qrCode: {
      _type: "image",
      source: qrImage,
      format: MimeType.Png,
      width: 100,
      height: 100,
      altText: "QR Code",
    },
  };

  const handler = new TemplateHandler();
  const doc = await handler.process(templateFile, data);
  fs.writeFileSync("output.docx", doc);

  console.log("Document with QR code generated!");
}

generateDoc().catch(console.error);

// easy-template-x
