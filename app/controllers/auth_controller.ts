import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        const payload = await request.validateUsing(registerValidator)

        const user = await User.create(payload)
        
        return response.created(user)
    }

    public async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator)
        
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)

        return response.ok({
            token: token,
            ...user.serialize(),
        })
    }

    public async logout({ auth, response}: HttpContext) {
        const user = auth.getUserOrFail()
        const token = auth.user?.currentAccessToken.identifier
        if(!token) {
            return response.badRequest('Invalid token')
        }
        await User.accessTokens.delete(user, token)
        return response.ok({ message: 'Logged out successfully' })
    }
}