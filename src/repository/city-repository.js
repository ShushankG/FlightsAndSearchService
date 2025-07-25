import {city} from '../models/index.js';
import { db } from '../config/dbConfig.js';
import { eq } from "drizzle-orm";

class CityRepository {

    async createCity({ name }) { 
        try {
            const newCity = await db.insert(city).values({
                name,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            let insertedCity = await db
            .select()
            .from(city)
            .where(eq(city.id, newCity[0].insertId));
      
          return insertedCity;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async deleteCity(cityId) {
        try {
            await db.delete(city).where(eq(city.id,cityId))
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async updateCity(cityId, data) { // {name: "Prayagraj"}
        try {
    
            let updatedCity = await db
            .update(city)
            .set({ name: data.name })
            .where(eq(city.id, cityId))
            ;
            let updatedData= await db.select().from(city).where(eq(city.id,cityId));
        return updatedData;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getCity(cityId) {
        try {
            const foundCity = await db.select().from(city).where(eq(city.id,cityId));
            return foundCity;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllCities(filter) { // filter can be empty also
        try {
                const cities = await db.select().from(city);
                return cities;
            
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

export{CityRepository};
