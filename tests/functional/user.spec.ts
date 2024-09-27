import { test } from '@japa/runner'
import User from '#models/user'

test.group('UsersController', (group) => {

  group.each.setup(async () => {
    await User.query().delete()
  })

  // Test: Create a new user
  test('post a new user', async ({ client }) => {
    const user = {
      email: 'email@example.com',
      password: 'password',
      fullName: 'John Doe',
    }

    const response = await client.post('/api/v1/users').json(user)
    response.assertStatus(201)
  })

  // Test: Get a user by ID
  test('get a user by id', async ({ client }) => {
    const user = await User.create({
      email: 'email2@example.com',
      password: 'password',
      fullName: 'Jane Doe',
    })

    const response = await client.get(`/api/v1/users/${user.id}`)
    response.assertStatus(200)
    response.assertBodyContains({ email: user.email, fullName: user.fullName })
  })

  // Test: Update a user
  test('update a user', async ({ client }) => {
    const user = await User.create({
      email: 'email3@example.com',
      password: 'password',
      fullName: 'Sam Smith',
    })

    const updatedData = {
      fullName: 'Samuel Smith',
    }

    const response = await client.put(`/api/v1/users/${user.id}`)
      .json(updatedData)

    response.assertStatus(200)

    const updatedUser = await User.findOrFail(user.id)
    response.assertBodyContains({ fullName: 'Samuel Smith' })
  })

  // Test: Delete a user
  test('delete a user', async ({ client, assert }) => {
    const user = await User.create({
      email: 'email4@example.com',
      password: 'password',
      fullName: 'Alice Johnson',
    })

    const response = await client.delete(`/api/v1/users/${user.id}`)
    response.assertStatus(204)

    const deletedUser = await User.find(user.id)
    assert.isNull(deletedUser)
  })

  // Test: Get all users
  test('get all users', async ({ client }) => {
    await User.createMany([
      { email: 'email5@example.com', password: 'password', fullName: 'David Lee' },
      { email: 'email6@example.com', password: 'password', fullName: 'Chris Evans' }
    ])

    const response = await client.get('/api/v1/users')
    response.assertStatus(200)
    response.assertBodyContains([
      { email: 'email5@example.com', fullName: 'David Lee' },
      { email: 'email6@example.com', fullName: 'Chris Evans' }
    ])
  })
})
