const http = require('http')

const app = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ a: 1 }))
})
app.listen(3000)

// const puppeteer = require('puppeteer')

// const URL = 'http://loterias.caixa.gov.br/wps/portal/loterias/landing'

// async function execute() {
//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox']
//   })
//   const page = await browser.newPage()
//   await page.goto(URL)

//   const data = await page.evaluate(() => {
//     const results = []
//     const items = document.querySelectorAll('.lotofacil td')
//     items.forEach(({ innerHTML }) => results.push(innerHTML))

//     const description = document.querySelector(
//       '.lotofacil ~ p.description'
//     ).innerText

//     return {
//       results,
//       description
//     }
//   })

//   console.log({ data })

//   await browser.close()
// }

// execute()
