import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { v4 as uuid } from 'uuid';
import users from './services/users.js';

const app = express();
const store = new session.MemoryStore()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'expressdemo.sid',
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 120000 }, // 2 min
  saveUninitialized: false,
  store,
}));

app.use((req, res, next) => {
  console.log('req:', req);
  console.log('req.header:', req.headers);
  console.log('cookie:', req.cookie);
  console.log('cookies:', req.cookies);
  
  next();
});


// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Content-Type', 'application/json');
//   next();
// });

const ERROR_MESSAGES = {
  USER_ID_REQ: 'user id is required',
  NAME_REQ: 'name is required',
  USER_NOT_FOUND: (userId) => `user with id ${userId} not found`
}

function isAuthorized(req, res) {
  console.log('Authorizing...')
  if (!req.session.authorized) {
    res.status(403).json({ status: 403, message: 'User is not authorized' });
    return false;
  }
  return true;
}

app.post('/login', function (req, res) {
  const { username, password } = req.body;
  if (username && password) {
    req.session.authorized = true;
    req.session.user = { username, password };
    res.json({ status: 200, message: 'logged in', data: req.session });
  } else {
    res.status(401).json({ status: 401, message: 'Failed to Authenticate' })
  }
});

app.get('/users', function (req, res) {
  if (!isAuthorized(req, res)) return;
  try {
    console.log('getting all users');

    return res.json({ status: 200, message: 'returning all users', users: users });
  } catch (err) {
    handleError(res, err);
  }
});

app.get('/users/:userId', function (req, res) {
  if (!isAuthorized(req, res)) return;
  try {
    console.log('getting a user');
  
    const userId = req.params.userId;
    console.log('req.params:', req.params);
    console.log('userId:', userId)
    if (!userId) {
      return res.status(400).json({ status: 400, message: ERROR_MESSAGES.USER_ID_REQ });
    }
  
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: ERROR_MESSAGES.USER_NOT_FOUND(userId) });
    };
  
    return res.send({ status: 200, message: 'user found', user: user });
  } catch (err) {
    handleError(res, err);
  }
});

app.post('/users', function (req, res) {
  if (!isAuthorized(req, res)) return;
  try {
    console.log('creating a user');

    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ status: 400, message: ERROR_MESSAGES.NAME_REQ });
    }

    const user = { id: uuid(), name: name };
    users.push(user);

    return res.json({ status: 200, message: 'user created', user: user });
  } catch (err) {
    handleError(res, err);
  }
});

app.put('/users/:userId', function (req, res) {
  if (!isAuthorized(req, res)) return;
  try {
    console.log('updating a user');
  
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ status: 400, message: ERROR_MESSAGES.USER_ID_REQ });
    }
  
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ status: 400, message: ERROR_MESSAGES.NAME_REQ });
    }
  
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      return res.status(404).json({ status: 404, message: ERROR_MESSAGES.USER_NOT_FOUND(userId) });
    }
  
    users[index].name = name;
  
    return res.json({ status: 200, message: 'user updated', user: users[index] });
  } catch (err) {
    handleError(res, err);
  }
});

app.delete('/users/:userId', function (req, res) {
  if (!isAuthorized(req, res)) return;
  try {
    console.log('deleting a user');
  
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ status: 400, message: ERROR_MESSAGES.USER_ID_REQ });
    }
  
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      return res.status(404).json({ status: 404, message: ERROR_MESSAGES.USER_NOT_FOUND(userId) });
    }
  
    users.splice(index, 1);
  
    return res.json({ status: 200, message: 'deleted user' });
  } catch (err) {
    handleError(res, err);
  }
});

function handleError(res, err) {
  console.error(err);
  res.status(500).json({ status: 500, message: err })
}

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:30000`);
});
