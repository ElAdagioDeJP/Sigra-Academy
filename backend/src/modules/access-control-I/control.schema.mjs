import { z } from 'zod'

// Esquema para validar params de GET /users/:id
export const getUserParamsSchema = z.object({
  id: z.coerce.number().int().positive()
})

export function validateGetUser(req, res, next) {
  const result = getUserParamsSchema.safeParse(req.params)
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid parameters', errors: result.error.errors })
  }

  // Reemplazamos el id en params por su versión numérica
  req.params.id = result.data.id
  return next()
}

// Esquema para validar params de GET /users/name/:name
export const getUserNameParamsSchema = z.object({
  name: z.string().min(1)
})

export function validateGetUserName(req, res, next) {
  const result = getUserNameParamsSchema.safeParse(req.params)
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid parameters', errors: result.error.errors })
  }

  req.params.name = result.data.name
  return next()
}

// Esquema para validar params de GET /users/email/:email
export const getUserEmailParamsSchema = z.object({
  email: z.string().email()
})

export function validateGetUserEmail(req, res, next) {
  const result = getUserEmailParamsSchema.safeParse(req.params)
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid parameters', errors: result.error.errors })
  }

  req.params.email = result.data.email
  return next()
}

// Esquema para validar params de GET /roles/:id
export const getRoleParamsSchema = z.object({
  id: z.coerce.number().int().min(0)
})

export function validateGetRole(req, res, next) {
  const result = getRoleParamsSchema.safeParse(req.params)
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid parameters', errors: result.error.errors })
  }

  req.params.id = result.data.id
  return next()
}

export default { getUserParamsSchema, validateGetUser }
