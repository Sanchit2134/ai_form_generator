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

type props = { form: Form, isEditMode: boolean }

const AiGeneratedForm: React.FC<props> = ({ form, isEditMode }) => {
  const [successDialog, setSuccessDialog] = React.useState<boolean>(false)

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode) {
      await publishForm(form.id)
      setSuccessDialog(true)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }
  const value = JSON.parse(form.content as any)
  let data
  if(typeof value === 'object' && form !== null && !Array.isArray(value)){
    data = value.formFields
  }
  else{
    data = value[0].formFields
  }

  console.log('data --->', value)
  return (
    <div>
      <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
        {value.fields.map((item: Fields, index: number) => (
          <div key={index} className="mb-4">
            <Label>{item.label}</Label>
            <Input
              type='text'
              name={item.name}
              placeholder={item.placeholder}
              required={!isEditMode && true}
            />
            <Button type='submit'>{isEditMode ? 'Publish' : 'Submit'}</Button>
          </div>
        ))}
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