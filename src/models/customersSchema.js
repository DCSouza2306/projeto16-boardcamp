import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]*$/).min(10).max(11),
    cpf: joi.string().pattern(/^[0-9]*$/).length(11),
    birthday: joi.date().iso()
})

export default customersSchema