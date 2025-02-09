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

// generate a response from openAI given a prompt to generate a quiz
// Returns an object with the format
export async function createQuiz(prompt) {

    try {

        console.log('--------------------------------------------------');
        console.log('Generating OpenAI quiz response...');
        console.log('--------------------------------------------------');

        // generate a quiz based on the main idea of the text
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: `Create a 5-question quiz based on the main idea of this text: ${prompt}.` }],
            functions: [
                {
                    name: "generate_quiz",
                    description: "Creates a multiple-choice quiz with 5 questions.",
                    parameters: {
                        type: "object",
                        properties: {
                            quizTitle: { type: "string", description: "Title of the quiz" },
                            questions: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionId: { type: "integer", description: "Question number" },
                                        questionText: { type: "string", description: "The question" },
                                        options: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    optionId: { type: "string", description: "A, B, C, or D" },
                                                    text: { type: "string", description: "Answer choice" }
                                                }
                                            }
                                        },
                                        correctAnswer: { type: "string", description: "The correct answer (A, B, C, or D)" }
                                    },
                                    required: ["questionId", "questionText", "options", "correctAnswer"]
                                }
                            }
                        },
                        required: ["quizTitle", "questions"]
                    }
                }
            ],
            function_call: "auto"
        });
    
        console.log('--------------------------------------------------');
        console.log('Generated OpenAI quiz');
        console.log('--------------------------------------------------');

        // Parse the function call arguments
        const functionCallArguments = JSON.parse(response.choices[0].message.function_call.arguments);
    
        return functionCallArguments;

    } catch (error) {
        console.error('Error generating OpenAI quiz:', error);
        throw error;
    }
};