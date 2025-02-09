<div align="center">
  <img src="https://github.com/josephleungg/Rotify/blob/main/client/public/banner.png?raw=true" width="500"/>
  <h1>Rotify</h1>
</div>

<p align="center">
  <img width="1000" alt="Rotify Screenshot or Logo" src="https://github.com/user-attachments/assets/167655f3-272e-493c-889d-d70626127b97" />
</p>

<p align="center">
  <h2>Rotify</h2>
  <p>Save your time by brain-rotting your mind</p>
</p>

## What is Rotify?

Rotify is a web application designed to enhance learning and engagement, particularly for Gen Z, by "rotifying" traditional learning materials. Recognizing the challenges of short attention spans in the digital age, Rotify combines any text-based content—from articles and textbooks to scientific papers—with captivating and satisfying gameplay footage in the background. This creates a dynamic, multi-sensory learning experience that keeps users visually engaged and prevents information overload. Rotify aims to make learning more accessible and enjoyable by leveraging the same visual stimulation that often leads to distractions, turning potential brain drain into brain gain.

## Features

[![Features](https://img.shields.io/badge/Features-green)](YourFeaturesListLink)

*   Other voice options (possibly using your own through training your own voice model)
*   Database implementation, saving your favourite brain-rot videos
*   Generate more videos instead of just having one

## Contributors

[![Contributors](https://img.shields.io/badge/Contributors-brown)](YourContributorsLink)

*   Kush ([@KU-5H](https://github.com/KU-5H))
*   Tristan ([@Tristanv0](https://github.com/Tristanv0))
*   Joseph ([@josephleungg](https://github.com/josephleungg))
*   Dominic ([@chen-dominic](https://github.com/chen-dominic))

## Technologies Used

[![Technologies](https://img.shields.io/badge/Technologies-blue)]

### Frontend

*   [![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
*   [![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
*   [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
*   [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Backend

*   [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
*   [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
*   [![OpenAI](https://img.shields.io/badge/openAI-74aa9c?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

## Rotify Demo! (Click to watch)
[![Rotify Demo](https://img.youtube.com/vi/PjXUOong-DI/0.jpg)](https://www.youtube.com/watch?v=PjXUOong-DI)

## Installation

[![Installation](https://img.shields.io/badge/Installation-purple)]

```bash
# Clone the repository
$ git clone [https://github.com/josephleungg/Rotify](https://github.com/josephleungg/Rotify)

# Navigate to the server directory
$ cd Rotify/server

# Install server dependencies (choose one)
$ npm install
$ bun install
$ pnpm install
$ yarn install

# Create the .env file and add your OpenAI key
$ touch .env
$ echo "OPENAI_KEY=\"YOUR_OPENAI_KEY\"" > .env  *(Or manually edit .env)*

# Navigate to the client directory
$ cd ../client

# Install client dependencies (choose one)
$ npm install
$ bun install
$ pnpm install
$ yarn install

# Run the development server (choose one)
$ npm run dev
$ bun run dev
$ pnpm run dev
$ yarn run dev

# Run the server (choose one)
$ cd ../server
$ npm start
$ bun start
$ pnpm start
$ yarn start
