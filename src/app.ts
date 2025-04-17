import fastify from "fastify";
import { tasksRoutes } from "./http/routes/tasks-routes";

const app = fastify();

app.register(tasksRoutes);

export { app };
