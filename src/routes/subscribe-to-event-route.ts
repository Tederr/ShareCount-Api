import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { subscribeToEvent } from '../functions/subscribe-to-event';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
	app.post(
		'/subscriptions',
		{
			schema: {
				summary: 'Subscribe to event',
				tags: ['subscriptions'],
				operationId: 'subscribeToEvent',
				body: z.object({
					name: z.string(),
					email: z.string().email(),
					referrer: z.string().nullish(),
				}),
				response: {
					201: z.object({
						subscribeId: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, email, referrer } = request.body;

			const { subscribeId } = await subscribeToEvent({
				name,
				email,
				referrerId: referrer,
			});

			return reply.status(201).send({
				subscribeId,
			});
		}
	);
};
