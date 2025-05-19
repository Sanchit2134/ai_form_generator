import getformStats from '@/action/formStats'
import Analytics from '@/components/Analytics'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async() => {
  const data = getformStats()
  console.log("data--->", data)

  return (
    <div><Analytics/></div>
  )
}

export default page