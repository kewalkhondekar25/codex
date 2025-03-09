import CodeView from '@/components/CodeEditor'
import Stepper from '@/components/Stepper'
import React from 'react'

const page = () => {

  return (
    <div className='flex justify-center place-items-center gap-5 min-h-screen'>
      <Stepper/>
      <CodeView/>
    </div>
  )
}

export default page