const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const jwtDecode = require('jwt-decode');
const configuration = require('./knexfile')[process.env.NODE_ENV];
const database = require('knex')(configuration);
const { v4: uuidv4 } = require('uuid');

const findMissingParams = (project) => {
  const missingParams = ['title', 'tech', 'link', 'gh', 'description', 'instructions', 'image'].filter(requiredParam => project[requiredParam] === undefined)
  return missingParams
}


// const router = require('./routes');


const app = express();
app.use(express.json());
// app.use(router)

app.get('/api/v1/users/:jwt', async (req, res) => {
  const requestedUser = jwtDecode(req.params.jwt)

  try {
    const user = await database('users').select().where('auth_token', requestedUser.sub) 
    if (!user[0]) {
      res.status(404).json({error: 'User unauthorized'})
    }

    res.status(200).json({
      isAuthorized: true,
      ...user[0]
    })

  } catch (error) {
    res.status(500).json({error})
  }
})

app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await database('projects').select()
    res.status(200).json({
      data: projects
    })
  } catch (error) {
    res.status(500).json({error})
  }
})

app.post('/api/v1/projects', async (req, res) => {
  const missingParams = findMissingParams(req.body)
  if (missingParams.length) {
    res.status(422).json({
      error: `You are missing a required parameter of ${missingParams.join(', ')}.`
    })
  } else {
    try {
      const newProject = await database('projects').insert({ ...req.body, id: uuidv4() }).returning('*')
      res.status(201).json({ data: newProject[0] })
    } catch (error) {
      res.status(500).json({error})
    }
  }
})

app.patch('/api/v1/projects/:id', async (req, res) => {
  const { id } = req.params
  const missingParams = findMissingParams(req.body)
  if (missingParams.length) {
    res.status(422).json({
      error: `You are missing a required parameter of ${missingParams.join(', ')}.`
    })
  } else {
    try {
      const updatedProject = await database('projects').update(req.body).where('id', id).returning('*')
      updatedProject[0] ? res.status(200).json({ data: updatedProject[0] }) : res.status(404).json({error: `Project with id ${id} not found.`})
    } catch (error) {
      res.status(500).json({error})
    }
  }
})

app.delete('/api/v1/projects/:id', async (req, res) => {
  const { id } = req.params
  try {
    await database('projects').where('id', id).del()
    res.status(200).json({ message: `Project id ${id} deleted.` }) 
  } catch (error) {
    console.log('error', error)
    res.status(500).json({error})
  }
})

app.listen(8080, () => console.log('server listening on post 8080'))