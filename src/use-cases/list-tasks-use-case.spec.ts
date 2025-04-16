import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryTasksRepository } from "../repositories/in-memory/in-memory-tasks-repository";
import { ListTasksUseCase } from "./list-tasks-use-case";

describe("list tasks (use case)", () => {
  let sut: ListTasksUseCase;
  let tasksRepository: InMemoryTasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new ListTasksUseCase(tasksRepository);
  });
  test("deve listar todas as tasks", async () => {
    await tasksRepository.create({
      title: "Estudar Arquitetura Limpa",
      description: "Chato demais",
    });

    const tasks = await sut.execute();

    expect(tasks.length).toEqual(1);

    expect(tasksRepository.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: "Estudar Arquitetura Limpa",
          description: "Chato demais",
        }),
      ])
    );
  });
});
