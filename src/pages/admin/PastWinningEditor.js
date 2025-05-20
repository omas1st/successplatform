import React, { useEffect, useState } from 'react';
import API from '../../api';
import './PastWinningEditor.css';

export default function PastWinningEditor() {
  const [lunchtime, setLunchtime] = useState(Array(4).fill('00'));
  const [teatime,   setTeatime]   = useState(Array(4).fill('00'));

  useEffect(() => {
    // Fetch today's records and initialize
    API.get('/admin/past-winning').then(res => {
      const recs = res.data;
      const lt = recs.find(r => r.type==='lunchtime');
      const tt = recs.find(r => r.type==='teatime');
      if (lt) setLunchtime(lt.balls.slice(0,4));
      if (tt) setTeatime(tt.balls.slice(0,4));
    });
  }, []);

  const save = () => {
    // Construct two records: assume backend matches by type and date
    const records = [
      { type:'lunchtime', balls: lunchtime },
      { type:'teatime',   balls: teatime   }
    ];
    API.put('/admin/past-winning', { records })
      .then(()=> alert('Saved!'))
      .catch(e=>alert('Save failed'));
  };

  return (
    <div className="past-winning-editor">
      <h3>Edit Past Winning Numbers</h3>

      <section>
        <h4>Lunchtime (4 balls)</h4>
        <div className="balls-row">
          {lunchtime.map((v,i)=>(
            <input
              key={i}
              type="text"
              maxLength={2}
              value={v}
              onChange={e=>{
                const a=[...lunchtime]; a[i]=e.target.value; setLunchtime(a);
              }}
            />
          ))}
        </div>
      </section>

      <section>
        <h4>Teatime (4 balls)</h4>
        <div className="balls-row">
          {teatime.map((v,i)=>(
            <input
              key={i}
              type="text"
              maxLength={2}
              value={v}
              onChange={e=>{
                const a=[...teatime]; a[i]=e.target.value; setTeatime(a);
              }}
            />
          ))}
        </div>
      </section>

      <button onClick={save}>Save All</button>
    </div>
  );
}
