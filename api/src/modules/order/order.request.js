import Joi from "joi";

const AddToCartDTO = Joi.object({
    productId: Joi.string().required(),
    quantity:Joi.number().min(1).required()
})

const RemoveFromCartDTO = Joi.object({
    cartId: Joi.string().required(),
    quantity:Joi.number().min(0).required()
})

// const CheckoutDTO = Joi.object({
//     cartId: Joi.array().items(Joi.string().required()).required(),
//     discount: Joi.number().min(0).allow(null, '', 0).default(0)
// })

const CheckoutDTO = Joi.object({
    cartId: Joi.array().items(Joi.string().required()).required(),
    discount: Joi.number().min(0).allow(null, '', 0).default(0),
    subtotal: Joi.number().min(0),
    deliveryCharge: Joi.number().min(0),
     serviceCharge: Joi.number().min(0).default(0),
    tax: Joi.number().min(0),
    total: Joi.number().min(0)
}) 
//  ----------for eswa -------------


const TransactionDTO = Joi.object({
    amount: Joi.number().min(1).required(),
    transactionCode: Joi.string().allow(null, '').default(null),
    paymentMethods: Joi.string().regex(/^(cash|eswa|khalti|bank|connectips|other)$/)
    .default('cash'),
    response: Joi.any()
}).unknown()

export { AddToCartDTO, RemoveFromCartDTO, CheckoutDTO, TransactionDTO };