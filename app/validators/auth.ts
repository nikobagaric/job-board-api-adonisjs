import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string().minLength(3).maxLength(255),
        email: vine.string()
            .email()
            .unique(async (query, field) => {
                const user = await query.from('users').where('email', field).first()
                return !user
            }),
        password: vine.string().minLength(8).maxLength(32)
    })
)

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8).maxLength(32)
    })
)