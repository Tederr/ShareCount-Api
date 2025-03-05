import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { loginToEvent } from '../functions/login-to-event';

export const loginToEventRoute: FastifyPluginAsyncZod = async app => {
	app.get(
		'/login/:email',
		{
			schema: {
				summary: 'Login to event',
				tags: ['Login'],
				operationId: 'loginToEvent',
				params: z.object({
					email: z.string().email(),
				}),
				response: {
					200: z.object({
						subscribeId: z.string().optional(),
					}),
				},
			},
		},
		async request => {
			const { email } = request.params;

			const { subscribeId } = await loginToEvent({
				email,
			});

			return { subscribeId };
		}
	);
};
