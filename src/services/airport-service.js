import {CrudService} from "./crud-service.js";
import {AirportRepository} from  "../repository/index.js";

class AirportService extends CrudService {
    constructor() {
        const airportRepository = new AirportRepository();
        super(airportRepository);
    }
}

export{AirportService};