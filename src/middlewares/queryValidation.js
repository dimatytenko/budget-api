import createError from 'http-errors';

const queryValidation = (schema, message = '') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const validationMessage = message || error.details[0].message;
      throw createError(400, validationMessage);
    }

    req.validatedQuery = value;
    next();
  };
};

export default queryValidation;
