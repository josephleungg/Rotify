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
export async function generateOpenAIResponse() {
    console.log('Starting to stream OpenAI response...');
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Teach me how to play blackjack" }],
        store: true,
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    console.log('Finished streaming OpenAI response.');
}