import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { OpenAI } from "openai";

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// generate a response from openAI given a summarized prompt
export async function summarizeContent(textContent) {

    try {
        console.log('--------------------------------------------------');
        console.log('Generating OpenAI response...');
        console.log('--------------------------------------------------');

        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "user", 
                    content: textContent + "\n Give me the main idea of this webpage and also summarize this content for me, give me a MINIMUM of 6 paragraphs. Dont use any headers! Give me a step by step if it is a learning summary. DONT MENTION THAT THIS IS COMING FROM A WEBPAGE, JUST GIVE ME THE SUMMARIZATION. Do this as fast as you can, I don't have time to wait." 
                }
            ],
            model: "gpt-4o-mini",
        });

        console.log('--------------------------------------------------');
        console.log('Generated OpenAI response');
        console.log('--------------------------------------------------');

        console.log(completion);

        // return the generated response
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error generating OpenAI response:', error);
        throw error;
    }
};

// generate a response from openAI given a summarized prompt
export async function summarizePrompt(textContent) {

    try {
        console.log('--------------------------------------------------');
        console.log('Generating OpenAI response...');
        console.log('--------------------------------------------------');

        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "user", 
                    content: "\n Tell me about this topic: " + textContent + " give me a MINIMUM of 6 paragraphs. Dont use any headers! Give me a step by step if it is a learning summary. DONT MENTION THAT THIS IS COMING FROM A WEBPAGE, JUST GIVE ME THE SUMMARIZATION. Do this as fast as you can, I don't have time to wait." 
                }
            ],
            model: "gpt-4o-mini",
        });

        console.log('--------------------------------------------------');
        console.log('Generated OpenAI response');
        console.log('--------------------------------------------------');

        console.log(completion);

        // return the generated response
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error generating OpenAI response:', error);
        throw error;
    }
};