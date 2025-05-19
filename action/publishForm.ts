'use server'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

type props = {
  formId: number
}
export const publishForm = async (formId: number) => {
  try {
    const user = await currentUser()
    if (!user) {
      return { success: false, message: 'User not found' }
    }
    if (!formId) {
      return { success: false, message: 'Form not found' }
    }
    const form = await prisma.form.findUnique({
      where: {
        id: formId
      }
    })
    if (!form) {
      return { success: false, message: 'Form not found' }
    }
    if (form.ownerID !== user.id) {
      return { success: false, message: 'You are not the owner of this form' }
    }
    await prisma.form.update({
      where: {
        id: formId
      },
      data: {
        published: true
      }
    })
  }
  catch (error) {
    return { success: false, message: 'Error publishing form' }
  }
}

export default publishForm