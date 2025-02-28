'use client'
import React, { ChangeEvent, ChangeEventHandler, useActionState, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useFormStatus } from 'react-dom'
import { Sparkles } from 'lucide-react'
import { generateForm } from '@/action/generateForm'

type InitialState = {
  message: string,
  success: boolean
  data?:any
}
const initialState:InitialState = {
  message: '',
  success: false
}

const GenerateFormInput: React.FC<{text?:string}> = ({text}) => {
  const [description,setDescription] = useState<string | undefined>('')
  const [state, formAction] = useActionState(generateForm, initialState)

  const changeEventHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setDescription(e.target.value)
  }
  useEffect(()=>{
    setDescription(text)
  },[text])

  return (
    <form className='flex items-center gap-4 my-8'>
        <Input onChange={changeEventHandler} value={text} type='text' placeholder='Write a prompt to generate form'/>
        <SubmitButton />
    </form>
  )
}
export default GenerateFormInput

const SubmitButton = ()=>{
  const {pending} = useFormStatus()
  return(
    <Button className='h-12 bg-gradient-to-r from-blue-500 to-purple-600'>
      <Sparkles className='mr-2'/>
      {pending ? <span>Generating Form...</span> : 'Generate Form'}
    </Button>
  )
}
