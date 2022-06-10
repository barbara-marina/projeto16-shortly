import signUpSchema from "../schemas/signUpSchema.js"

export default function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body);
    if (validation.error) return res.status(422).send(validation.error.details[0].message);

    next();
}