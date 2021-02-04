const { Segments, Joi } = require("celebrate");
const { string } = require("joi");
const phoneJoi = Joi.extend(require('joi-phone-number'));

const userValidator = {};

userValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
    birthdate: Joi.string().required(),
    phone: phoneJoi().string().phoneNumber({ defaultCountry: 'BR', format: 'national'}).required(),
  }),
};

/* userValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
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
}; */

userValidator.deleteAdmin = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

userValidator.deleteUser = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = userValidator;
