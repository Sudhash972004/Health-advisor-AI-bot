import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const navigate = useNavigate();
   
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/login')
    }
  }, [navigate]);
  const sendMessage = async () => {
    if (!message.trim()) return;

    setChatLog([...chatLog, { sender: 'user', text: message }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat/ask', { message });
      setChatLog([...chatLog, { sender: 'user', text: message }, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setChatLog([...chatLog, { sender: 'bot', text: 'Error: Unable to get response' }]);
    }

    setMessage('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Health Advisor Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {chatLog.map((msg, index) => (
          <p key={index}><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your health..."
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;