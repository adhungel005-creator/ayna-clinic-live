export async function onRequestPost(context) {
  const apiKey = context.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key missing in environment' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let requestData;
  try {
    requestData = await context.request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { messages } = requestData;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Messages array is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.6
      })
    });

    const data = await groqResponse.json();

    return new Response(JSON.stringify(data), {
      status: groqResponse.status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
