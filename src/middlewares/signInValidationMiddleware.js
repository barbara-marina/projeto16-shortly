import signInSchema from "../schemas/signInSchema.js"

export default function validateSignIn(req, res, next) {
    const validation = signInSchema.validate(req.body);
    if (validation.error) return res.status(422).send(validation.error.details[0].message);

    next();
}