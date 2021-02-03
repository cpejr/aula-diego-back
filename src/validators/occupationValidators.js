const { Segments, Joi } = require("celebrate");
const occupationValidator = {};

occupationValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    is_deleted: Joi.string().default(false),
  }),
};

occupationValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    is_deleted: Joi.string().optional(),
  }),
};

occupationValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = occupationValidator;
