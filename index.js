const puppeteer = require('puppeteer');
const escreve = require('./src/uteis/escreve.js');

module.exports = () => {
  async function main() {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 1080 }, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', slowMo: 20, ignoreDefaultArgs: ["--enable-automation"], args: ["--start-maximized"] });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 })
    await page.goto('https://app.gestta.com.br/#/login/auth?isInitialPage=true', { waitUntil: 'networkidle0' })
    await page._client.send('Page.setDownloadBehavior', {
      downloadPath: 'C:\\trabalho\\robos\\integracaoGesttaGooglePlanilhas\\src\\downloads',
      behavior: 'allow'
    })

    try {
      await page.waitForSelector('#email')
      await page.type('#email', 'nfe@uphold.com.br')
      await page.type('#password', 'Nfe@#uphold2021')
      await page.click('#login-auth-screen > div > div > div.login-box.text-center.animated.fadeIn > div > form > div.row.no-margin > div > button')

      await page.waitForTimeout(3000)

      await page.click('#gestta-menu > div > div.menuItemsContainerScroller-0-2-3 > div > div > div:nth-child(3) > span > div')

      await page.waitForSelector('#report-list > div:nth-child(3) > div > ul > li > a')
      await page.click('#report-list > div:nth-child(3) > div > ul > li > a')

      await page.waitForSelector('#page-wrapper > div.main-ui-content-view > div > div > div > div > div.ibox-content.no-padding > div > div > div.row.no-margin.flexmonster-header-filter-wrapper > div.col-xs-12.custom-flexmonster-actions-wrapper.no-padding > ul.custom-flexmonster-actions-group.custom-saving-group > li.custom-flexmonster-action.export-action.static')
      await page.click('#page-wrapper > div.main-ui-content-view > div > div > div > div > div.ibox-content.no-padding > div > div > div.row.no-margin.flexmonster-header-filter-wrapper > div.col-xs-12.custom-flexmonster-actions-wrapper.no-padding > ul.custom-flexmonster-actions-group.custom-saving-group > li.custom-flexmonster-action.export-action.static')

      await page.waitForTimeout(3000)

      await page.waitForSelector('#page-wrapper > div.main-ui-content-view > div > div > div > div > div.ibox-content.no-padding > div > div > div.row.no-margin.flexmonster-header-filter-wrapper > div.col-xs-12.custom-flexmonster-actions-wrapper.no-padding > ul.custom-flexmonster-actions-group.custom-saving-group > li.custom-flexmonster-action.export-action.static > ul > li.custom-flexmonster-dropdown-action.export-to-csv-action > i')
      await page.click('#page-wrapper > div.main-ui-content-view > div > div > div > div > div.ibox-content.no-padding > div > div > div.row.no-margin.flexmonster-header-filter-wrapper > div.col-xs-12.custom-flexmonster-actions-wrapper.no-padding > ul.custom-flexmonster-actions-group.custom-saving-group > li.custom-flexmonster-action.export-action.static > ul > li.custom-flexmonster-dropdown-action.export-to-csv-action > i')
      await page.waitForTimeout(5000)

      escreve()

      await browser.close()
    } catch (error) {
      await browser.close()
      return await main()
    }
  };
  (async () => main())()
};