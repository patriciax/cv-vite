import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()
const dbPath = join(process.cwd(), 'server/data/db.json')

async function main() {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'))

  console.log('Seeding projects...')
  for (const project of data.projects) {
    await prisma.project.upsert({
      where: { slug: project.id },
      update: {},
      create: {
        slug: project.id,
        title: project.title,
        link: project.link,
        tags: JSON.stringify(project.tags),
        color: project.color,
        desc_es: project.description.es,
        desc_en: project.description.en,
      },
    })
  }

  console.log('Seeding experience...')
  for (const exp of data.experience) {
    await prisma.experience.upsert({
      where: { slug: exp.id },
      update: {},
      create: {
        slug: exp.id,
        role: exp.role,
        company: exp.company,
        date: exp.date,
        desc_es: exp.description.es,
        desc_en: exp.description.en,
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
