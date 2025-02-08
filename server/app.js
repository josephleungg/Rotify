import express from 'express';
import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import chatbotRoutes from './routes/chatbotRoutes.js';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

// Initialize OpenAI API client
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Create an HTTP server with the Express app
const server = createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    // Chat history to maintain context
    let chatHistory = [];

    ws.on('message', async (message) => {
        let messageData;
        let isJson = false;

        // Try to parse the message as JSON
        try {
            messageData = JSON.parse(message.toString());
            isJson = true; // Mark as JSON if parsing succeeds
        } catch (error) {
            // If parsing fails, treat the message as a plain string
            messageData = message.toString();
        }

        // Handle initialization data (if message is JSON and has type 'init')
        if (isJson && messageData.type === 'init') {
            console.log('Initialization data received:', messageData);
            const { role, content } = messageData;

            // Add initialization data to chat history as a system message
            chatHistory.push({
                role: role,
                content: content,
            });

            // Send a confirmation message to the client
            console.log('Chatbot has understood the assignment.');
            return;
        }

        // Handle regular chat messages
        const messageString = isJson ? messageData.content : messageData; // Use content if JSON, otherwise use the string
        console.log('Received:', messageString);

        // Add user message to chat history
        chatHistory.push({ role: 'user', content: messageString });

        try {
            // Send the message to OpenAI API with streaming
            const stream = await openai.chat.completions.create({
                model: "gpt-4", // Use your desired model
                messages: chatHistory,
                stream: true,
            });

            let finalResponse = '';

            // Stream the response back to the WebSocket client
            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
                    const content = chunk.choices[0].delta.content || "";
                    if (content) {
                        ws.send(content);
                        finalResponse += content;
                    }
                } else {
                    console.error('Unexpected chunk structure:', chunk);
                }
            }

            // Add assistant's response to chat history
            if (finalResponse) {
                chatHistory.push({ role: 'assistant', content: finalResponse });
                console.log('GPT Response: ', finalResponse);

                // Send a delimiter to indicate the end of the response
                ws.send('\n\n');
            }
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            ws.send('Error processing your request.');
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Start the server
server.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});

app.use('/', chatbotRoutes);