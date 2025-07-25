import { mysqlTable, serial, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const flight = mysqlTable("flight", {
  id: serial("id", { unsigned: true }).primaryKey(),
  flightNumber: varchar("flight_number", { length: 255 }).notNull().unique(),
  airplaneId: int("airplane_id").notNull(),
  departureAirportId: int("departure_airport_id").notNull(),
  arrivalAirportId: int("arrival_airport_id").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  departureTime: timestamp("departure_time").notNull(),
  price: int("price").notNull(),
  boardingGate: varchar("boarding_gate", { length: 255 }),
  totalSeats: int("total_seats").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});