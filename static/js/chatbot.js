async function startChat() {
  const input = prompt("Ask Nurse Betty about Diabetes:");
  if (!input) return;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_OPENAI_API_KEY"  // 👈 Add your actual key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Nurse Betty, a helpful virtual nurse who gives kind, clear advice specifically related to Type 1 Diabetes. You do not give general medical advice. Always encourage users to consult their doctor for medical treatment."
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.6
    })
  });

  const data = await response.json();
  const output = data.choices[0].message.content;
  alert(output);
}
