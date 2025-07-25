import {CrudRepository} from './crud-repository.js';
import { airport } from '../models/index.js';

class AirportRepository extends CrudRepository {
    constructor() {
        super(airport);
    }
}

export{AirportRepository} ;