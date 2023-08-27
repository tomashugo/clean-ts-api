import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    }
    if (!password) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    }
    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
    }
    return await new Promise(resolve => { resolve(null as unknown as HttpResponse) })
  }
}
