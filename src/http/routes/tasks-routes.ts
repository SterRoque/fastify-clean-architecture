import { FastifyInstance } from "fastify";
import { createTaskController } from "../controllers/create-task-controller";
import { listTasksController } from "../controllers/list-tasks-controller";
import { updateTaskController } from "../controllers/update-task-controller";
import { deleteTaskController } from "../controllers/delete-task-controller";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", createTaskController.execute);

  app.get("/tasks", listTasksController.execute);

  app.patch("/tasks/:id", updateTaskController.execute);

  app.delete("/tasks/:id", deleteTaskController.execute);
}
