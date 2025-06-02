import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/user/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message);
        setError('');
      } else {
        setError(data.message);
        setMsg('');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Send Reset Email</button>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
