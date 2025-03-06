"use client"

import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import React, { useState } from 'react';


const Prompt = () => {

  let projectId = "6998b09f-6c0c-4ae5-ae48-c6a8f475fec7";//store this project id in reduxTK
  const [prompt, setPrompt] = useState("");
  const { getToken } = useAuth();
  console.log(process.env.WORKER_API);
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const token = await getToken();
      const result = axios.post(`${process.env.NEXT_PUBLIC_WORKER_API}/prompt/create-prompt`, 
        {prompt, projectId }, { headers: { Authorization: `Bearer ${token}`}});
      const response = (await result).data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder='Ask AI to make it look beautiful'
          onChange={(e) => setPrompt(e.target.value)}
          />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Prompt
