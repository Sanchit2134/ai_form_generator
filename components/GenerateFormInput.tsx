'use client'
import React, { ChangeEvent, ChangeEventHandler, useActionState, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useFormStatus } from 'react-dom'
import { Sparkles } from 'lucide-react'
import { generateForm } from '@/action/generateForm'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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
  const [description,setDescription] = useState<string | undefined>('')  //text mera optional hai isliye undefined bi add kiya hai 
  const [state, formAction] = useActionState(generateForm,initialState) //useActionState ka use kiya hai jo mujhe action ko call karne ki suvidha deta hai
  const router = useRouter()

  const changeEventHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setDescription(e.target.value)
  }
  
  useEffect(()=>{
    setDescription(text)
  },[text])

  useEffect(()=>{
    if(state.success){
      console.log("response -->",state.data)
      toast(state.message)
      router.push(`/dashboard/forms/edit/${state.data.id}`) //id ko use karke mujhe form ka page kholna hai
    } else if(state.message){
      toast.error(state.message)
    }
  },[router,state])

  return (
    <form action={formAction} className='flex items-center gap-4 my-8'>
        <Input 
        onChange={changeEventHandler} 
        id='description'
        name='description'
        value={description} 
        type='text' 
        placeholder='Write a prompt to generate form'
        required
        />
        
        <SubmitButton />
    </form>
  )
}
export default GenerateFormInput

const SubmitButton = ()=>{
  const {pending} = useFormStatus()
  return(
    <Button disabled={pending} className='h-12 bg-gradient-to-r from-blue-500 to-purple-600'>
      <Sparkles className='mr-2'/>
      {pending ? <span>Generating Form...</span> : 'Generate Form'}
    </Button>
  )
}
