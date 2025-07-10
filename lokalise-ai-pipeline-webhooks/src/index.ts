import Fastify from "fastify";
import { port } from "./config.js";
import rootRoutes from "./routes/root.js";
import webhookRoutes from "./routes/webhooks.js";

const app = Fastify();

app.register(rootRoutes, { prefix: "/" });
app.register(webhookRoutes, { prefix: "/webhooks" });

const start = async () => {
	try {
		await app.listen({ port });
		console.log(`🚀 Server running at http://localhost:${port}`);
	} catch (err) {
		app.log?.error?.(err);
		process.exit(1);
	}
};

start();
