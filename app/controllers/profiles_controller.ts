import type { HttpContext } from '@adonisjs/core/http'
import Profile from '#models/profile'

export default class ProfilesController {
    public async index({ response }: HttpContext) {
        const profiles = await Profile.all()
        return response.status(200).json(profiles)
    }

    public async show({ response, params }: HttpContext) {
        const profile = await Profile.findOrFail(params.id)
        return response.status(200).json(profile)
    }

    public async store({ request, response }: HttpContext) {
        const data = request.only(['userId', 'fullName', 'resume', 'description', 'workExperience'])
        const profile = await Profile.create(data)
        return response.status(201).json(profile)
    }

    public async update({ request, response, params }: HttpContext) {
        const profile = await Profile.findOrFail(params.id)
        const data = request.only(['userId', 'fullName', 'resume', 'description', 'workExperience'])
        profile.merge(data)
        await profile.save()
        return response.status(200).json(profile)
    }

    public async destroy({ response, params }: HttpContext) {
        const profile = await Profile.findOrFail(params.id)
        await profile.delete()
        return response.status(204)
    }
}