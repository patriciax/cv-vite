import { promises as fs } from 'fs'
import { join } from 'path'

const dbPath = join(process.cwd(), 'server/data/db.json')

export const readDb = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { projects: [], experience: [] }
  }
}

export const writeDb = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2))
}
