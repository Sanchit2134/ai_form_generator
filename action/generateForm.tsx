'use server'

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { z } from 'zod'   //input field --> description, data and prompt vaild hai ki nahi with the help of zod we can achieve. 
import OpenAI from "openai";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });  // ! --> not ka sign issliye lagaya hai ki humme pata hai ki yeh value hamesha milegi (means value always defined)

export const generateForm = async (prevState: unknown, formData: FormData) => {    //prevState --> prevState khalee object hai jisme success and message baij sakte hai
    try {
        const user = await currentUser()
        if (!user) {
            return { success: false, message: 'User not found' }
        }
        //define schema for form validation
        const schema = z.object({
            description: z.string().min(1, { message: 'Description is required' }),
        })
        const result = schema.safeParse({
            description: formData.get('description') as string 
        })
        if (!result.success) {
            return { success: false, message: result.error.message }
        }
        const description = result.data.description

        if (!process.env.OPENAI_API_KEY) {
            return { success: false, message: 'OPENAI API key is missing' }
        }

        const prompt = "Create a json form with the following fields: title, fields(If any field include options then keep it inside array not object), button"

        //Request openai to generate form content

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: `${description} ${prompt}` }],
            model: "gpt-4",
    
        });
        console.log(completion.choices[0]); 

        const formContent = completion.choices[0].message.content;
        if(!formContent){
            return { success: false, message: 'Failed to generate form' }
        }
        let formJsonData;
        try {
            formJsonData = JSON.parse(formContent)

        }
        catch(error){
            console.log('Error parsing Json', error)
            return { success: false, message: 'Generated form content is not valid JSON' }
        }

        //save the generated form to the database 
        const Form = await prisma.form.create({
            data:{
                ownerID: Number(user.id),
                content:formJsonData ? formJsonData : null
            }
        });
        revalidatePath('dashboard/forms') //optinally revalidation a path if necessary cahching 
        return { success: true, message: 'Form generated successfully', data: Form }

    } catch (error) {
        console.log('Error generating form', error)
        return { success: false, message: 'An error occurred while generating the form' }
    }
}