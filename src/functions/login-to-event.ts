import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { subscriptions } from '../drizzle/tables/subscriptions';

interface loginToEventParams {
	email: string;
}
export async function loginToEvent({ email }: loginToEventParams) {
	const result = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email));

	if (result.length === 0) {
		return;
	}

	const subscribers = result[0];

	return {
		subscribeId: subscribers.id,
	};
}
