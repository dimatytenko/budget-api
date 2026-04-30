import createError from 'http-errors';

const schemaValidation = (schema, message = '') => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      if (message) {
        error.message = message;
      }

      throw createError(400, error);
    }

    next();
  };
};

export default schemaValidation;
