'use client'
import React, { useState } from 'react'
import GenerateFormInput from './GenerateFormInput'
import { Button } from './ui/button'

type SuggestionText = {
  label: string
  text: string
}

const SuggestionBtnText : SuggestionText[] = [
  {
    label: 'Job Application',
    text: 'Develop a basic job appication form that serve as a one-page solution form collecting essential information from job applicants'
  },
  {
    label: 'Registration Form',
    text: 'Create a registration form suitable form any school or institution'
  },
  {
    label: 'Feedback Form',
    text: 'Create a client feedback form to gather valueable insight from any clients'
  },
]
const HeroSection = () => {
  const [text,setText] = useState<string>('')
  return (
    <section>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10'></div>
        <div className='container mx-auto text-center '>
          <h1 className='font-bold text-4xl'>Build AI-Driven Form Effortlessly</h1>
          <p className='mt-4 text-lg '>Leverage the power of AI to create responsive and dynamic forms in mintues</p>
        </div>
      </div>
      {/* create input field*/}
      <GenerateFormInput text={text}/>
      <div className='grid grid-cols-3 gap-4'>
      {
        SuggestionBtnText.map((item: SuggestionText,index:number)=>(
          <Button key={index} onClick={()=>setText(item.text)} className='rounded-full h-10' variant={'outline'}>{item.label}</Button>
        ))
      }
      </div>
    </section>
  )
}

export default HeroSection