// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import LottoBall from '../components/LottoBall';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [premium, setPremium] = useState({ lunchtime: [], teatime: [] });
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    API.get('/users/me').then(res => {
      const u = res.data;
      setUser(u);
      setPremium({
        lunchtime: u.premium?.lunchtime || ["00","00","00","00"],
        teatime:   u.premium?.teatime   || ["00","00","00","00"],
      });
    });
  }, []);

  if (!user) return null;

  const handleContinue = () => {
    // Find the admin-approved URL for this user
    const approved = user.customUrls.find(u => u.status === 'approved');
    let link = approved?.url || 'https://bit.ly/uk49wins';

    // If the admin stored it without protocol, prepend https://
    if (!/^https?:\/\//i.test(link)) {
      link = `https://${link}`;
    }

    // Navigate to the external link
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

  // Only show the latest notification
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
          Kindly click the Continue button to activate your account to make the 3 straight winning numbers and Bonus appear on your dashboard immediately.
        </p>
        <button onClick={handleContinue}>Continue</button>
      </section>

      <section>
        <h2>Send a Message to Admin</h2>
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
