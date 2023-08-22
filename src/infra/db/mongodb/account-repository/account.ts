import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

interface MongoDbAccountRepositoryObject {
    _id: ObjectId
    name: string
    email: string
    password: string 
}

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const id = result.insertedId

    const account = await accountCollection.findOne({
        _id: id
    }) as MongoDbAccountRepositoryObject

    const { _id, ...accountWithoutId } = account
    
    return Object.assign({}, accountWithoutId, {id: _id.toString()})
  }
}