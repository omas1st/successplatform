import React from 'react';
import './LottoBall.css';

export default function LottoBall({ value, color, onClick }) {
  const style = { backgroundColor: color || '#f0f0f0' };
  return (
    <div className="lotto-ball" style={style} onClick={onClick}>
      <span>{value}</span>
    </div>
  );
}
