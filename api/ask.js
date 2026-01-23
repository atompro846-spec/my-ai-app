export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: req.body.text }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No reply from Gemini"
    });
  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
}


