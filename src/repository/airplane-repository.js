import { airplane as airplanes} from  '../models/index.js';
import {db} from '../config/dbConfig.js';

class AirplaneRepository {
    async getAirplane(id) {
        try {
            const airplane = await db.select().from(airplanes).where("id",id);
            return airplane;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

export{
    AirplaneRepository
}