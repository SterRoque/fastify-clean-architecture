import { ITask } from "../entities/task-entity";
import { ITaskRepository } from "../repositories/tasks-repository";
import { TaskNotFoundError } from "./errors/task-not-found-error";

export class UpdateTaskUseCase {
  constructor(private readonly tasksRepository: ITaskRepository) {}

  async execute(data: Partial<ITask>): Promise<ITask> {
    const taskExists = await this.tasksRepository.findById(data.id!);

    if (!taskExists) {
      throw new TaskNotFoundError();
    }
    const task = await this.tasksRepository.update(data);

    return task as ITask;
  }
}
