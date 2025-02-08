import express from 'express';
import { scrapeWebpage } from '../utils/webscraperService.js';
import { summarizeContent } from '../utils/openaiService.js';

const router = express.Router();

// POST route to summarize content
router.post('/summarize_url', async (req, res) => {
    const { url } = req.body;

    try {

        // Scrape the content from the webpage
        const scrapedContent = await scrapeWebpage(url);

        console.log('Scraped content:', scrapedContent);

        // Send scraped content to OpenAI for summarization
        const summary = await summarizeContent(scrapedContent);

        console.log(summary);

        // Return the summarized content as the response
        res.status(200).json({ summary });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error, please try again');
    }
});

export default router;