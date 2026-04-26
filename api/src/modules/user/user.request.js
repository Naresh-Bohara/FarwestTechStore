import Joi from "joi";

export const createUserDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(6)
    .required(),

  role: Joi.string()
    .valid("admin", "customer", "seller")
    .required(),

  gender: Joi.string()
    .valid("male", "female", "other")
    .optional(),

  phone: Joi.string().optional(),

  address: Joi.string().optional(),
});

export const updateUserDTO = Joi.object({
  name: Joi.string().optional(),
  role: Joi.string().valid("admin", "customer", "seller").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  image: Joi.any().optional() 
});