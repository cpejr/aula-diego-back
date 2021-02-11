const { Segments, Joi } = require("celebrate");

const userValidator = {};

userValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
    company: Joi.string().required(),
    birthdate: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    unit: Joi.string().required(),
    occupation: Joi.string().required(),
    phone: Joi.string().length(11).required(),
    type: Joi.string().default("student"),
  }),
};
userValidator.forgottenPassword = {
  [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
  })
}
userValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    updatedFields: Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      company: Joi.string(),
      birthdate: Joi.date(),
      address: Joi.string(),
      state: Joi.valid(),
      phone: Joi.string().length(11),
      unit: Joi.string().required(),
      occupation: Joi.string().required(),
    }),
  }),
};

userValidator.deleteAdmin = {
  [Segments.PARAMS]: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

userValidator.deleteUser = {
  [Segments.PARAMS]: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

module.exports = userValidator;
