"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const page = () => {

  const [prompt, setPrompt] = useState("");
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const token = await getToken();
      const result = await axios.post("http://localhost:8080/api/v1/project/create-project", {
        prompt
      }, { headers: { "Authorization": `Bearer ${token}`}});
      const response = await result.data;
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
          placeholder='Ask AI to create a react app' 
          onChange={(e) => setPrompt(e.target.value)}
          />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default page