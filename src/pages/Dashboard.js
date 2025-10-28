import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import LottoBall from '../components/LottoBall';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [premium, setPremium] = useState({ lunchtime: [], teatime: [] });
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    API.get('/users/me')
      .then(res => {
        const u = res.data;
        setUser(u);
        setPremium({
          lunchtime: u.premium?.lunchtime || ["00","00","00","00"],
          teatime:   u.premium?.teatime   || ["00","00","00","00"],
        });
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('tokenChanged'));
        nav('/login');
      });
  }, [nav]);

  if (!user) return null;

  const handleContinue = () => {
    const approved = user.customUrls.find(u => u.status === 'approved');
    let link = approved?.url || 'https://successplatformsubscription.vercel.app/';
    if (!/^https?:\/\//i.test(link)) {
      link = `https://${link}`;
    }
    window.location.assign(link);
  };

  const sendMessage = async () => {
    if (!message.trim()) return alert('Please enter a message');
    setSending(true);
    try {
      await API.post('/users/message', { message });
      alert('Message sent successfully!');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const latestNotification =
    user.notifications?.length
      ? user.notifications[user.notifications.length - 1].body
      : 'No notifications';

  return (
    <div className="dashboard">
      <h1>Success Winning Platform</h1>
      <p>Welcome, {user.fullName}!</p>

      <section>
        <h2>Lunchtime 3 straight numbers and Bonus</h2>
        <div className="balls-row">
          {premium.lunchtime.map((v, i) => (
            <LottoBall key={i} value={v} color={i < 3 ? '#88f' : '#f88'} />
          ))}
        </div>
      </section>

      <section>
        <h2>Teatime 3 straight numbers and Bonus</h2>
        <div className="balls-row">
          {premium.teatime.map((v, i) => (
            <LottoBall key={i} value={v} color={i < 3 ? '#88f' : '#f88'} />
          ))}
        </div>
      </section>

      <section className="cta">
        <p>
          Kindly click the Activate button to activate your account to make the 3 straight winning numbers and Bonus appear on your dashboard immediately.
        </p>
        <button onClick={handleContinue}>Activate</button>
      </section>

      <section>
        <h2>Send a Message to Management</h2>
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
        />
        <button onClick={sendMessage} disabled={sending}>
          {sending ? 'Sending…' : 'Send Message'}
        </button>
      </section>

      <section>
        <h2>Latest Notification</h2>
        <div className="notification">{latestNotification}</div>
      </section>
    </div>
  );
}
