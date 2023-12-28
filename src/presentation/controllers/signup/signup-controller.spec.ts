import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { SignUpController } from './signup-controller'
import { 
  type AccountModel, 
  type AddAccount, 
  type AddAccountModel, 
  type HttpRequest, 
  type Validation,
  type Authentication,
  type AuthenticationModel } from './signup-controller-protocols'

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
)

const makeFakeAccount = (): AccountModel => (
  {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password'
  }
)

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise((resolve, reject) => {
        resolve(makeFakeAccount())
        reject(new Error())
      })
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.name).toEqual('ServerError')
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call athentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

})
