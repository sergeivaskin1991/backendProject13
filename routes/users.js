const path = require('path');
const router = require('express').Router();
const fs = require('fs').promises;

// eslint-disable-next-line import/no-dynamic-require
const users = path.join(__dirname, '../data/users.json');

const usersRouter = (req, res) => {
  fs.readFile(users, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const userRouter = (req, res) => {
  fs.readFile(users, { encoding: 'utf8' })
    .then((data) => {
      const searchUser = JSON.parse(data)
        .find((user) => user._id === req.params.id);

      if (searchUser) {
        res.send(searchUser);
        return;
      }

      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

router.get('/', usersRouter);
router.get('/:id', userRouter);

module.exports = router;
