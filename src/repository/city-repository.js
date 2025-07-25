import {city} from '../models/index.js';

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
            await db.delete(City).where(eq(City.id,cityId))
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async updateCity(cityId, data) { // {name: "Prayagraj"}
        try {
    
            const updatedCity = await db
            .update(City)
            .set({ name: data.name })
            .where(eq(City.id, cityId))
            ;
        
        return updatedCity[0];
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllCities(filter) { // filter can be empty also
        try {
            if(filter.name) {
                const cities = await City.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return cities;
            }
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

export{CityRepository};
