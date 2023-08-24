import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // return await this.controller.handle(httpRequest)
    await this.controller.handle(httpRequest)
    return await new Promise(resolve => { resolve(null as unknown as HttpResponse) })
  }
}
