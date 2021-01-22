const { Segments, Joi } = require("celebrate");

const classAdminValidator = {};

classAdminValidator.create = {
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }),

  [Segments.BODY]: Joi.object().keys({
    class_id: Joi.number().integer().required(),
  }),
};

classAdminValidator.read = {
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }),

  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer(),
    class_id: Joi.number().integer(),
  }),
};

classAdminValidator.delete = {
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
    
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer(),
    class_id: Joi.number().integer(),
  }),
};


module.exports = classAdminValidator;