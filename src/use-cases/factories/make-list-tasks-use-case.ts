import { PrismaTasksReporitory } from "../../repositories/prisma/prisma-tasks-repository";
import { ListTasksUseCase } from "../list-tasks-use-case";

export function makeListTasksUseCase() {
  const tasksRepository = new PrismaTasksReporitory();

  const useCase = new ListTasksUseCase(tasksRepository);

  return useCase;
}
