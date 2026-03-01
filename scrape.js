const { chromium } = require('playwright');

const seeds = [56, 57, 58, 59, 60, 61, 62, 63, 64, 65];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table', { timeout: 10000 });

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => parseFloat(cell.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const seedTotal = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${numbers.length} numbers, sum = ${seedTotal}`);
    grandTotal += seedTotal;
  }

  console.log(`\nGRAND TOTAL (all seeds): ${grandTotal}`);
  await browser.close();
})();
