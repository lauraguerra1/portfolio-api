const dotenv = require('dotenv')
dotenv.config()
const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: uuidv4(), 
    name: 'Laura Guerra', 
    email: 'l.garciaguerra1@gmail.com',
    auth_token: process.env.NODE_ADMIN_USER
  }
]

const projects = [
  {
    id: uuidv4(),
    title: 'Celestial Cycle',
    tech: "Next.js, React, TypeScript, Passage, Supabase, Tailwind CSS, Cypress",
    image: 'https://i.imgur.com/pzFn2Kn.png',
    link: 'https://celestial-cycle.vercel.app/',
    gh: 'https://github.com/lauraguerra1/celestial-cycle',
    description: 'Combine astrological insights with menstrual cycle tracking. Created during WWCode Hackathon for Social Impact 2023.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Project Planner',
    tech: "React, TypeScript, Open AI, Google OAuth, Cypress",
    image: 'https://i.imgur.com/vUaoRDk.png',
    link: 'https://project-planner-ui.vercel.app/',
    gh: 'https://github.com/lauraguerra1/project-planner-ui',
    description: 'An AI generator and organizational tool for developers to curate project plans.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Style Stash',
    tech: "PostgreSQL, Express.js, React, JavaScript, CSS",
    image: 'https://i.imgur.com/L01XDW1.png',
    link: 'https://style-stash.vercel.app/',
    gh: 'https://github.com/lauraguerra1/style-stash',
    description: 'A virtual closet for tracking clothing items and planning outfits.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Pawfect Match',
    tech: "React, TypeScript, CSS, Cypress",
    image: 'https://i.imgur.com/d65hR6b.png',
    link: 'https://pawfect-match-laura.vercel.app/',
    gh: 'https://github.com/lauraguerra1/pawfect-match',
    description: 'An online guide to discovering the ideal pet companion based on your unique personality traits.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Makeup 360',
    tech: "React, TypeScript, CSS, Cypress",
    image: 'https://i.imgur.com/R8NyOiT.png',
    link: 'https://makeup-360.vercel.app/',
    gh: 'https://github.com/lauraguerra1/makeup-360',
    description: 'A one-stop destination designed for exploring and shopping for the perfect cosmetics collection.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Rancid Tomatillos',
    tech: "React, JavaScript, CSS, Cypress",
    image: 'https://i.imgur.com/lVxwyfa.png',
    link: 'https://rancid-tomatillos-laura.vercel.app/',
    gh: 'https://github.com/lauraguerra1/rancid-tomatillos',
    description: 'Explore, filter, and preview movies with ease.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Overlook',
    tech: "JavaScript, HTML, CSS, Mocha/Chai",
    image: 'https://i.imgur.com/3rBeMyp.png',
    link: 'https://lauraguerra1.github.io/overlook/',
    gh: 'https://github.com/lauraguerra1/overlook',
    description: 'A hotel booking website.', 
    instructions: 'username: customer50,password: overlook2021',
  },
  {
    id: uuidv4(),
    title: 'What\'s Cookin',
    tech: "JavaScript, HTML, CSS, Mocha/Chai",
    image: 'https://i.imgur.com/Px2jwrW.png',
    link: 'https://lauraguerra1.github.io/whats-cookin/',
    gh: 'https://github.com/lauraguerra1/whats-cookin',
    description: 'The ultimate culinary companion for discovering and searching recipes.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Tic-Tac-Toe',
    tech: "React, TypeScript",
    image: 'https://i.imgur.com/p5cnAbq.png',
    link: 'https://laura-tic-tac-toe.vercel.app/',
    gh: 'https://github.com/lauraguerra1/tic-tac-toe',
    description: 'A fun and simple game of tic tac toe with cuddly characters.', 
    instructions: null
  },
  {
    id: uuidv4(),
    title: 'Rock Paper Scissors',
    tech: "JavaScript, HTML, CSS",
    image: 'https://i.imgur.com/mMsp62i.png',
    link: 'https://lauraguerra1.github.io/rock-paper-scissors-project/',
    gh: 'https://github.com/lauraguerra1/rock-paper-scissors-project',
    description: 'Play against the computer in a classic game of Rock, Paper, Scissors!'
  }
]

module.exports = {users, projects}