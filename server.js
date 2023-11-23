const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const cors = require('cors');
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
app.use(cors({
  origin: ['http://localhost:3000', 'https://portfolio-lauraguerra1.vercel.app']
}));
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
    const projects = await database('projects').select().orderBy('created_at', "desc")
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

app.post('/api/v1/mail',  (req, res) => {
  const missingParams = ['name', 'email', 'inquiry', 'message'].filter(param => req.body[param] === undefined)
  
  if (missingParams.length) {
    res.status(422).json({
      error: `You are missing a required parameter of ${missingParams.join(', ')}.`
    })
  } else {
    const { name, email, inquiry, message } = req.body

    const createEmail = (innerHTML) => {
      const imgSrc = inquiry === 'Web Services' ? 'https://i.imgur.com/jQ9la2m.png' : 'https://i.imgur.com/c53daE3.png'
      return (
        `<html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Playfair Display', serif;
              font-size: 20px;
              color: black;
            }
            
            body {
              margin: 20px;
              padding: 20px;
            }
      
            h1 {
              color: #AC7D63;
              text-align: center;
              font-size: 30px;
            }
      
            p {
              margin: 10px 0;
            }
      
            .message {
              background-color: #FFFCF8;
              padding: 15px;  
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
      
            .header-image {
              width: 100%;
              max-width: 400px;
              margin: 0 auto;
            }
            
            .flex-center {
              display: flex;
              justify-content: center;
            }
          </style>
        </head>
        <body>
          <div class='flex-center'>
            <img src=${imgSrc} alt="LGG Web Services / Laura Garcia Guerra logo" class="header-image">
          </div>
          <div class="message">
            ${innerHTML}
          </div>
      </body> 
    </html>`
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS 
      }  
    })

    const adminMailOptions = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL, 
    subject: `${inquiry} Inquiry - via portfolio`,
    text: `New Inquiry From ${name} \n Message: ${message} \n Email Address: ${email}`,
    html: createEmail(
      `<h1>New Inquiry From ${name}</h1>
      <p>Message: ${message}</p>
      <p>Email Address: ${email}</p>`
    ), 
    replyTo: email
  };

    const userMailOptions = {
      from: process.env.MAILER_EMAIL,
      to: email, 
      subject: `Thank You For Your Inquiry ${inquiry !== 'Other' ? 'Regarding' + inquiry : ''}`,
      text: '', 
      html: createEmail(
        `<h1>Thank you for your recent inquiry, ${name}.</h1>
        <p>Hello ${name},</p>
        <p>I hope this message finds you well. Thank you for reaching out${inquiry !== 'Other' ? ' regarding' +  inquiry : ''}!</p>
        <p>I want to assure you that I've received your inquiry and am looking forward to connecting with you further. Your interest means a lot to me.</p>
        <p>I will review your inquiry thoroughly and get back to you within the next two business days.</p>
        <p>If you have any additional details or questions in the meantime, please feel free to reply to this email. Looking forward to connecting soon!</p>
        <p>Best regards,<br/>
        Laura Garcia Guerra<br/>
        Software Engineer<br/>
        www.lauragarciaguerra.com
        <br></br>
        Contact Information:<br/>
        Phone: 310-770-6009<br/>
        Email: l.garciaguerra1@gmail.com<br/>
        Calendly Schedule: https://calendly.com/laura-guerra-calendar/30min
        </p>
        `)
    }

    transporter.sendMail(adminMailOptions, (error) => {
      if (error) {
        res.status(500).json({error})
      } else {
        transporter.sendMail(userMailOptions, (err, info) => {
          if (err) {
            res.status(500).json({err})
          } else {
            res.status(200).json({message: info.response})
          }
        })
      }
    })

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