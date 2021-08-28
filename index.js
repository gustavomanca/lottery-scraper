const http = require('http')

const puppeteer = require('puppeteer')

const URL = 'http://loterias.caixa.gov.br/wps/portal/loterias/landing'

async function scrap() {
  console.time('scraping')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
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
      description,
      results
    }
  })
  await browser.close()

  console.timeEnd('scraping')
  return data
}

const app = http.createServer(async function (_, res) {
  res.setHeader('Content-Type', 'application/json')

  const data = await scrap()

  res.end(JSON.stringify(data))
})

app.listen(process.env.PORT || 5000)
