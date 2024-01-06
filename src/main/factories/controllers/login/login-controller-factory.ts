import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
  // const logMongoRepository = new LogMongoRepository()
  // return new LogControllerDecorator(loginController, logMongoRepository)
}
