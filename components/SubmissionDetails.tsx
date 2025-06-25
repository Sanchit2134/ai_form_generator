import React from 'react'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
type props = {
    index: number;
    submisson: any;
}
const SubmissionDetails: React.FC<props> = ({submisson,index}) => {
  return (
    <div>
        <h1 className='font-bold text-2xl mb-4'>Response - {index+1}</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Questions</TableHead>
                    <TableHead>Answer</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>what's your age?</TableCell>
                    <TableCell>23</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default SubmissionDetails