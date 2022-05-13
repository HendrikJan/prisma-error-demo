import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  console.log('Creating a new staff member')

  // Create ten staffMembers
  const staffMembers = []
  for (let i = 0; i < 10; i++) {
    const staffMember = await prisma.staffMember.create({
      data: {
        firstName: `John ${i}`,
      }
    })
    staffMembers.push(staffMember)
  }

  console.log('Create a lot of vacancies')

  // Create 1001 vacancies
  for (let i = 0; i < 2001; i++) {
    console.log(`${i} / 2001`)
    const randomId = Math.floor(Math.random() * (staffMembers.length + 1))
    const randomStaffMember = staffMembers[randomId] || null
    const id = randomStaffMember?.id
    await prisma.vacancy.create({
      data: {
        title: `Vacancy ${i}`,
        staffMemberId: randomStaffMember?.id,
      },
    })
  }

  console.log('Database is ready')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })