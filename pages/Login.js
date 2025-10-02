// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate
//   const handleLogin = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('user', JSON.stringify(data.user))
//         navigate('/chat');



  
   

//         // Redirect or store user info
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Add parentheses here

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/chat'); // ✅ This will now work
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;