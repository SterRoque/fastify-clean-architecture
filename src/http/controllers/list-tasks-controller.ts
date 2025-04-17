import { FastifyReply, FastifyRequest } from "fastify";
import { makeListTasksUseCase } from "../../use-cases/factories/make-list-tasks-use-case";

class ListTasksController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const listTasksUseCase = makeListTasksUseCase();

    const response = await listTasksUseCase.execute();

    reply.status(200).send(response);
  }
}

export const listTasksController = new ListTasksController();
