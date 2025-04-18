import { PrismaTasksReporitory } from "../../repositories/prisma/prisma-tasks-repository";
import { UpdateTaskUseCase } from "../update-task-use-case";

export function makeUpdateTaskUseCase() {
  const tasksRepository = new PrismaTasksReporitory();

  const useCase = new UpdateTaskUseCase(tasksRepository);

  return useCase;
}
