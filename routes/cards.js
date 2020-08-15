const path = require('path');
// eslint-disable-next-line no-unused-vars
const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const fs = require('fs').promises;

// eslint-disable-next-line no-unused-vars
const cards = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(cards, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
