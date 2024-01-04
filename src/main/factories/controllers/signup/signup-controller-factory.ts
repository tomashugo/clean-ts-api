import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { type Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../use-cases/add-acount/db-add-account-factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const dbAddAccount = makeDbAddAccount()
  const signupController = new SignUpController(dbAddAccount, makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signupController)
  // const logMongoRepository = new LogMongoRepository()
  // return new LogControllerDecorator(signUpController, logMongoRepository)
}
