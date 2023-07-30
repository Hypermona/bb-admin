import React from 'react'
import { Card, CardHeader } from './ui/card'
import { FILE } from '@/lib/constants';

type Props = {
  appendFormFields:(field:keyof EditorFields)=>void
};

const ToolBox = ({appendFormFields}: Props) => {
  return (
    <div className='flex gap-2 flex-wrap'>
      <Card>
        <CardHeader>Title</CardHeader>
      </Card>
      <Card >
        <CardHeader>Description</CardHeader>
      </Card>
      <Card onClick={()=>appendFormFields("image")}>
        <CardHeader>Image</CardHeader>
      </Card>
      <Card>
        <CardHeader>Product</CardHeader>
      </Card>
    </div>
  );
}

export default ToolBox