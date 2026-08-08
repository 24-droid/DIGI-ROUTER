require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testKey() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
  const modelsToTry = [
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash-8b',
    'gemini-2.0-flash-exp'
  ];

  for (const m of modelsToTry) {
    try {
      console.log(`Trying model '${m}'...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello, respond with OK");
      console.log(`>>> SUCCESS with '${m}':`, result.response.text().trim());
      return;
    } catch (err) {
      console.error(`FAILED with '${m}':`, err.message.substring(0, 150));
    }
  }
}

testKey();
