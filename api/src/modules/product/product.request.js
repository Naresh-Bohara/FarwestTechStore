import Joi from "joi";

// Product Create DTO
const ProductCreateDto = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  category: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
  brand: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
  price: Joi.number().min(100).required(),
  discount: Joi.number().min(0).max(100).default(0),
  status: Joi.string().valid("active", "inactive").default("inactive"),
  description: Joi.string().optional().default(null),
  images: Joi.array().items(Joi.string()).optional().default([]),
  seller: Joi.string().allow(null, '').pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
  createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
  updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
}).unknown();

// Product Update DTO
const ProductUpdateDto = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  category: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
  brand: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
  price: Joi.number().min(100).optional(),
  discount: Joi.number().min(0).max(100).optional().default(0),
  status: Joi.string().valid("active", "inactive").optional().default("inactive"),
  description: Joi.string().optional().default(null),
  images: Joi.array().items(Joi.string()).optional(),
  seller: Joi.string().allow(null, '').pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
  createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
  updatedBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null),
}).unknown();

// Review Create DTO
const ReviewCreateDto = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().optional().allow(null, '').default(""),
}).unknown();


export { ProductCreateDto, ProductUpdateDto, ReviewCreateDto };
