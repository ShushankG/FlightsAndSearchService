import { mysqlTable, varchar, serial, bigint } from "drizzle-orm/mysql-core";
import { city } from "./city.js";
export const airport = mysqlTable("airport", {
  id: serial("id", { unsigned: true }).primaryKey(),
  name: varchar("name",{ length: 255 }).notNull(),
  address: varchar("address",{ length: 255 }),
  cityId: bigint("city_id",{unsigned:true}).notNull().references(()=> city.id,{onDelete:'cascade'})
});
