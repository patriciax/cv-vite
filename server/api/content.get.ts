export default defineEventHandler(async (event) => {
  const data = await readDb()
  return data
})
