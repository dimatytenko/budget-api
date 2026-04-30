import createError from 'http-errors';

const schemaValidation = (schema, message = '') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationMessage = message || error.details[0].message;

      throw createError(400, validationMessage);
    }

    req.body = value;
    next();
  };
};

export default schemaValidation;
