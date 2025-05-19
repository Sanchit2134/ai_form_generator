"use server"

import React from 'react'
import getForm from '@/action/getForm'
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import FormList from '@/components/FormList'
import { Form } from '@/types/form'
// import { AiGeneratedForm } from '@/components/AiGeneratedForm'

const MyForm = async () => {
  const forms = await getForm()
  console.log(forms)
  return (
    <div>
      <section className='flex items-center justify-between max-w-7xl mx-auto mb-4'>
        <h1 className='font-bold text-xl'>My Forms</h1>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {" "}
          <Plus/> Create New Form
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Write a prompt</DialogTitle>
          <DialogDescription>
            Write a clean prompt to get better result
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
      </section>
      <div className='grid grid-cols-3 gap-2'>
        {
        forms.data?.map((form:any, index:number)=><FormList key={index} form={form}/>)
      }
      </div>
    </div>
  )
}

export default MyForm                                 