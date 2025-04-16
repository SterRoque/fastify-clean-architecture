import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { CreateTaskUseCase } from "./create-task-use-case";
import { InMemoryTasksRepository } from "../repositories/in-memory/in-memory-tasks-repository";

describe("create task (use case)", () => {
  let sut: CreateTaskUseCase;
  let tasksRepository: InMemoryTasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CreateTaskUseCase(tasksRepository);
  });

  test("deveria criar uma task", () => {
    sut.execute({
      title: "Estudar React",
      description: "Assistir aulas sobre componentes, props e hooks.",
    });

    expect(tasksRepository.tasks.length).toEqual(1);

    expect(tasksRepository.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: "Estudar React",
        }),
      ])
    );
  });
});
