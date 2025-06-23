import React, { useState, useEffect } from 'react';
import { signup, login, getMe } from './api';

type User = { id: number; name: string; email: string; };

export default function App() {
  const [view, setView] = useState<'login'|'signup'>('login');
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [password, setPass] = useState('');
  const [token, setToken]   = useState(localStorage.getItem('token')||'');
  const [user,  setUser]    = useState<User|null>(null);

  useEffect(() => {
    if (token) {
      getMe(token).then(r => setUser(r.data))
                 .catch(() => { setToken(''); localStorage.removeItem('token') });
    }
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = view === 'login'
        ? await login(email, password)
        : await signup(name, email, password);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Auth failed');
    }
  };

  if (!token) {
    return (
      <div style={{padding:20,fontFamily:'sans-serif'}}>
        <h1>{view==='login'?'Login':'Sign Up'}</h1>
        <form onSubmit={submit}>
          {view==='signup' && (
            <input placeholder="Name" value={name}
                   onChange={e=>setName(e.target.value)} required/>
          )}
          <input placeholder="Email" value={email}
                 onChange={e=>setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" value={password}
                 onChange={e=>setPass(e.target.value)} required/>
          <button type="submit">{view==='login'?'Login':'Sign Up'}</button>
        </form>
        <button onClick={()=>setView(v=>v==='login'?'signup':'login')}>
          {view==='login'?'Need an account?':'Have an account?'}
        </button>
      </div>
    );
  }

  if (!user) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20,fontFamily:'sans-serif'}}>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => { localStorage.removeItem('token'); setToken(''); }}>
        Logout
      </button>
    </div>
  );
}
