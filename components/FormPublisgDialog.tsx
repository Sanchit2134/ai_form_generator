import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import React from 'react'
import { DialogHeader } from './ui/dialog';
import { LinkIcon } from 'lucide-react';
import { Input } from './ui/input';

type props = {
    formId: number;
    open:  boolean;
    onOpenChange: (open: boolean) => void
    
}
const FormPublisgDialog: React.FC<props> = ({formId,open,onOpenChange}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return (
    <Dialog>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Your Form has been successfully published!</DialogTitle>
                <DialogDescription>
                    You can now share your form with the world and start collecting responses.
                </DialogDescription>
            </DialogHeader>
            <div>
                <p>Your form is now live and can be accessed at the following URL</p>
                <br />
                <div>
                    <LinkIcon/>
                    <Input
                    placeholder='link'
                    disabled
                    className='w-full outline-none bg-gray-100 daark: hover:bg-gray-800' 
                    />
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default FormPublisgDialog