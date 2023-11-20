import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Content-Type', 'application/json');
//   next();
// });

const users = [
  { id: 1, name: 'user-one' },
  { id: 2, name: 'user-two' },
  { id: 3, name: 'user-three' },
  { id: 4, name: 'user-four' },
  { id: 5, name: 'user-five' },
  { id: 6, name: 'user-six' },
];

const ERROR_MESSAGES = {
  USER_ID_REQ: 'user id is required',
  NAME_REQ: 'name is required',
  USER_NOT_FOUND: (userId) => `user with id ${userId} not found`
}

app.get('/users', function (req, res) {
  try {
    console.log('getting all users');

    return res.json({ status: 200, message: 'returning all users', users: users });
  } catch (err) {
    handleError(res, err);
  }
});

app.get('/users/:userId', function (req, res) {
  try {
    console.log('getting a user');
  
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(403).json({ status: 403, message: ERROR_MESSAGES.USER_ID_REQ });
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
  try {
    console.log('creating a user');

    const name = req.body.name;
    if (!name) {
      return res.status(403).json({ status: 403, message: ERROR_MESSAGES.NAME_REQ });
    }

    let id = 1;
    if (users.length > 0) {
      const lastIndex = users.length - 1;
      const lastId = users[lastIndex].id;
      id = lastId + 1
    }

    const user = { id: id, name: name };
    users.push(user);

    return res.json({ status: 200, message: 'user created', user: user });
  } catch (err) {
    handleError(res, err);
  }
});

app.put('/users/:userId', function (req, res) {
  try {
    console.log('updating a user');
  
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(403).json({ status: 403, message: ERROR_MESSAGES.USER_ID_REQ });
    }
  
    const name = req.body.name;
    if (!name) {
      return res.status(403).json({ status: 403, message: ERROR_MESSAGES.NAME_REQ });
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
  try {
    console.log('deleting a user');
  
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(403).json({ status: 403, message: ERROR_MESSAGES.USER_ID_REQ });
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
