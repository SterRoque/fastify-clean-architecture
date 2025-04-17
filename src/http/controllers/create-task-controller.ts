import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateTaskUseCase } from "../../use-cases/factories/make-create-task-use-case";

class CreateTaskController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      isCompleted: z.boolean().optional(),
    });

    const data = schema.parse(request.body);

    const createTaskUseCase = makeCreateTaskUseCase();

    const response = await createTaskUseCase.execute(data);

    return reply.status(201).send(response);
  }
}

export const createTaskController = new CreateTaskController();
