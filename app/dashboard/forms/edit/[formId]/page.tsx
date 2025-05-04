import React from 'react'
import prisma from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AiGeneratedForm from '@/components/AiGeneratedForm';
import { any } from 'zod';

const Edit = async ({params}:{params:Promise<{formId:string}>}) => {
  const formId = (await params).formId;
  console.log('Form ID:', formId)
  if(!formId) {
    return <h1>No form id found for id {formId}</h1>
  }
  const form = await prisma.form.findUnique({
    where: {
      id: Number(formId)
    }
  })
  console.log('Form->',typeof form)
  const formContent = typeof form?.content === 'string' ? JSON.parse(form.content) : form?.content;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {formContent?.title ? formContent.title : 'No title found'}
        </CardTitle>
        <CardContent>
          <AiGeneratedForm form={form} isEditMode={true}/>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default Edit