import { promises as fs } from 'fs'
import { join } from 'path'
import defaultData from '../data/db.json'

const dbPath = join(process.cwd(), 'server/data/db.json')

export const readDb = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Return statically imported data if reading from file system fails (e.g., on Vercel)
    return defaultData
  }
}

export const writeDb = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2))
}
