import Joi from "joi";

const CategoryCreateDto = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).default("inactive"),
    parentId: Joi.string().allow(null, '').default(null),
    description: Joi.string().optional().default(null),
})

const CategoryUpdateDto = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).default("inactive"),
    parentId: Joi.string().allow(null, '').default(null),
    description: Joi.string().optional().default(null),
   
}).unknown()

export {CategoryCreateDto, CategoryUpdateDto}