'use client'
import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Button } from './ui/button'
import publishForm from '@/action/publishForm'
import FormPublisgDialog from './FormPublisgDialog'
import { Fields, Form } from '@/types/form'
import submitForm from '@/action/SubmitForm'
import toast from 'react-hot-toast'

type props = { form: any, isEditMode: boolean }

const AiGeneratedForm: React.FC<props> = ({ form, isEditMode }) => {
  const [successDialog, setSuccessDialog] = React.useState<boolean>(false)
  const [formData, setFormData] = React.useState<any>({})

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode) {
      await publishForm(form.id)
      setSuccessDialog(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = await submitForm(form.id, formData)
    if(data?.success){
      toast.success(data.message)
      setFormData({})
    }
    else{
      toast.error(data?.message || 'Error submitting form')
    }
  }

  // Use content as object if already parsed, otherwise parse string
  const value = typeof form.content === 'string' ? JSON.parse(form.content) : form.content;
  let fields: any[] = [];
  if (value && Array.isArray(value.formFields)) {
    fields = value.formFields;
  } else if (value && Array.isArray(value.fields)) {
    fields = value.fields;
  }

  console.log('fields --->', fields)
  return (
    <div>
      <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
        {Array.isArray(fields) && fields.length > 0 ? fields.map((item: Fields, index: number) => (
          <div key={index} className="mb-4">
            <Label>{item.label}</Label>
            <Input
              type='text'
              name={item.name}
              placeholder={item.placeholder}
              required={!isEditMode && true}
              onChange={handleChange}
            />
            <Button type='submit'>{isEditMode ? 'Publish' : 'Submit'}</Button>
          </div>
        )) : <div>No fields to display.</div>}
      </form>
      <FormPublisgDialog
        formId={form.id}
        open={successDialog}
        onOpenChange={setSuccessDialog}
      />
    </div>

  )

}


export default AiGeneratedForm