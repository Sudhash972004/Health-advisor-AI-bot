// const express = require('express');
// const router = express.Router();

// router.post('/ask', (req, res) => {
//   const { message } = req.body;

//   let reply = 'I’m here to help. Can you describe your symptoms in more detail?';

//   if (message.toLowerCase().includes('fever')) {
//     reply = 'You might have a viral infection. Drink plenty of fluids and rest.';
//   } else if (message.toLowerCase().includes('headache')) {
//     reply = 'Headaches can be caused by stress, dehydration, or lack of sleep.';
//   } else if (message.toLowerCase().includes('body checkup')) {
//     reply = 'For a full body checkup, consider visiting a diagnostic center.';
//   }

//   res.json({ reply });
// });

// module.exports = router;

// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// router.post('/ask', async (req, res) => {
//   const { message } = req.body;

//   try {
//     // Replace with your actual Infermedica credentials
//     const response = await axios.post('https://api.infermedica.com/v3/parse', {
//       text: message
//     }, {
//       headers: {
//         'App-Id': process.env.INFERMEDICA_APP_ID,
//         'App-Key': process.env.INFERMEDICA_APP_KEY,
//         'Content-Type': 'application/json'
//       }
//     });

//     const mentions = response.data.mentions;
//     const reply = mentions.length > 0
//       ? `I detected these symptoms: ${mentions.map(m => m.name).join(', ')}`
//       : 'I couldn’t detect any symptoms. Can you describe more clearly?';

//     res.json({ reply });
//   } catch (err) {
//     console.error('Infermedica error:', err.message);
//     res.json({ reply: 'Sorry, I couldn’t process that. Try rephrasing your question.' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// router.post('/ask', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful health advisor. You give general wellness advice, but do not diagnose medical conditions.' },
//         { role: 'user', content: message }
//       ]
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const reply = response.data.choices[0].message.content;
//     res.json({ reply });
//   } catch (err) {
//     console.error('OpenAI error:', err.message);
//     res.json({ reply: 'Sorry, I couldn’t process that. Try again later.' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// router.post('/ask', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct',
//       {
//         inputs: `You are a knowledgeable and empathetic health advisor. Respond to the user's question with specific, helpful advice. Avoid repeating the same response. Be clear and concise.\nUser: ${message}\nAssistant:`
//       },
//       {
//         headers: {
//           Authorization: `Bearer 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`
//         }
//       }
//     );

//     const reply = response.data?.[0]?.generated_text || "Sorry, I couldn't generate a response.";
//     res.json({ reply });
//   } catch (err) {
//     console.error('Hugging Face error:', err.message);
//     res.json({ reply: 'Something went wrong. Please try again later.' });
//   }
// });

// module.exports = router;



// const axios = require('axios');

// axios.post(
//   'https://api-inference.huggingface.co/models/google/flan-t5-base',
//   {
//     inputs: "What should I do if I have food poisoning?"
//   },
//   {
//     headers: {
//       Authorization: `Bearer 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`
//     }
//   }
// ).then(res => {
//   console.log("Response:", JSON.stringify(res.data, null, 2));
// }).catch(err => {
//   console.error("Error:", err.response?.data || err.message);
// });

// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.post('/ask', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/google/flan-t5-base',
//       {
//         inputs: `You are a helpful health advisor. ${message}`
//       },
//       {
//         headers: {
//           Authorization: `Bearer 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`
//         }
//       }
//     );

//     const reply = response.data?.generated_text || response.data?.[0]?.generated_text || "Sorry, I couldn't generate a response.";
//     res.json({ reply });
//   } catch (err) {
//     console.error("Hugging Face error:", err.response?.data || err.message);
//     res.status(500).json({ reply: 'Something went wrong. Please try again later.' });
//   }
// });

// module.exports = router;


const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct',
      {
        inputs: `User: ${message}\nAssistant:`
        // inputs: `You are a knowledgeable and empathetic health advisor. Respond to the user's question with specific, helpful advice. Avoid repeating the same response. Be clear and concise.\nUser: ${message}\nAssistant:`
      },
      {
        headers: {
          Authorization: `Bearer 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`
        }
      }
    );

    const reply = response.data?.[0]?.generated_text || "Sorry, I couldn't generate a response.";
    res.json({ reply });
  } catch (err) {
    console.error('Hugging Face error:', err.message);
    res.json({ reply: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;