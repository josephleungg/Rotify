import puppeteer from 'puppeteer';
import fs from 'fs';

const scrapeWebpage = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract the content of the body, title, and meta tags, excluding script and style tags
        const pageContent = await page.evaluate(() => {
            // Remove script and style tags within the body
            document.querySelectorAll('body script, body style').forEach(el => el.remove());

            const bodyContent = document.body.innerHTML;
            const titleContent = document.title;
            const metaTags = Array.from(document.getElementsByTagName('meta')).map(meta => meta.outerHTML);
            return {
                body: bodyContent,
                title: titleContent,
                meta: metaTags
            };
        });

        console.log('Page Content scraped successfully');

        await browser.close();

        // Save the extracted content to a file
        const contentToSave = `
            <title>${pageContent.title}</title>
            ${pageContent.meta.join('\n')}
            <body>${pageContent.body}</body>
        `;
        fs.writeFileSync('page_content.html', contentToSave);
        console.log('Page content saved to page_content.html');

        // Return the extracted content for later use
        return pageContent;
    } catch (error) {
        console.error('Error scraping the webpage:', error);
        return null;
    }
};

// Replace 'https://example.com' with the URL you want to scrape
const url = 'https://www.venetianlasvegas.com/resort/casino/table-games/how-to-play-blackjack.html';
scrapeWebpage(url).then(pageContent => {
    if (pageContent) {
        // Log the extracted content to check if it's correct
        // Call other functions and pass the extracted content as needed
        // otherFunction(pageContent);
    }
});