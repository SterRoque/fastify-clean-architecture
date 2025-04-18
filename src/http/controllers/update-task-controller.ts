import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateTaskUseCase } from "../../use-cases/factories/make-update-task-use-case";
import { z } from "zod";
import { TaskNotFoundError } from "../../use-cases/errors/task-not-found-error";

class UpdateTaskController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const schema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        isCompleted: z.boolean().optional(),
      });

      const data = schema.parse(request.body);

      const updateTaskUseCase = makeUpdateTaskUseCase();

      const response = await updateTaskUseCase.execute({
        id: Number(id),
        ...data,
      });

      return reply.status(200).send(response);
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        return reply.status(404).send(error.message);
      }

      return reply.status(500).send();
    }
  }
}

export const updateTaskController = new UpdateTaskController();
