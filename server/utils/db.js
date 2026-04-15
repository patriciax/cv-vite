import { promises as fs } from 'fs'
import { join } from 'path'
import dbData from '../data/db.json'

export const readDb = async () => {
  if (process.env.NODE_ENV === 'production') {
    return dbData
  }
  
  try {
    const dbPath = join(process.cwd(), 'server/data/db.json')
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return dbData || { projects: [], experience: [] }
  }
}

export const writeDb = async (data) => {
  if (process.env.NODE_ENV !== 'production') {
    const dbPath = join(process.cwd(), 'server/data/db.json')
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2))
  }
}
