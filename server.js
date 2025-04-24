// Node.js (Express example)
const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

app.get("/api/doc", (req, res) => {
  const filePath = path.join(__dirname, "generated_docs", "output.pdf");

  res.download(filePath, "output.pdf"); // or use res.sendFile() if just viewing
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server
