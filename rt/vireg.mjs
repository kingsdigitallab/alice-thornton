import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import csvParser from 'csv-parser';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';

const REFS_PATH = 'refs.csv';
const DOMAIN = 'http://localhost:8082';
const SCREENSHOTS_BASELINE_PATH = 'screenshots/accepted';
const SCREENSHOTS_LATEST_PATH = 'screenshots/latest';
const SCREENSHOTS_DIFF_PATH = 'screenshots/diff';

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

    // ensure diff directory exists
    if (!fs.existsSync(SCREENSHOTS_DIFF_PATH)) {
      fs.mkdirSync(SCREENSHOTS_DIFF_PATH, { recursive: true });
    }
  }

  async run() {
    const args = process.argv.slice(2);

    if (args.length > 0) {
      const action = args[0];

      switch (action) {
        case 'fetch':
          this.actionFetch();
          break;
        case 'accept':
          this.actionAccept();
          break;
        case 'diff':
          this.actionDiff();
          break;
        default:
          console.log(`Unknown action: ${action}`);
          break;
      }
    } else {
      console.log('No action specified. Please provide an action as the first argument.');
    }
  }

  async actionFetch() {
    await this.init()

    await this.removeLatestScreenshots()

    let url = `${DOMAIN}/books/`
    await this.takeScreenshot(url)

    await this.browser.close()
  }

  async actionAccept() {
    if (!fs.existsSync(SCREENSHOTS_BASELINE_PATH)) {
      fs.mkdirSync(SCREENSHOTS_BASELINE_PATH, { recursive: true });
    }

    if (fs.existsSync(SCREENSHOTS_LATEST_PATH)) {
      fs.readdirSync(SCREENSHOTS_LATEST_PATH).forEach(file => {
        if (file.endsWith('.png')) {
          const sourcePath = path.join(SCREENSHOTS_LATEST_PATH, file);
          const destinationPath = path.join(SCREENSHOTS_BASELINE_PATH, file);
          fs.copyFileSync(sourcePath, destinationPath);
        }
      });
    } else {
      console.log('No latest screenshots found.');
    }
  }

  async actionDiff() {
    await this.init();

    let comparedPairs = 0;
    let differentPairs = 0;

    if (fs.existsSync(SCREENSHOTS_LATEST_PATH) && fs.existsSync(SCREENSHOTS_BASELINE_PATH)) {
      const latestFiles = new Set(fs.readdirSync(SCREENSHOTS_LATEST_PATH));
      const baselineFiles = new Set(fs.readdirSync(SCREENSHOTS_BASELINE_PATH));

      for (const file of latestFiles) {
        if (file.endsWith('.png') && baselineFiles.has(file)) {
          const screenshotPath1 = path.join(SCREENSHOTS_LATEST_PATH, file);
          const screenshotPath2 = path.join(SCREENSHOTS_BASELINE_PATH, file);
          const diffScreenshotPath = path.join(SCREENSHOTS_DIFF_PATH, file);

          const result = await this.compareScreenshots(screenshotPath1, screenshotPath2, diffScreenshotPath);

          console.log(`${result ? 'SAME' : 'DIFF'} ${file}`);
          comparedPairs++;
          if (!result) {
            differentPairs++;
          }
        }
      }

      console.log(`Compared pairs: ${comparedPairs}`);
      console.log(`Different pairs: ${differentPairs}`);

    } else {
      console.log('Either latest or baseline screenshots not found.');
    }

    await this.browser.close();
  }

  async compareScreenshots(imagePath1, imagePath2, diffImagePath) {
    const image1 = fs.readFileSync(imagePath1);
    const image2 = fs.readFileSync(imagePath2);

    const img1 = PNG.sync.read(image1);
    const img2 = PNG.sync.read(image2);

    if (img1.width !== img2.width || img1.height !== img2.height) {
      console.log('Images have different dimensions.');
      return false;
    }

    const diffImg = new PNG({ width: img1.width, height: img1.height });

    const diffCount = pixelmatch(img1.data, img2.data, diffImg.data, img1.width, img1.height, { threshold: 0.1 });

    if (diffCount > 0) {
      fs.writeFileSync(diffImagePath, PNG.sync.write(diffImg));
      return false;
    }

    return true;
  }

  async takeScreenshot(url) {
    console.log(`Screenshot: ${url}`);
    await this.webPage.goto(url);
    const relativeUrl = url.replace(DOMAIN, '');
    const validFileName = relativeUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase().replace(/^_+|_+$/g, '');
    const screenShotPath = `${SCREENSHOTS_LATEST_PATH}/${validFileName}.png`;
    await this.webPage.screenshot({ path: screenShotPath });
    console.log(screenShotPath)
  }

  async removeLatestScreenshots() {
    // remove all latest screenshots
    if (fs.existsSync(SCREENSHOTS_LATEST_PATH)) {
        fs.readdirSync(SCREENSHOTS_LATEST_PATH).forEach(file => {
            if (file.endsWith('.png')) {
                fs.unlinkSync(`${SCREENSHOTS_LATEST_PATH}/${file}`);
            }
        })
    }
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

// diff.html
/*
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Image Diff</title>
<style>
body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
canvas { border: 1px solid black; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/imagediff/2.0.0/imagediff.min.js"></script>
</head>
<body>
<input type="text" id="image1">
<input type="text" id="image2">
<button>Generate Diff</button>

<canvas id="diffCanvas"></canvas>

<script>
document.querySelector('button').addEventListener('click', async () => {
  const img1 = document.createElement('img');
  img1.src = document.getElementById('image1').value;
  await new Promise(resolve => img1.onload = resolve);

  const img2 = document.createElement('img');
  img2.src = document.getElementById('image2').value;
  await new Promise(resolve => img2.onload = resolve);

  const diffCanvas = document.getElementById('diffCanvas');
  imagediff.drawImageDiff(diffCanvas, img1, img2);
});
</script>
</body>
</html>
*/
