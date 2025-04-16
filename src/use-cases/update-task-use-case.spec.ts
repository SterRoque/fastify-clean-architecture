import { beforeEach, describe, expect, test } from "vitest";
import { UpdateTaskUseCase } from "./update-task-use-case";
import { InMemoryTasksRepository } from "../repositories/in-memory/in-memory-tasks-repository";
import { TaskNotFoundError } from "./errors/task-not-found-error";

describe("update task (use case)", () => {
  let sut: UpdateTaskUseCase;
  let tasksRepository: InMemoryTasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskUseCase(tasksRepository);
  });

  test("Deve atualizar uma task existente", async () => {
    await tasksRepository.create({
      title: "Comer",
      description: "eh muito bom",
    });

    const task = await tasksRepository.create({
      title: "Dormir",
      description: "eh bom demais",
    });

    const result = await sut.execute({
      id: task.id,
      title: "Estudar",
      isCompleted: true,
    });

    expect(result.title).not.equal(task.title);
    expect(result.description).toEqual(task.description);
    expect(result.isCompleted).toBeTruthy();
  });

  test("Não deve atualizar uma task inexistente", async () => {
    await expect(sut.execute({ id: 200, isCompleted: true })).rejects.toThrow(
      TaskNotFoundError
    );
  });
});
