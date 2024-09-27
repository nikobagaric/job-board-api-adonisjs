import { test } from '@japa/runner'
import User from '#models/user'


test.group('Auth', (group) => {

  group.each.setup(async () => {
    await User.query().delete()
  })

  group.each.teardown(async () => {
    await User.query().delete()
  })

  test('register a new user', async ({ client }) => {
    const user = {
      email: 'newuser@example.com',
      password: 'password',
      fullName: 'New User',
    }

    const response = await client.post('/api/v1/register').json(user)
    response.assertStatus(201)
    response.assertBodyContains({ email: user.email, fullName: user.fullName })
  })

  test('login a user', async ({ client }) => {
    const user = {
      email: 'validuser1@example.com',
      password: 'password',
      fullName: 'Valid User',
    }

    await client.post('/api/v1/register').json(user)

    const response = await client.post('/api/v1/login').json({
      email: user.email,
      password: 'password',
    })

    response.assertStatus(200)
    response.assertBodyContains({ email: user.email, fullName: user.fullName })
  })
})