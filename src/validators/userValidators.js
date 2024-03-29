const { Segments, Joi } = require("celebrate");
const { string } = require("joi");
const { integer } = require("joi");
const phoneJoi = Joi.extend(require("joi-phone-number"));

const userValidator = {};

userValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    birthdate: Joi.string().required(),
    cpf: Joi.string().required(),
    phone: phoneJoi
      .string()
      .phoneNumber({ defaultCountry: "BR", format: "national" })
      .required(),
    organization_id: Joi.string().uuid().required(),
    occupation_id: Joi.string().uuid().required(),
    password: Joi.string().required(),
    type: Joi.string().default("student"),
    status: Joi.string().default("pending"),
  }),
};

userValidator.forgottenPassword = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

userValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    updatedFields: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      registration: Joi.number().integer(),
      birthdate: Joi.string(),
      phone: Joi.string().length(11),
      organization_id: Joi.string().uuid(),
      occupation_id: Joi.string().uuid(),
      type: Joi.string(),
      status: Joi.string(),
    }),
  }),
};

userValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = userValidator;
