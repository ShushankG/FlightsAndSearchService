
import { city } from '../models/city.js';
import { airport } from '../models/airport.js';
import { airplane } from '../models/airplane.js';
import { flight } from '../models/flights.js';
import { db } from '../config/dbConfig.js';


// City seed data
const cityData = [
  { name: 'Mumbai' },
  { name: 'Delhi' },
  { name: 'Bangalore' },
  { name: 'Chennai' },
  { name: 'Kolkata' },
  { name: 'Hyderabad' },
  { name: 'Pune' },
  { name: 'Ahmedabad' },
  { name: 'Jaipur' },
  { name: 'Goa' },
  { name: 'Kochi' },
  { name: 'Lucknow' },
  { name: 'Chandigarh' },
  { name: 'Indore' },
  { name: 'Bhubaneswar' }
];

// Airplane seed data
const airplaneData = [
  { modelNumeber: 'Boeing 737-800', capacity: 189 },
  { modelNumeber: 'Airbus A320', capacity: 180 },
  { modelNumeber: 'Boeing 777-300ER', capacity: 396 },
  { modelNumeber: 'Airbus A330-300', capacity: 440 },
  { modelNumeber: 'Boeing 787-8', capacity: 242 },
  { modelNumeber: 'Airbus A350-900', capacity: 315 },
  { modelNumeber: 'Boeing 737 MAX 8', capacity: 178 },
  { modelNumeber: 'Embraer E190', capacity: 114 },
  { modelNumeber: 'ATR 72-600', capacity: 78 },
  { modelNumeber: 'Bombardier Q400', capacity: 90 }
];

// Airport seed data (will be populated after cities are inserted)
const airportData = [
  { name: 'Chhatrapati Shivaji Maharaj International Airport', address: 'Andheri, Mumbai', cityName: 'Mumbai' },
  { name: 'Indira Gandhi International Airport', address: 'Palam, Delhi', cityName: 'Delhi' },
  { name: 'Kempegowda International Airport', address: 'Devanahalli, Bangalore', cityName: 'Bangalore' },
  { name: 'Chennai International Airport', address: 'Meenambakkam, Chennai', cityName: 'Chennai' },
  { name: 'Netaji Subhash Chandra Bose International Airport', address: 'Dum Dum, Kolkata', cityName: 'Kolkata' },
  { name: 'Rajiv Gandhi International Airport', address: 'Shamshabad, Hyderabad', cityName: 'Hyderabad' },
  { name: 'Pune Airport', address: 'Lohegaon, Pune', cityName: 'Pune' },
  { name: 'Sardar Vallabhbhai Patel International Airport', address: 'Hansol, Ahmedabad', cityName: 'Ahmedabad' },
  { name: 'Jaipur International Airport', address: 'Sanganer, Jaipur', cityName: 'Jaipur' },
  { name: 'Goa International Airport', address: 'Dabolim, Goa', cityName: 'Goa' },
  { name: 'Cochin International Airport', address: 'Nedumbassery, Kochi', cityName: 'Kochi' },
  { name: 'Chaudhary Charan Singh International Airport', address: 'Amausi, Lucknow', cityName: 'Lucknow' },
  { name: 'Chandigarh Airport', address: 'Mohali, Chandigarh', cityName: 'Chandigarh' },
  { name: 'Devi Ahilya Bai Holkar Airport', address: 'Indore, Madhya Pradesh', cityName: 'Indore' },
  { name: 'Biju Patnaik International Airport', address: 'Bhubaneswar, Odisha', cityName: 'Bhubaneswar' }
];

