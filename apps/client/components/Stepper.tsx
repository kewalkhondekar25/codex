"use client"

import { uiPrompt } from '@/utils/dump'
import { parseXml } from '@/utils/parse'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from './Spinner'
import { CircleCheckBig } from 'lucide-react'

const Stepper = () => {

  const parsedItems = parseXml(uiPrompt[0]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    parsedItems.forEach((_, i) => {
      setTimeout(() => {
        setCount(prev => prev + 1);
      }, i * 1000)
    });

    parsedItems.forEach((_, i) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 15000);
    });
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Todoist</CardTitle>
          <CardDescription>Initializing project</CardDescription>
        </CardHeader>
        <CardContent>
          <ol>
            {
              parseXml(uiPrompt[0]).map((item, i) => {//1
                return (
                  <div key={item.id}>
                    { i < count && 
                      <div className='flex justify-start items-center gap-3 mt-1 text-xl'>
                        {isLoading ? <Spinner/> : <CircleCheckBig className='text-green-500'/>}
                        <li>{item.title}</li>
                      </div>
                    }
                  </div>
                )
              })
            }
          </ol>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Stepper