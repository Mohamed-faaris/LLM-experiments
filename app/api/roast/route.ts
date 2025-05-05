import { ai, model } from "@/util/ai";
import { leetcodeAPI } from "@/util/axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) {
      return new Response("Username is required", { status: 400 });
    }

    //for testing purposes
    if (username === "test") {
      const res = `Alright, let's see what we can dig up on mohammedfaaris2005. Brace yourself, Faaris.

Okay, so "Mohamed Faaris" uses his email as a "website"? Bold move. Is that where you host your portfolio? I hope it has a slightly better UI than LeetCode's submission stats.

India! Fantastic country! Too bad your ranking is approaching half a million. Maybe instead of checking your gmail "website" you should work on it.

"K Ramakrishnan college of engneering"... that's a mouthful, isn't it? Hopefully, they teach better spelling than "engneering." Though, given your "aboutMe" is blank, I'm guessing communication skills aren't a strong suit. Did all your brainpower go into your LeetCode grind?

Speaking of which, 236 accepted solutions out of 789 submissions... ouch. That's a lot of wrong answers. And only 12 hard problems? Looks like someone gets intimidated easily. I guess not everything in life is as "Easy" as LeetCode makes it look. I'm sure all those "medium" problems would love to be easy!

Look it's still an improvement so good luck in the future!`;

      return new Response(res, { status: 200 });
    }

    const leetcodeStats: any = await leetcodeAPI.get(`/user/${username}`);
    console.log(leetcodeStats);
    if (leetcodeStats.status !== 200) {
      return new Response(`Error: ${leetcodeStats.detail}`, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: `{JSON.stringify(leetcodeStats.data) roast this profile\nvery personal\njust do that}`,
    });
    console.log(response);
    return new Response(
      JSON.stringify({
        username: username,
        name: leetcodeStats.data.profile.realName,
        roast: response.text,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ errorMessage: "Invalid request", error }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
