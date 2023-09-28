// TimelineForm.jsx
import React, { useState } from 'react';
import axios from 'axios';  

function TimelineForm() {
    console.log('TimelineForm rendering');
    const [eventSum, setEventSum] = useState('');
    const [dateOf, setDateOf] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/timeline', { eventSum, dateOf, summary });
            console.log('Data has been sent to the server', response);
        } catch (error) {
            console.error('Error sending data', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="timeline-form">

          <input
            type="text"
            value={eventSum}
            onChange={(e) => setEventSum(e.target.value)}
            placeholder="Event Summary"
            className="timeline-input"
          />
          <input
            type="date"
            value={dateOf}
            onChange={(e) => setDateOf(e.target.value)}
            className="timeline-input"
          />
                    <div className="timeline-textarea-container">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary"
              className="timeline-textarea"
            />
          </div>
          <div>
          <button type="submit" className="timeline-button">Submit</button>
          </div>
          
        </form>
      );
    }
    
    export default TimelineForm;
