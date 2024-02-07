import { instanceToInstance } from 'class-transformer'
import { FastifyReply } from 'fastify'

export class ResponseHandler {
  static json<T>(
    data: T,
    response: FastifyReply,
    code: number = 200,
  ): FastifyReply {
    return response.code(code).send(instanceToInstance(data))
  }
}
