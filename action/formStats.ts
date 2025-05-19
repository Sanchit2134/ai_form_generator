'use server'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'


const getformStats = async() => {
    const user = await currentUser()
    if(!user) {
        throw new Error('User not found')
    }
    const stats = await prisma.form.aggregate({
        where: {
            ownerID: user?.id
        },
        _sum: {
            submission: true,
        }
    })
    const submissions = stats._sum.submission || 0
  return submissions
}

export default getformStats