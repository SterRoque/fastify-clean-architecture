import { FastifyInstance } from "fastify";
import { createTaskController } from "../controllers/create-task-controller";
import { listTasksController } from "../controllers/list-tasks-controller";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", createTaskController.execute);

  app.get("/tasks", listTasksController.execute);
}
