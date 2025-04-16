import { ITask } from "../../entities/task-entity";
import { ITaskRepository } from "../tasks-repository";

export class InMemoryTasksRepository implements ITaskRepository {
  tasks: ITask[] = [];

  async create(data: ITask) {
    const task = {
      id: this.tasks.length + 1,
      title: data.title,
      description: data.description,
      isCompleted: !!data.isCompleted,
      createdAt: new Date(),
    };

    this.tasks.push(task);

    return task;
  }

  async list() {
    return this.tasks;
  }

  async findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      return task;
    }

    return null;
  }

  async update(data: Partial<ITask>) {
    const taskIndex = this.tasks.findIndex((task) => task.id === data.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = {
        title: data.title ?? this.tasks[taskIndex].title,
        description: data.description ?? this.tasks[taskIndex].description,
        isCompleted: data.isCompleted ?? this.tasks[taskIndex].isCompleted,
      };

      return this.tasks[taskIndex];
    }

    return null;
  }

  async delete(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      const task = this.tasks[taskIndex];

      this.tasks.splice(taskIndex, 1);

      return task;
    }

    return null;
  }
}
