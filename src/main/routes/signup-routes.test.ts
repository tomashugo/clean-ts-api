import request from 'supertest'
import app from '../config/app'

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
