// Initialize the OPENAI model with API key and model name

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4o mini",
})