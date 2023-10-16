import { Hasher } from "../../../data/protocols/criptography/hasher"
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Hasher {
    constructor (private readonly secret: string) {}

    async hash (value: string): Promise<string> {
        const accessToken = await jwt.sign({id:value},this.secret)
        return accessToken
    }
}