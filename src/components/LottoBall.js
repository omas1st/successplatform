import React from 'react';
import './LottoBall.css';

export default function LottoBall({ value, color, onClick }) {
  const style = { backgroundColor: color || '#ccc' };
  return (
    <div className="lotto-ball" style={style} onClick={onClick}>
      {value}
    </div>
  );
}
