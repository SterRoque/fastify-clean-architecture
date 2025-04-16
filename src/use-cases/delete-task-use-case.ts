import { ITask } from "../entities/task-entity";
import { ITaskRepository } from "../repositories/tasks-repository";
import { TaskNotFoundError } from "./errors/task-not-found-error";

export class DeleteTaskUseCase {
  constructor(private readonly tasksRepository: ITaskRepository) {}

  async execute(id: number): Promise<ITask> {
    let task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new TaskNotFoundError();
    }

    task = await this.tasksRepository.delete(id);

    return task as ITask;
  }
}
