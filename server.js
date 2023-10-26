const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const jwtDecode = require('jwt-decode');
const configuration = require('./db/knexfile')[process.env.NODE_ENV];
const database = require('knex')(configuration);

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



app.listen(8080, () => console.log('server listening on post 8080'))