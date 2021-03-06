const Card = require('../models/card');
// const { validationError } = require('./validationError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail().remove()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404);
      } else {
        res.status(500);
      }
      res.send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404);
      } else {
        res.status(500);
      }
      res.send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404);
      } else {
        res.status(500);
      }
      res.send({ message: err.message });
    });
};
