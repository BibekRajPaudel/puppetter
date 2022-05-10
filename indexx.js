const { uniqueSort } = require('domutils');
const { listenerCount } = require('process');
const puppeteer = require('puppeteer')

;(async() => {
    const browser =await puppeteer.launch({headless: false})

    const page = await browser.newPage()

    await page.goto('https://www.google.com')
    const uniques = new Set();

    page.on ('response', async response => {
        if(response.url().includes('/complete/search?q=puppteer')){
            const suggestions = await page.evaluate(() => {
                Array.from(
                    document.querySelectorAll("ul[role='listbox'] li .sbl1"),
                    element => element.textContent
                )
            })
            suggestions.foreEach(s => uniques.add(s));
        }
    })

    await page.type("*[name='q']", 'puppteer get', { delay:500})

    console.log(unique)

    await browser.close()
})()