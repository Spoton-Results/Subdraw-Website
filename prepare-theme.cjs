const fs = require("node:fs");
const path = require("node:path");

const pagePath = path.join(__dirname, "index.html");
const themePath = path.join(__dirname, "light-theme.css");
fs.accessSync(themePath, fs.constants.R_OK);
const html = fs.readFileSync(pagePath, "utf8");
const link = '<link rel="stylesheet" href="light-theme.css"/>';

if (!html.includes(link)) {
  if (!html.includes("</head>")) {
    throw new Error("Cannot enable light theme: index.html has no closing head tag");
  }
  fs.writeFileSync(pagePath, html.replace("</head>", `  ${link}\n</head>`), "utf8");
}
console.log("SubDraw light-theme stylesheet is linked.");
