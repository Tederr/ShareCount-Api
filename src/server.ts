import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { loginToEvent } from './functions/login-to-event';
import { accessInviteLinkRoute } from './routes/access-invite-link-route';
import { getRankingRoute } from './routes/get-ranking-route';
import { getSubscriberInvitesClicksRoute } from './routes/get-subscriber-invites-clicks-route';
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route';
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position';
import { loginToEventRoute } from './routes/login-to-event-toutes';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: true,
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Sharecount API',
			version: '0.0.1',
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
});

app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInvitesClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);
app.register(loginToEventRoute);

app
	.listen({
		port: env.PORT || 3333,
		host: '0.0.0.0',
	})
	.then(() => {
		console.log(`Server running on http://localhost:${env.PORT}`);
	});
