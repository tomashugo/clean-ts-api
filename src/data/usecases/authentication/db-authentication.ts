import {
  type Authentication,
  type AuthenticationModel,
  type HashComparer,
  type LoadAccountByEmailRepository,
  type TokenGenerator,
  type UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const token = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, token)
        return token
      }
    }

    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
