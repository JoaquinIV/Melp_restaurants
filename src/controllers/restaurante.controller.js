const { Router } = require('express');
const { cargaMasivaRestaurantes, crearRestaurante, buscarUnRestaurante, obtenerTodosRestaurante, actualizarRestaurante, eliminarRestaurante, obtenerEstadisticas } = require('../services/restaurante.service');
const { nuevoRestauranteValidation, findOneRestaurantValidation, actualizacionTotalRestauranteValidation, actualizacionParcialRestauranteValidation, stadisticsRestaurantValidation } = require('../validations/restaurante.validation');
const { validationResult } = require('express-validator');

let router = new Router();

/**
 * @api {get} /restaurants Request Restaurants information
 * @apiName GetRestaurants
 * @apiGroup Restaurant
 * 
 * @apiSuccessExample {json} Response Example
 * [
 *  {
 *      "id": "851f799f-0852-439e-b9b2-df92c43e7672",
 *      "rating": 1,
 *      "name": "Barajas, Bahena and Kano",
 *      "site": "https://federico.com",
 *      "email": "Anita_Mata71@hotmail.com",
 *      "phone": "534 814 204",
 *      "street": "82247 Mariano Entrada",
 *      "city": "Mérida Alfredotown", 
 *      "state": "Durango",
 *      "lat": 19.4400570537131,
 *      "lng": -99.1270470974249
 *  },
 *  ...
 * ]
 * 
 */
router.get("/", async (req, res) => {
    console.log("Get all restaurants");
    const restaurantes = await obtenerTodosRestaurante();
    return res.status(200).send(restaurantes);
});

/**
 * @api {get} /restaurants/seed Request Restaurants Seed
 * @apiName GetRestaurantsSeed
 * @apiGroup Restaurant
 * @apiDescription Upload a number of restaurants to the database for testing.
 */
router.get("/seed", async (_, res) => {
    
    console.log("Cargando restaurantes en la base de datos con archivo csv");
    
    const cargaConExito = await cargaMasivaRestaurantes();
    
    if(cargaConExito) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }

});

/**
 * @api {get} /restaurants/statistics Request Restaurants Statistics
 * @apiName GetRestaurantStatistics
 * @apiGroup Restaurant
 * @apiDescription Enpoint to perform a statistics query based on a circular area determined by the longitude, latitude and radius of the same.
 * @apiQuery {Float} latitude Latitude of the center of circle.
 * @apiQuery {Float} longitude Longitude of the center of circle.
 * @apiQuery {Float} radius Radius of the circle in metters.
 * 
 * @apiSuccessExample {json} Response Example
 * {
 *  "count": 12,
 *  "avg": 1.5,
 *  "std": 1.3844373104863459
 * }
 */
router.get("/statistics", stadisticsRestaurantValidation, async (req, res) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    
    console.log("Búsqueda por área");

    const result = await obtenerEstadisticas(req.query.latitude, req.query.longitude, req.query.radius);

    return res.status(200).send(result);
})

/**
 * @api {get} /restaurants/:id Request Restaurant Information
 * @apiName GetRestaurant
 * @apiGroup Restaurant
 * @apiParam {String} id Restaurant unique ID.
 * 
 * @apiSuccessExample {json} Response Example
 * {
 *      "id": "851f799f-0852-439e-b9b2-df92c43e7672",
 *      "rating": 1,
 *      "name": "Barajas, Bahena and Kano",
 *      "site": "https://federico.com",
 *      "email": "Anita_Mata71@hotmail.com",
 *      "phone": "534 814 204",
 *      "street": "82247 Mariano Entrada",
 *      "city": "Mérida Alfredotown", 
 *      "state": "Durango",
 *      "lat": 19.4400570537131,
 *      "lng": -99.1270470974249
 * }
 * 
 */
router.get("/:id", findOneRestaurantValidation, async (req, res) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    console.log("Get one restaurant");
    
    const restaurante = await buscarUnRestaurante(req.params.id);

    if(!restaurante) {
        return res.status(404).send('Restaurante no encontrado');
    }

    return res.status(200).send(restaurante);

});

/**
 * @api {post} /restaurants Request Restaurant Creation
 * @apiName CreateRestaurant
 * @apiGroup Restaurant
 * 
 * @apiBody {Number} rating Rating of the restaurant (between 0 and 4).
 * @apiBody {String} name Name of the restaurant.
 * @apiBody {String} site Website URL of the restaurant.
 * @apiBody {String} email Email address of the restaurant.
 * @apiBody {String} phone Phone number of the restaurant.
 * @apiBody {String} street Street where the restaurant is located.
 * @apiBody {String} city City where the restaurant is located.
 * @apiBody {String} state State or province where the restaurant is located.
 * @apiBody {Number} lat Latitude of the restaurant.
 * @apiBody {Number} lng Longitude of the restaurant.
 * 
 * @apiSuccessExample {json} Response Example
 * {
 *      "id": "851f799f-0852-439e-b9b2-df92c43e7672",
 *      "rating": 1,
 *      "name": "Barajas, Bahena and Kano",
 *      "site": "https://federico.com",
 *      "email": "Anita_Mata71@hotmail.com",
 *      "phone": "534 814 204",
 *      "street": "82247 Mariano Entrada",
 *      "city": "Mérida Alfredotown", 
 *      "state": "Durango",
 *      "lat": 19.4400570537131,
 *      "lng": -99.1270470974249
 * }
 */
