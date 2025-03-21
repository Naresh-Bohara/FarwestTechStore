import Joi from "joi";

const BrandCreateDto = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).default("inactive"),
    description: Joi.string().optional().default(null),
})

const BrandUpdateDto = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).default("inactive"),
    description: Joi.string().optional().default(null),
   
}).unknown()

export {BrandCreateDto, BrandUpdateDto}