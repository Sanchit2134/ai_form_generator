'use server';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from 'next/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function stripMarkdownCodeBlock(text: string): string {
  return text
    .replace(/```(?:json)?/gi, '')
    .trim();
}

export async function generateForm(prevState: unknown, formData: FormData) {     //prevState --> waha se empty object baijainge taki iske andar hum kuch message dal sake 
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const schema = z.object({
      description: z.string().min(1, { message: 'Description is required' }),
    });

    const result = schema.safeParse({
      description: formData.get('description') as string,
    });

    if (!result.success) {
      return { success: false, message: result.error.message };
    }

    const description = result.data.description;

    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
{
  "formFields": [        // An array of fields in the form
    {
      "label": "string", // The label to display for the field
      "name": "string",  // The unique identifier for the field (used for form submissions)
      "placeholder": "string" // The placeholder text for the field
    }
  ],
   "formTitle": "string", // The title of the form
   
Requirements:
- Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
- Always include at least 3 fields in the "formFields" array.
- Keep the field names consistent across every generation for reliable rendering.
- Provide meaningful placeholder text for each field based on its label.
        `;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const completion = await model.generateContent(prompt);
    const response = await completion.response;
    const formContent = response.text();
    console.log('Raw Gemini response:', formContent);

    if (!formContent) {
      return { success: false, message: 'No form content generated' };
    }

    // Strip Markdown code block if present
    const cleanedContent = stripMarkdownCodeBlock(formContent);

    // Parse the cleaned JSON string
    let formJsonData;
    try {
      formJsonData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, '\nCleaned content:', cleanedContent);
      return { success: false, message: 'Invalid JSON format generated' };
    }

    const savedForm = await prisma.form.create({
      data: {
        ownerID: user.id,
        content: formJsonData,
      }
    });

    console.log('Form saved:', savedForm);
    revalidatePath('/dashboard/forms/edit/[formId]');  // Optionally revalidate path if needed
    return { success: true, message: 'Form generated successfully', data: savedForm };

  } catch (error) {
    console.error('Error generating form:', error);
    return { success: false, message: 'An error occurred while generating the form' };
  }
}
