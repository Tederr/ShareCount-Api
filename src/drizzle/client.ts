import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env';
import { subscriptions } from './tables/subscriptions';

export const pg = postgres(env.DATABASE_URL);
export const db = drizzle(pg, {
	schema: { subscriptions },
});

// TODO: 20:17
