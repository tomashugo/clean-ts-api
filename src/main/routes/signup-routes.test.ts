import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL as string)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  const accountCollection = MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})

describe('SignUp Routes', () => {
  test('Shoud return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        nome: 'Tomás',
        email: 'tomas.hugo@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
