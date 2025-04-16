import { ITask } from "../entities/task-entity";
import { ITaskRepository } from "../repositories/tasks-repository";

export class CreateTaskUseCase {
  constructor(private readonly tasksRepository: ITaskRepository) {}

  async execute(data: ITask): Promise<ITask> {
    const task = await this.tasksRepository.create(data);

    return task;
  }
}
