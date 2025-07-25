import {
  mysqlTable,
  varchar,
  serial,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

export const airplane = mysqlTable("airplane", {
  id: serial("id", { unsigned: true }).primaryKey(),
  modelNumeber: varchar("model_number",{ length: 255 }).notNull(),
  capacity: int("capacity", { unsigned: true }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
