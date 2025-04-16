import { beforeEach, describe, expect, test } from "vitest";
import { DeleteTaskUseCase } from "./delete-task-use-case";
import { InMemoryTasksRepository } from "../repositories/in-memory/in-memory-tasks-repository";
import { afterEach } from "node:test";
import { TaskNotFoundError } from "./errors/task-not-found-error";

describe("delete task (use case)", () => {
  let sut: DeleteTaskUseCase;
  let tasksRepository: InMemoryTasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new DeleteTaskUseCase(tasksRepository);
  });

  test("Deve remover uma task", async () => {
    await tasksRepository.create({
      title: "Estudar",
      description: "eh muito chato",
    });

    const task = await tasksRepository.create({
      title: "Programar",
      description: "eh muito chato",
    });

    expect(tasksRepository.tasks.length).toEqual(2);

    await sut.execute(task.id);

    expect(tasksRepository.tasks.length).toEqual(1);
    expect(tasksRepository.tasks).not.contain(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Programar",
        }),
      ])
    );
  });

  test("Não deve excluir se a task não existir", async () => {
    await expect(sut.execute(150)).rejects.toThrow(TaskNotFoundError);
  });
});
