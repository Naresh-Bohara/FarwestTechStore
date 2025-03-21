import Joi from "joi";

// Registration DTO schema
const userRegistrationDTO = Joi.object({
  fullName: Joi.string()
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+){1,2}$/, 'Full Name')
    .required()
    .messages({
      'string.pattern.base': 'Full name must contain at least a first name and surname, with an optional middle name.',
      'string.empty': 'Full name is required.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'string.empty': 'Email is required.',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.,])[A-Za-z\d@$!%*?&#.,]{8,25}$/, 'Password')
    .required()
    .messages({
      'string.pattern.base': 'Password must have at least 8 characters, including uppercase, lowercase, a number, and a special character.',
      'string.empty': 'Password is required.',
    }),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match.',
      'any.required': 'Password confirmation is required.',
    }),
  role: Joi.string()
    .valid('seller', 'customer')
    .required()
    .messages({
      'any.only': 'Role must be either seller or customer.',
      'any.required': 'Role is required.',
    }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': 'Gender must be male, female, or other.',
      'any.required': 'Gender is required.',
    }),
    phone: Joi.string()
   .pattern(/^(\+977-?)?(98|97)\d{8}$/, 'Phone Number')
   .optional()
   .messages({
    'string.pattern.base': 'Phone number must be a valid Nepali number (e.g., +977-98XXXXXXXX, 977-98XXXXXXXX, or 98XXXXXXXX).',
  }),

  address: Joi.string()
    .min(10)
    .optional()
    .messages({
      'string.min': 'Address must be at least 10 characters long.',
    }),
    image: Joi.any()
    .optional()
    .allow(null)
    .custom((value, helpers) => {
      if (value && !['image/jpeg', 'image/png'].includes(value.mimetype)) {
        return helpers.message('Invalid image file type.');
      }
      return value;
    })
    .messages({
      'any.only': 'Invalid image file.',
    }),  
});

// Login DTO schema
const loginDTO = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'string.empty': 'Email is required.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
    }),
});

const activationDTO = Joi.object({
  otp: Joi.string().max(6).min(6),
  email:Joi.string().email().required()
})

const resendOtpDTO = Joi.object({
  email:Joi.string().email().required()
})



export { userRegistrationDTO, loginDTO, activationDTO, resendOtpDTO};
