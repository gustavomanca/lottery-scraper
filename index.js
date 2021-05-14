const puppeteer = require('puppeteer')

const URL = 'http://loterias.caixa.gov.br/wps/portal/loterias/landing'

async function execute() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const data = await page.evaluate(() => {
    const results = []
    const items = document.querySelectorAll('.lotofacil td')
    items.forEach(({ innerHTML }) => results.push(innerHTML))

    const description = document.querySelector(
      '.lotofacil ~ p.description'
    ).innerText

    return {
      results,
      description
    }
  })

  console.log({ data })

  await browser.close()
}

execute()
