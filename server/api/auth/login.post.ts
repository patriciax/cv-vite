export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (body.password === 'admin123') { // Simple password for demo
    return { token: 'admin-token' }
  }
  
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized'
  })
})
