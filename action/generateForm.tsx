'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from 'next/cache';
// import { Prisma } from '@prisma/client';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function stripMarkdownCodeBlock(text: string): string {
  // Remove `````` or `````` wrappers and trim whitespace
  return text.replace(/``````/i, '$1')
             .replace(/``````/i, '$1')
             .trim();
}

export async function generateForm(prevState: unknown, formData: FormData) {
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

    const prompt = `Create a JSON form with the following fields:
- title
- fields (if any field includes options, keep it inside an array, not an object)
- button

IMPORTANT: Output ONLY the JSON. Do NOT use Markdown formatting or any commentary.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
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
    return { success: true, message: 'Form generated successfully', data: savedForm };

    // Optionally revalidate path if needed
    revalidatePath('/dashboard/forms/edit/[formId]');

  } catch (error) {
    console.error('Error generating form:', error);
    return { success: false, message: 'An error occurred while generating the form' };
  }
}
