'use server'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

const getForm = async () => {
    const user = await currentUser()
    if(!user) {
        return {success: false, message: 'User not found'}
    }
    const forms  = await prisma.form.findMany({
        where: {
           ownerID: user.id
        }
    })
    if(!forms){
        return {success: false, message: 'No forms found'}
    }
    return{
        success: true,
        message: 'Forms found',
        data: forms
    }
}

export default getForm