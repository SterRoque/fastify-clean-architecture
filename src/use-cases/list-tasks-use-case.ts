import { ITask } from "../entities/task-entity";
import { ITaskRepository } from "../repositories/tasks-repository";

export class ListTasksUseCase {
  constructor(private readonly tasksRepository: ITaskRepository) {}

  async execute(): Promise<ITask[]> {
    const tasks = await this.tasksRepository.list();

    return tasks;
  }
}
