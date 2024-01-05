import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { Authentication } from '../../../../domain/usecases/authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'

export const makeDbAddAccount = (): AddAccount => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const loadAccountByEmailRepository = new AccountMongoRepository()
    return new DbAddAccount(bcryptAdapter, accountMongoRepository, loadAccountByEmailRepository)
}
