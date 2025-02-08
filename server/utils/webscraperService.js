import puppeteer from 'puppeteer';

// utility function to scrape the content from any webpage
export async function scrapeWebpage(url) {
    try {
        console.log('--------------------------------------------------');
        console.log('Scraping webpage for content...');
        console.log('--------------------------------------------------');
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // extract the text content of the body, title, and meta tags
        const pageContent = await page.evaluate(() => {
            // remove script and style tags within the body
            document.querySelectorAll('body script, body style').forEach(el => el.remove());

            const bodyText = document.body.innerText;
            const titleText = document.title;
            const metaTags = Array.from(document.getElementsByTagName('meta')).map(meta => meta.content).join('\n');
            return {
                body: bodyText,
                title: titleText,
                meta: metaTags
            };
        });

        console.log('--------------------------------------------------');
        console.log('Page Content scraped successfully');
        console.log('--------------------------------------------------');

        await browser.close();

        // limit the body content to 10,000 characters
        const limitedBodyContent = pageContent.body.substring(0, 10000);

        // save the extracted text content to a string
        const content = `
            Title: ${pageContent.title}
            Meta: ${pageContent.meta}
            Body: ${limitedBodyContent}
        `;

        // return the extracted text content for later use
        return (content);
    } catch (error) {
        console.error('Error scraping the webpage:', error);
        return null;
    }
};