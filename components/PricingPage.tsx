import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { PricingPlan, pricingPlan } from '@/lib/pricingPlan'
import { Badge } from './ui/badge'


const PricingPage = () => {
    return (
        <div>
            <div className='text-center mb-14'>
                <h1 className='font-extrabold text-3xl'>Plan and Pricing</h1>
                <p className='text-gray-500'>Receive unlimited credits when you pay early, and save your plan.</p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {pricingPlan.map((plan: PricingPlan, index: number) => (
                    <Card key={index} className={`${plan.level === "Enterprise" && "bg-[#1c1c1c] text-white"} w-[350px] flex flex-col`}>
                        <CardHeader className='flex flex-row items-center'>
                            <div className='flex items-center gap-3'> <CardTitle>{plan.level}</CardTitle>
                                {plan.level === 'Pro' && <Badge className='rounded-full bg-orange-500 hover:bg-null flex gap-3'>🔥Popular</Badge>}</div>
                        </CardHeader>
                        <CardContent className='flex-1'>
                            <p className='font-bold text-2xl'>{plan.price}</p>
                            <ul className='mt-4 space-y-2'>
                                {
                                    plan.services.map((items: string, index: number) => (
                                        <li key={index} className='flex items-center gap-2'>
                                            <span className='text-green-500 '>✓</span>
                                            <span>{items}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button key={index} variant="outline" className={`${plan.level === "Enterprise" && "bg-white text-black"} w-full`}>Get started with {plan.level}</Button>
                        </CardFooter>
                    </Card>

                ))}
            </div>
        </div>
    )
}

export default PricingPage