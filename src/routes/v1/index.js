import express from 'express';
import * as FlightMiddlewares  from '../../middlewares/index.js';
import * as CityController  from '../../controllers/city-controller.js'
import * as FlightController  from "../../controllers/flight-controller.js"
import * as AirportController  from "../../controllers/airport-controller.js"
const router = express.Router();

router.post('/city', CityController.create);
router.delete('/city/:id', CityController.destroy);
router.get('/city/:id', CityController.get);
router.get('/city', CityController.getAll);
router.patch('/city/:id', CityController.update);

router.post(
    '/flights', 
    FlightMiddlewares.validateCreateFlight, 
    FlightController.create
);
router.get('/flights', FlightController.getAll);
router.get('/flights/:id', FlightController.get);
router.patch('/flights/:id', FlightController.update);

router.post('/airports', AirportController.create);

export{router as v1ApiRoutes}