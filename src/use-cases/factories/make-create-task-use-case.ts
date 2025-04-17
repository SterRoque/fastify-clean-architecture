import { PrismaTasksReporitory } from "../../repositories/prisma/prisma-tasks-repository";
import { CreateTaskUseCase } from "../create-task-use-case";

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksReporitory();

  const useCase = new CreateTaskUseCase(tasksRepository);

  return useCase;
}
