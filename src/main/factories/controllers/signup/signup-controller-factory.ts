import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../use-cases/add-acount/db-add-account-factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const dbAddAccount = makeDbAddAccount()
  const signupController = new SignUpController(dbAddAccount, makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signupController)
}
