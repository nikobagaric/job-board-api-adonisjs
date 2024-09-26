import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user

    if(!user) {
      return ctx.response.unauthorized('You must be logged in to access this resource')
    }
    if(user?.id !== ctx.params.id) {
      return ctx.response.forbidden('You are not authorized to access this resource')
    }

    const output = await next()
    return output
  }
}