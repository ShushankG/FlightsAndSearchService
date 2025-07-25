import {flight as Flights} from '../models/index.js';

class FlightRepository {


    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    // async getAllFlights(filter) {
    //     try {
    //         const filterObject = this.#createFilter(filter);
    //         const flight = await Flights.findAll({
    //             where: filterObject
    //         });
    //         return flight;
    //     } catch (error) {
    //         console.log("Something went wrong in the repository layer");
    //         throw {error};
    //     }
    // }

    async updateFlights(flightId, data) {
         try {
            await Flights.update(data, {
                where: {
                    id: flightId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }


}

export{FlightRepository}
/*
{
    where: {}
}

*/