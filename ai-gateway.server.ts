export async function callGroq(prompt: string): Promise<string> {
  const apiKey = process.env.VITE_GROQ_API_KEY;

  console.log("GROQ KEY FOUND:", !!apiKey);

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("Groq Response:", JSON.stringify(data, null, 2));

  return (
    data.choices?.[0]?.message?.content ||
    "No response from Groq"
  );
}