import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
  log: ['warn', 'error' /* ,'query' */],
})

async function main() {
  console.log('Creating a new staff member')

  // Create ten staffMembers
  const staffMember = await prisma.staffMember.create({
    data: {
      firstName: `John`,
    }
  })

  console.log('Create a lot of vacancies')

  // Create 1001 vacancies
  for (let i = 0; i < 1000; i++) {
    console.log(`Add vacancy ${i} / 1000`)
    await prisma.vacancy.create({
      data: {
        title: `Vacancy ${i}`,
        staffMemberId: staffMember.id,
      },
    })
  }

  console.log('Database is ready')
  console.log('Fetching all vacancy ids')

  // Get all vacancy ids
  const vacancyIds = (await prisma.vacancy.findMany({
    take: 10000,
  })).map(vacancy => vacancy.id)

  console.log('Fetching all staffMembers')

  // Get the staffMembers of the vacancies in one go
  const promises = [] as Promise<any>[]
  for (let i = 0; i < vacancyIds.length; i++) {
    const id = vacancyIds[i]
    promises.push(prisma.vacancy.findUnique({
      where: { id }
    }).staffMember())
  }

  console.log('Waiting for all promises to resolve')

  // Get the staffMembers
  const results = await Promise.all(promises)

  // Print the results
  console.dir('Results:')
  console.dir(results, { depth: null })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })