const { Segments, Joi } = require("celebrate");

const classValidator = {};

classValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    company: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    occupation: Joi.string().required(),
  }),
};

/*classValidator.getById = {
    [Segments.HEADERS]: Joi.object().keys({
        class_id: Joi.string().required(),
    }),
    
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().integer(),
        class_id: Joi.number().integer(),
      }),
};*/

classValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    class_id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    company: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    code: Joi.string().optional(),
    occupation: Joi.string().optional(),
  }),
};

classValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    class_id: Joi.string().required(),
  }),
};

module.exports = classValidator;
