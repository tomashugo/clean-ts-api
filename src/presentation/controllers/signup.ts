import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Controller } from '../protocols/controller'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
