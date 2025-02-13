import { chromium } from "playwright";
import fs from "fs";
import csvParser from 'csv-parser';
const REFS_PATH = 'refs.csv';
const DOMAIN = 'http://localhost:8082';
const SCREENSHOTS_BASELINE_PATH = 'screenshots/accepted';
const SCREENSHOTS_LATEST_PATH = 'screenshots/latest';

class VisualRegressor {
  constructor() {
    this.rows = [];
  }

  async init() {
    console.log('Initializing VisualRegressor');
    await this.readCSVFile(REFS_PATH);

    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.webPage = await context.newPage();

    // remove all latest screenshots
    if (fs.existsSync(SCREENSHOTS_LATEST_PATH)) {
        fs.readdirSync(SCREENSHOTS_LATEST_PATH).forEach(file => {
            if (file.endsWith('.png')) {
                fs.unlinkSync(`${SCREENSHOTS_LATEST_PATH}/${file}`);
            }
        })
    }
  }

  async run() {
    await this.init()

    let url = `${DOMAIN}/books/`
    await this.testWebPage(url)

    await this.browser.close()
  }

  async testWebPage(url) {
    console.log(`Testing web page: ${url}`);
    await this.webPage.goto(url);
    const relativeUrl = url.replace(DOMAIN, '');
    const validFileName = relativeUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase().replace(/^_+|_+$/g, '');
    const screenShotPath = `${SCREENSHOTS_LATEST_PATH}/${validFileName}.png`;
    await this.webPage.screenshot({ path: screenShotPath });
    console.log(screenShotPath)
  }

  async readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', () => {
          this.rows = results;
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}

let vr = new VisualRegressor()
vr.run()
