import type { HttpContext } from '@adonisjs/core/http'
import Job from '#models/job'

export default class JobsController {
    public async index({ response }: HttpContext) {
        const jobs = await Job.all()
        return response.status(200).json(jobs)
    }

    public async show({ response, params }: HttpContext) {
        const job = await Job.findOrFail(params.id)
        return response.status(200).json(job)
    }

    public async store({ request, response }: HttpContext) {
        const data = request.only(['employerId', 'title', 'description', 'requirements', 'location', 'salaryRange', 'type'])
        const job = await Job.create(data)
        return response.status(201).json(job)
    }

    public async update({ request, response, params }: HttpContext) {
        const job = await Job.findOrFail(params.id)
        const data = request.only(['employerId', 'title', 'description', 'requirements', 'location', 'salaryRange', 'type'])
        job.merge(data)
        await job.save()
        return response.status(200).json(job)
    }

    public async destroy({ response, params }: HttpContext) {
        const job = await Job.findOrFail(params.id)
        await job.delete()
        return response.status(204)
    }
}