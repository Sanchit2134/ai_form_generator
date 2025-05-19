'use client'

import React from 'react'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Link } from 'lucide-react'
import { Form } from '@/types/form'
import deleteForm from '@/action/deleteForm'
import { number } from 'zod'
import toast from 'react-hot-toast'

const deleteFormHandler = async(formId:number)=>{
  const data = await deleteForm(formId)
  if(data.success){
    toast.success(data.message)
  }
  else{
    toast.error(data.message)
  }
  
}

type Props = {
  form: Form
}

const FormList: React.FC<Props> = ({ form }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Job Application</CardTitle>
          <CardDescription>Deploy your project in one-click</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={`/dashboard/forms/${form.id}/submission`}><Button variant={'link'} className='text-blue-600'>Submission-{form.submission}</Button></Link>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant='outline'>
            <Edit2/> Edit
          </Button>
          <Button onClick={()=>deleteFormHandler(form.id)} variant={'destructive'}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FormList