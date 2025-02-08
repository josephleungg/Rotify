import express from 'express';
import chatbotRoutes from './routes/chatbotRoutes.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use('/', chatbotRoutes);