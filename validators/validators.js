const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const BadRequest = require('../errors/BadRequest');

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const checkUrl = Joi.string().required().custom((url) => {
  if (!isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
    throw new BadRequest('Некорректная ссылка');
  }
  return url;
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: checkUrl,
    trailerLink: checkUrl,
    thumbnail: checkUrl,
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

module.exports = {
  signinValidator,
  signupValidator,
  updateUserValidator,
  createMovieValidator,
  deleteMovieValidator,
};
