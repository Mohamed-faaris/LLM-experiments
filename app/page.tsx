import Link from "next/link";
export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-center">
      StudentGuide
      </h1>
      <Link href="/leetcode">
        <button className="bg-blue-600 text-white p-1.5 px-3 rounded-xl mt-2">LeetCode Roast</button>
      </Link>
    </div>
  );
}
