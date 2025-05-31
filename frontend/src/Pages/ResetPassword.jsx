// /components/ResetPassword.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
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
      <h2>Reset Password</h2>
      <input type="password" placeholder="New password" onChange={e => setNewPassword(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
