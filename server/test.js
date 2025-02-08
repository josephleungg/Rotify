import { scrapeWebpage } from './utils/webscraperService.js';
import { generateOpenAIResponse } from './utils/openaiService.js'

// calls the web scraper function and then sends to openai for summarization
// this function is called in app.js for sockets
async function summarizeContent() {
    try {
        const scrapedContent = await scrapeWebpage('https://en.wikipedia.org/wiki/Blackjack');
        console.log(scrapedContent);
    } catch (error) {
        console.error('Error scraping webpage:', error);
    }
}

async function testOpenAIStreaming() {
    try {
        await generateOpenAIResponse();
    } catch (error) {
        console.error('Error streaming OpenAI response:', error);
    }
}

testOpenAIStreaming();