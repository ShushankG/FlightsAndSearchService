import { mysqlTable, varchar, serial, timestamp } from "drizzle-orm/mysql-core";
export const city = mysqlTable("city", {
  id: serial("id", { unsigned: true }),
  name: varchar("name",{ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
