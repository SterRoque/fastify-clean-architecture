import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteTaskUseCase } from "../../use-cases/factories/make-delete-task-use-case";
import { TaskNotFoundError } from "../../use-cases/errors/task-not-found-error";

class DeleteTaskController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const deleteTaskUseCase = makeDeleteTaskUseCase();

      const response = await deleteTaskUseCase.execute(Number(id));

      return reply.status(200).send(response);
    } catch (error: any) {
      if (error instanceof TaskNotFoundError) {
        return reply.status(404).send(error.message);
      }
      return reply.status(500).send();
    }
  }
}

export const deleteTaskController = new DeleteTaskController();
