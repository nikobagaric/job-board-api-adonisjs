import type { HttpContext } from '@adonisjs/core/http'
import Application from '#models/application'

export default class ApplicationController {
    public async index({ response }: HttpContext) {
        const applications = await Application.all()
        return response.status(200).json(applications)
    }

    public async show({ response, params }: HttpContext) {
        const application = await Application.findOrFail(params.id)
        return response.status(200).json(application)
    }

    public async store({ request, response }: HttpContext) {
        const data = request.only(['jobId', 'profileId', 'status'])
        const application = await Application.create(data)
        return response.status(201).json(application)
    }

    public async update({ request, response, params }: HttpContext) {
        const application = await Application.findOrFail(params.id)
        const data = request.only(['jobId', 'profileId', 'status'])
        application.merge(data)
        await application.save()
        return response.status(200).json(application)
    }

    public async destroy({ response, params }: HttpContext) {
        const application = await Application.findOrFail(params.id)
        await application.delete()
        return response.status(204)
    }
}