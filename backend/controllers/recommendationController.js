const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getRecommendations = async (req, res) => {
  const { preferences, location } = req.body;
  try {
    const prompt = `Provide travel recommendations for ${location} based on preferences: ${preferences}`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    });
    res.status(200).json({ recommendations: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};

module.exports = { getRecommendations };