router.post("/", nuevoRestauranteValidation, async (req, res) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    
    console.log("Creando un restaurante");
    
    const restaurante = await crearRestaurante(req.body);

    return res.status(201).send(restaurante);
});

/**
 * @api {delete} /restaurants/:id Request Restaurant Delete
 * @apiName DeleteRestaurant
 * @apiGroup Restaurant
 * @apiParam {String} id Restaurant unique ID.
 */
router.delete("/:id", findOneRestaurantValidation, async (req, res) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const restauranteExists = await buscarUnRestaurante(req.params.id);

    if(!restauranteExists) {
        return res.status(404).send('Restaurante no encontrado');
    }
    
    console.log("Eliminar un restaurante");

    await eliminarRestaurante(req.params.id);

    return res.status(204).send();

});

/**
 * @api {put} /restaurants/:id Request Restaurant Update
 * @apiName UpdateRestaurant
 * @apiGroup Restaurant
 * @apiParam {String} id Restaurant unique ID.
 * 
 * @apiBody {Number} rating Rating of the restaurant (between 0 and 4).
 * @apiBody {String} name Name of the restaurant.
 * @apiBody {String} site Website URL of the restaurant.
 * @apiBody {String} email Email address of the restaurant.
 * @apiBody {String} phone Phone number of the restaurant.
 * @apiBody {String} street Street where the restaurant is located.
 * @apiBody {String} city City where the restaurant is located.
 * @apiBody {String} state State or province where the restaurant is located.
 * @apiBody {Number} lat Latitude of the restaurant.
 * @apiBody {Number} lng Longitude of the restaurant.
 * 
 * @apiSuccessExample {json} Response Example
 * {
 *      "id": "851f799f-0852-439e-b9b2-df92c43e7672",
 *      "rating": 1,
 *      "name": "Barajas, Bahena and Kano",
 *      "site": "https://federico.com",
 *      "email": "Anita_Mata71@hotmail.com",
 *      "phone": "534 814 204",
 *      "street": "82247 Mariano Entrada",
 *      "city": "Mérida Alfredotown", 
 *      "state": "Durango",
 *      "lat": 19.4400570537131,
 *      "lng": -99.1270470974249
 * }
 */
router.put("/:id", actualizacionTotalRestauranteValidation, async (req, res) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const restauranteExists = await buscarUnRestaurante(req.params.id);

    if(!restauranteExists) {
        return res.status(404).send('Restaurante no encontrado');
    }
    
    console.log("Actualizar todos los datos de un restaurante");
    const restauranteActualizado = await actualizarRestaurante(req.params.id, req.body);

    return res.status(200).send(restauranteActualizado);
});

/**
 * @api {patch} /restaurants/:id Request Restaurant Partial Update
 * @apiName PartialUpdateRestaurant
 * @apiGroup Restaurant
 * @apiParam {String} id Restaurant unique ID.
 * 
 * @apiBody {Number} [rating] Rating of the restaurant (between 0 and 4).
 * @apiBody {String} [name] Name of the restaurant.
 * @apiBody {String} [site] Website URL of the restaurant.
 * @apiBody {String} [email] Email address of the restaurant.
 * @apiBody {String} [phone] Phone number of the restaurant.
 * @apiBody {String} [street] Street where the restaurant is located.
 * @apiBody {String} [city] City where the restaurant is located.
 * @apiBody {String} [state] State or province where the restaurant is located.
 * @apiBody {Number} [lat] Latitude of the restaurant.
 * @apiBody {Number} [lng] Longitude of the restaurant.
 * 
 * @apiSuccessExample {json} Response Example
 * {
 *      "id": "851f799f-0852-439e-b9b2-df92c43e7672",
 *      "rating": 1,
 *      "name": "Barajas, Bahena and Kano",
 *      "site": "https://federico.com",
 *      "email": "Anita_Mata71@hotmail.com",
 *      "phone": "534 814 204",
 *      "street": "82247 Mariano Entrada",
 *      "city": "Mérida Alfredotown", 
 *      "state": "Durango",
 *      "lat": 19.4400570537131,
 *      "lng": -99.1270470974249
 * }
 */
router.patch("/:id", actualizacionParcialRestauranteValidation, async (req, res) => {
    
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const restauranteExists = await buscarUnRestaurante(req.params.id);

    if(!restauranteExists) {
        return res.status(404).send('Restaurante no encontrado');
    }
    
    console.log("Actualizar solo algunos datos de un restaurante");
    const restauranteActualizado = await actualizarRestaurante(req.params.id, req.body);

    return res.status(200).send(restauranteActualizado);
    
});

module.exports = router;