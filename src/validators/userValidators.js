const { Segments, Joi } = require("celebrate");

const userValidator = {}

userValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    company: Joi.string().required(),
    birthdate: Joi.date().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    unit: Joi.string().required(),
    occupation: Joi.string().required(),
    phone: Joi.string().length(11).required(),
     // matricula: Joi.string().required(),
    
  }),
};

userValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    updatedFields: Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      //confirmPassword: Joi.string().required(),
      empresa: Joi.string(),
      dob: Joi.date(),
      address: Joi.string(),
      addressNumber: Joi.number,
      CEP: Joi.string().length(8),
     // estado: Joi.valid(),
      // sexo: Joi.valid("masculino", "feminino"),
      telefone: Joi.string().length(11),
    }),
  }),
};


userValidator.deleteAdmin = { 
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    })
}

userValidator.deleteUser = { 
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    })
};

module.exports = userValidator;