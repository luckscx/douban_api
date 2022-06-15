const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

let browser;

const start = async function () {
  return await puppeteer.launch({
    userDataDir: '/tmp/chrome'
  });
};

module.exports = async function (url) {
  if (!browser) {
    browser = await start();
  }
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41"
  );

  const blockedDomains = [
    "https://pagead2.googlesyndication.com",
    "https://creativecdn.com",
    "https://www.googletagmanager.com",
    "https://cdn.krxd.net",
    "https://adservice.google.com",
    "https://cdn.concert.io",
    "https://z.moatads.com",
    "https://cdn.permutive.com",
  ];
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (req.resourceType() === "image") {
      req.abort();
    } else if (blockedDomains.some((d) => url.startsWith(d))) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url, {
    waitUntil: [
      "networkidle2", //在 500ms 内网络连接个数不超过 2 个
    ],
  });
  console.log(3);
  const metrics = await page.metrics();
  const content = await page.content();

  return cheerio.load(content, { decodeEntities: false });
};
