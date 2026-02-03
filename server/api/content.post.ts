export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // In a real app, we would verify the JWT token here
  // For this simple portfolio, we'll trust the request for now or add basic header check
  
  await writeDb(body)
  return { success: true }
})
