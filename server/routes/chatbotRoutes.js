import express from 'express';
import { scrapeWebpage } from '../utils/webscraperService.js';
import { summarizeContent, summarizePrompt } from '../utils/openaiService.js';
import fileUpload from 'express-fileupload';
import pdfParse from 'pdf-parse';

const router = express.Router();

// URL UPLOAD ROUTE
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

// FILE UPLOAD ROUTE
// POST route to summarize a file through OPENAI
router.post("/summarize_file", async (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        const pdfFile = req.files.pdfFile;
        const data = await pdfParse(pdfFile.data);
        const summary = await summarizeContent(data.text);

        console.log(summary);
        res.status(200).json({ summary });
    } catch (error) {
        console.error('Error processing PDF file:', error);
        res.status(500).send("Error processing PDF.");
    }
});

// TEXT PROMPT ROUTE
// POST route to summarize user text prompt through OPENAI
router.post("/summarize_text", async (req, res) => {
    const { text } = req.body;

    try {
        const summary = await summarizePrompt(text);

        console.log(summary);
        res.status(200).json({ summary });
    } catch (error) {
        console.error('Error processing text:', error);
        res.status(500).send("Error processing text.");
    }
});

export default router;