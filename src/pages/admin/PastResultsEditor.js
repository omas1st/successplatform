import React, { useEffect, useState } from 'react';
import API from '../../api';
import './PastResultsEditor.css';

export default function PastResultsEditor() {
  const [lunchtime, setLunchtime] = useState(Array(7).fill('00'));
  const [teatime,   setTeatime]   = useState(Array(7).fill('00'));

  useEffect(() => {
    API.get('/admin/past-results').then(res => {
      const recs = res.data;
      const lt = recs.find(r=>r.type==='lunchtime');
      const tt = recs.find(r=>r.type==='teatime');
      if (lt) setLunchtime(lt.balls.slice(0,7));
      if (tt) setTeatime(tt.balls.slice(0,7));
    });
  }, []);

  const save = () => {
    const records = [
      { type:'lunchtime', balls: lunchtime },
      { type:'teatime',   balls: teatime   }
    ];
    API.put('/admin/past-results', { records })
      .then(()=> alert('Saved!'))
      .catch(e=>alert('Save failed'));
  };

  return (
    <div className="past-results-editor">
      <h3>Edit Past Results</h3>

      <section>
        <h4>Lunchtime (7 balls)</h4>
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
        <h4>Teatime (7 balls)</h4>
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
