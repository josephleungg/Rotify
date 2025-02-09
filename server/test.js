import { scrapeWebpage } from './utils/webscraperService.js';
import { summarizeContent, convertFileBufferToBase64 } from './utils/openaiService.js'

// calls the web scraper function and then sends to openai for summarization
// this function is called in app.js for sockets
async function scrapeContent(url) {
    try {
        console.log('Scraping webpage for content...');

        // scrape the content from the webpage
        const scrapedContent = await scrapeWebpage(url);
        
        // send scraped content to GPT 4o mini for summarization
        try {
            await summarizeContent(scrapedContent).then((response) => { console.log(response) });
        } catch (error) {
            console.error('Error generating OpenAI response:', error);
        }

    } catch (error) {
        console.error('Error scraping webpage:', error);
    }
}

scrapeContent("https://foodess.com/article/how-to-make-a-cake-from-scratch/");