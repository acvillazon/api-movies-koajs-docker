const Joi = require("joi");

const validateYear = async (ctx, next) => {
  const year = ctx.headers.year || null;
  if ((error = validateNumber(year))) {
    return (ctx.body = {
      status: 400,
      validation: error,
    });
  }
  await next();
};

const validatePage = async (ctx, next) => {
  const page = ctx.headers.page || 0;
  if ((error = validateNumber(page))) {
    return (ctx.body = {
      status: 400,
      validation: error,
    });
  }
  await next();
};

const validateUptaeObject = async (ctx, next) => {
  const body = ctx.request.body;
  const { error, updateMovie } = Joi.object({
    movie: Joi.string().required(),
    find: Joi.string().required(),
    replace: Joi.string().required(),
  }).validate(body);

  if (error) {
    return (ctx.body = {
      status: 400,
      validation: error,
    });
  }

  await next();
};

const validateNumber = (number) => {
  if (!number) return;
  const { error, value } = Joi.number().integer().min(0).validate(number);
  if (error) return error;
};

module.exports = {
  validateYear,
  validatePage,
  validateUptaeObject
};