// Helper function to generate random flight data
function generateFlightData(airports, airplanes) {
  const flights = [];
  const flightPrefixes = ['6E', 'AI', 'UK', 'SG', 'G8', 'I5', '9W'];
  
  for (let i = 0; i < 50; i++) {
    const departureAirport = airports[Math.floor(Math.random() * airports.length)];
    let arrivalAirport = airports[Math.floor(Math.random() * airports.length)];
    
    // Ensure departure and arrival airports are different
    while (arrivalAirport.id === departureAirport.id) {
      arrivalAirport = airports[Math.floor(Math.random() * airports.length)];
    }
    
    const airplane = airplanes[Math.floor(Math.random() * airplanes.length)];
    const prefix = flightPrefixes[Math.floor(Math.random() * flightPrefixes.length)];
    const flightNumber = `${prefix}${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Generate random departure time (next 30 days)
    const departureTime = new Date();
    departureTime.setDate(departureTime.getDate() + Math.floor(Math.random() * 30));
    departureTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    
    // Generate arrival time (1-8 hours after departure)
    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(arrivalTime.getHours() + Math.floor(1 + Math.random() * 7));
    
    const price = Math.floor(3000 + Math.random() * 15000); // Price between 3000-18000
    const boardingGates = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const boardingGate = boardingGates[Math.floor(Math.random() * boardingGates.length)];
    
    flights.push({
      flightNumber,
      airplaneId: airplane.id,
      departureAirportId: departureAirport.id,
      arrivalAirportId: arrivalAirport.id,
      arrivalTime,
      departureTime,
      price,
      boardingGate,
      totalSeats: airplane.capacity
    });
  }
  
  return flights;
}

// Main seeder function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Clearing existing data...');
    await db.delete(flight);
    await db.delete(airport);
    await db.delete(airplane);
    await db.delete(city);
    
    // Seed cities
    console.log('🏙️  Seeding cities...');
    const insertedCities = await db.insert(city).values(cityData);
    console.log(`✅ Inserted ${cityData.length} cities`);
    
    // Get inserted cities with IDs
    const cities = await db.select().from(city);
    
    // Seed airplanes
    console.log('✈️  Seeding airplanes...');
    const insertedAirplanes = await db.insert(airplane).values(airplaneData);
    console.log(`✅ Inserted ${airplaneData.length} airplanes`);
    
    // Get inserted airplanes with IDs
    const airplanes = await db.select().from(airplane);
    
    // Prepare airport data with city IDs
    const airportsWithCityIds = airportData.map(airportItem => {
      const cityRecord = cities.find(c => c.name === airportItem.cityName);
      return {
        name: airportItem.name,
        address: airportItem.address,
        cityId: cityRecord.id
      };
    });
    
    // Seed airports
    console.log('🛫 Seeding airports...');
    const insertedAirports = await db.insert(airport).values(airportsWithCityIds);
    console.log(`✅ Inserted ${airportsWithCityIds.length} airports`);
    
    // Get inserted airports with IDs
    const airports = await db.select().from(airport);
    
    // Generate and seed flights
    console.log('🎫 Generating and seeding flights...');
    const flightData = generateFlightData(airports, airplanes);
    
    // Insert flights in batches to avoid overwhelming the database
    const batchSize = 10;
    for (let i = 0; i < flightData.length; i += batchSize) {
      const batch = flightData.slice(i, i + batchSize);
      await db.insert(flight).values(batch);
    }
    
    console.log(`✅ Inserted ${flightData.length} flights`);
    
    console.log('🎉 Database seeding completed successfully!');
    
    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`- Cities: ${cities.length}`);
    console.log(`- Airports: ${airports.length}`);
    console.log(`- Airplanes: ${airplanes.length}`);
    console.log(`- Flights: ${flightData.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding process failed:', error);
      process.exit(1);
    });
}

// ------- Package.json scripts section -------
/*
Add these scripts to your package.json:

{
  "scripts": {
    "seed": "node seeders/index.js",
    "seed:cities": "node -e \"import('./seeders/index.js').then(m => m.seedCities())\"",
    "seed:airplanes": "node -e \"import('./seeders/index.js').then(m => m.seedAirplanes())\"",
    "seed:airports": "node -e \"import('./seeders/index.js').then(m => m.seedAirports())\"",
    "seed:flights": "node -e \"import('./seeders/index.js').then(m => m.seedFlights())\"",
    "seed:fresh": "node -e \"import('./seeders/index.js').then(m => m.seedDatabase())\""
  }
}
*/

// ------- Environment variables example -------
/*
Create a .env file with:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airline_db
*/

export { seedDatabase };

// Alternative: Individual seeder functions for more granular control
export async function seedCities() {
  console.log('🏙️  Seeding cities...');
  await db.delete(city);
  const result = await db.insert(city).values(cityData);
  console.log(`✅ Inserted ${cityData.length} cities`);
  return result;
}

export async function seedAirplanes() {
  console.log('✈️  Seeding airplanes...');
  await db.delete(airplane);
  const result = await db.insert(airplane).values(airplaneData);
  console.log(`✅ Inserted ${airplaneData.length} airplanes`);
  return result;
}

export async function seedAirports() {
  console.log('🛫 Seeding airports...');
  const cities = await db.select().from(city);
  
  const airportsWithCityIds = airportData.map(airportItem => {
    const cityRecord = cities.find(c => c.name === airportItem.cityName);
    return {
      name: airportItem.name,
      address: airportItem.address,
      cityId: cityRecord.id
    };
  });
  
  await db.delete(airport);
  const result = await db.insert(airport).values(airportsWithCityIds);
  console.log(`✅ Inserted ${airportsWithCityIds.length} airports`);
  return result;
}

export async function seedFlights() {
  console.log('🎫 Seeding flights...');
  const airports = await db.select().from(airport);
  const airplanes = await db.select().from(airplane);
  
  const flightData = generateFlightData(airports, airplanes);
  
  await db.delete(flight);
  
  // Insert in batches
  const batchSize = 10;
  for (let i = 0; i < flightData.length; i += batchSize) {
    const batch = flightData.slice(i, i + batchSize);
    await db.insert(flight).values(batch);
  }
  
  console.log(`✅ Inserted ${flightData.length} flights`);
  return flightData.length;
}