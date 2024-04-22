const { body, param, query } = require('express-validator');

const nuevoRestauranteValidation = [
    body("rating", "Only this values are available [0,1,2,3,4]").isIn([0, 1, 2, 3, 4]),
    body("name").trim().notEmpty(),
    body("site").trim().notEmpty(),
    body("email").trim().isEmail(),
    body("phone").trim().notEmpty(),
    body("street").trim().notEmpty(),
    body("city").trim().notEmpty(),
    body("state").trim().notEmpty(),
    body("lat").isFloat(),
    body("lng").isFloat(),
]

const actualizacionTotalRestauranteValidation = [
    param("id").trim().notEmpty(),
    body("rating", "Only this values are available [0,1,2,3,4]").isIn([0, 1, 2, 3, 4]),
    body("name").trim().notEmpty(),
    body("site").trim().notEmpty(),
    body("email").trim().isEmail(),
    body("phone").trim().notEmpty(),
    body("street").trim().notEmpty(),
    body("city").trim().notEmpty(),
    body("state").trim().notEmpty(),
    body("lat").isFloat(),
    body("lng").isFloat(),
]

const actualizacionParcialRestauranteValidation = [
    param("id").trim().notEmpty(),
    body("rating", "Only this values are available [0,1,2,3,4]").optional().isIn([0, 1, 2, 3, 4]),
    body("name").optional().trim().notEmpty(),
    body("site").optional().trim().notEmpty(),
    body("email").optional().trim().isEmail(),
    body("phone").optional().trim().notEmpty(),
    body("street").optional().trim().notEmpty(),
    body("city").optional().trim().notEmpty(),
    body("state").optional().trim().notEmpty(),
    body("lat").optional().isFloat(),
    body("lng").optional().isFloat(),
]

const findOneRestaurantValidation = [
    param("id").trim().notEmpty()
]

const stadisticsRestaurantValidation = [
    query("latitude").isFloat(),
    query("longitude").isFloat(),
    query("radius").isFloat()
]

module.exports = {
    nuevoRestauranteValidation,
    findOneRestaurantValidation,
    actualizacionTotalRestauranteValidation,
    actualizacionParcialRestauranteValidation,
    stadisticsRestaurantValidation,
}