import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = parseInt(process.env.PORT || '5000', 10)
const OPENROUTER_API_URL = 'https://openrouter.ai/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json({ limit: '1mb' }))

app.post('/api/chat', async (req, res) => {
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'OpenRouter API key is not set on the server.' })
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    })

    const body = await response.json()
    res.status(response.status).json(body)
  } catch (error) {
    console.error('OpenRouter proxy error:', error)
    res.status(500).json({ error: 'Failed to proxy request to OpenRouter.' })
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
