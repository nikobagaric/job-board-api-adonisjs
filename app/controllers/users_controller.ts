import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
    public async index({ response }: HttpContext) {
        const users = await User.all()
        return response.status(200).json(users)
    }

    public async show({ response, params }: HttpContext) {
        const user = await User.findOrFail(params.id)
        return response.status(200).json(user)
    }

    public async store({ request, response }: HttpContext) {
        const data = request.only(['fullName', 'email', 'password'])
        const user = await User.create(data)
        return response.status(201).json(user)
    }

    public async update({ request, response, params }: HttpContext) {
        const user = await User.findOrFail(params.id)
        const data = request.only(['fullName', 'email', 'password'])
        user.merge(data)
        await user.save()
        return response.status(200).json(user)
    }

    public async destroy({ response, params }: HttpContext) {
        const user = await User.findOrFail(params.id)
        await user.delete()
        return response.status(204)
    }
}