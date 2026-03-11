import React, { useState } from 'react'

function AIChatbot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        'You are a helpful assistant. Answer user questions in a friendly and concise way.',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSend() {
    setError('')

    const userMessage = input.trim()
    if (!userMessage) return

    const nextMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: nextMessages,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`OpenRouter error: ${response.status} ${text}`)
      }

      const data = await response.json()
      const assistantText =
        data?.choices?.[0]?.message?.content ||
        'Sorry, I could not get a response from the API.'

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantText }])
    } catch (err) {
      setError(err?.message || 'Unexpected error')
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  function clearChat() {
    setMessages([
      {
        role: 'system',
        content:
          'You are a helpful assistant. Answer user questions in a friendly and concise way.',
      },
    ])
    setError('')
  }

  return (
    <div className="ai-chatbot">
      <h1>AI Chatbot</h1>
      <p>
        This chat uses the OpenRouter API via a local proxy server. Set your API key in
        <code>server/.env</code> (or in your environment) and restart the server.
      </p>


      <div className="ai-chatbot-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message and press Enter to send..."
          rows={4}
        />
        <button onClick={handleSend} disabled={isLoading} className="button primary">
          {isLoading ? 'Sending…' : 'Send'}
        </button>
        <button onClick={clearChat} disabled={isLoading} className="button secondary">
          Clear chat
        </button>
      </div>

      {error ? <div className="ai-chatbot-error">{error}</div> : null}

      <div className="ai-chatbot-messages">
        {messages
          .filter((m) => m.role !== 'system')
          .map((message, idx) => (
            <div
              key={idx}
              className={`ai-chatbot-message ai-chatbot-message--${message.role}`}
            >
              <div className="ai-chatbot-message-role">
                {message.role === 'user' ? 'You' : 'Assistant'}
              </div>
              <pre className="ai-chatbot-message-content">{message.content}</pre>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AIChatbot
