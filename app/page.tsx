"use client";
import { useQuery } from "@tanstack/react-query";
// import { API } from "@/util/axios";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [username, setUsername] = useState("");
  async function submit() {
    const trimmedUsername = username.trim() 
    const { status, data, error, isFetching } = useQuery({
      queryKey: ["roast", trimmedUsername],
      queryFn: async () => {
        fetch(`/api/roast?username=${trimmedUsername}`);
      },
    });
   
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="text-2xl font-bold text-center">
        Roast My LeetCode Profile
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-center">
          Enter your LeetCode username and get roasted!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          type="text"
          placeholder="LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
        />
        <button className="bg-blue-500 text-white rounded p-2 w-full max-w-xs" 
        onClick={submit}>
          Roast Me!
        </button>
      </div>
    </div>
  );
}

