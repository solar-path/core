export let modelTemplate = `

import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const {MODEL_NAME_TABLE} = mysqlTable('{MODEL_NAME}', {
    id: varchar('id', {
		length: 50
	}).primaryKey(),
    {FIELDS}

    createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
`

