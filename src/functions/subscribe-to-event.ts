import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { subscriptions } from '../drizzle/tables/subscriptions';
import { redis } from '../redis/client';

interface subscribeToEventParams {
	name: string;
	email: string;
	referrerId?: string | null;
}

export async function subscribeToEvent({
	name,
	email,
	referrerId,
}: subscribeToEventParams) {
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email));

	if (subscribers.length > 0) {
		return [];
	}

	const result = await db
		.insert(subscriptions)
		.values({ name, email })
		.returning();

	if (referrerId) {
		await redis.zincrby('referral:ranking', 1, referrerId);
	}

	const subscribe = result[0];

	return {
		subscribeId: subscribe.id,
	};
}
