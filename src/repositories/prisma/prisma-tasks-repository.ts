import { prisma } from "../../database/prisma";
import { ITask } from "../../entities/task-entity";
import { ITaskRepository } from "../tasks-repository";

export class PrismaTasksReporitory implements ITaskRepository {
  async create(data: ITask) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
      },
    });

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
    } as ITask;
  }

  async list() {
    const tasks = await prisma.task.findMany();

    return tasks as ITask[];
  }

  async findById(id: number) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task as ITask | null;
  }

  async update(data: Partial<ITask>) {
    const task = await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
      },
    });

    return task as ITask;
  }

  async delete(id: number) {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return task as ITask;
  }
}
