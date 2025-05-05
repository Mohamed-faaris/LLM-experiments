"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const { data, isLoading, isError, isFetched, error, refetch } = useQuery({
    queryKey: ["roast", username],
    queryFn: async () =>
      await fetch(`/api/roast/leetcode?username=${username.trim()}`).then((res) =>
        res.json()
      ),
    enabled: false, 
  });

  const submit = async () => {
    if (username.trim()) {
      await refetch(); 
    }
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
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
        <button
          className="bg-blue-500 text-white rounded p-2 w-full max-w-xs"
          onClick={submit}
        >
          {isLoading ? "Loading..." : "Roast Me!"}
        </button>

        {isError && <p className="text-red-500">Error: {error?.message}</p>}

        {isFetched && data?.roast && (
          <div className="flex flex-col w-11/12">
            <ReactMarkdown>{data?.roast}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
