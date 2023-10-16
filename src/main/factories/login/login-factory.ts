// import { Controller } from "../../../presentation/protocols"
// import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
// import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository"
// import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
// import { LoginController } from "../../../presentation/controllers/login/login-controller"
// import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter"
// import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository"
// import { makeLoginValidation } from "./login-validation-factory"
// import { LogControllerDecorator } from "../../decorators/log-controller-decorator"

// export const makeLoginController = (): Controller => {
//     const salt = 12
//     const accountMongoRepository = new AccountMongoRepository()
//     const bcrytpAdapter = new BcryptAdapter(salt)
//     const jwtAdapter = new JwtAdapter('')
//     const dbAuthentication = new DbAuthentication(accountMongoRepository,bcrytpAdapter,jwtAdapter,accountMongoRepository)
//     const loginController = new LoginController(dbAuthentication, makeLoginValidation())
//     const logMongoRepository = new LogMongoRepository()
//     return new LogControllerDecorator(loginController, logMongoRepository)
// }