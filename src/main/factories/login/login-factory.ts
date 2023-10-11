// import { LogControllerDecorator } from "../../decorators/log"
// import { Controller } from "../../../presentation/protocols"
// import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
// import { LoginController } from "../../../presentation/controllers/login/login"
// import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log"
// import { makeLoginValidation } from "./login-validation"
// import { AccountMongoRepository } from "../../../infra/db/mongodb/account-repository/account"
// import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"

// export const makeLoginController = (): Controller => {
//     const salt = 12
//     const bcrytpAdapter = new BcryptAdapter(salt)
//     const jwtAdapter = new JwtAdapter('')
//     const accountMongoRepository = new AccountMongoRepository()
//     const dbAuthentication = new DbAuthentication()
//     const loginController = new LoginController(dbAuthentication, makeLoginValidation())
//     const logMongoRepository = new LogMongoRepository()
//     return new LogControllerDecorator(loginController, logMongoRepository)
// }