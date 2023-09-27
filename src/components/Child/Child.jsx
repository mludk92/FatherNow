import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useInterval from './useInterval';  // Assume useInterval is in the same directory
import './Child.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


function Child() {
    const dispatch = useDispatch();
    const children = useSelector(state => state.child);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_CHILDREN' });
    }, [dispatch]);

    const [now, setNow] = useState(moment.utc());

    useInterval(() => {
      setNow(moment.utc());
    }, 1000);  // Refreshes the now state every second
  
    const calculateAge = (birthday, hour, min) => {
        // Default to 0 if hour or min is null
        hour = hour != null ? hour : 0;
        min = min != null ? min : 0;

        const birthMoment = moment.utc(birthday).add(hour, 'hours').add(min, 'minutes');
        const duration = moment.duration(now.diff(birthMoment));
        
        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const seconds = duration.seconds();

        return `${years} years, ${months} months, ${days} days, ${hours} hours, ${seconds} seconds`;
    }

    return (
      <div className="container">
          <h1>Your Children</h1>
          {Array.isArray(children) && children.map((child, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">{child.first} {child.middle} {child.last}</h5>
                <p className="card-text">
                  Birthday: {moment.utc(child.birthday).format('MM/DD/YYYY')} <br />
                  Age: {calculateAge(child.birthday, child.hour, child.min)} <br />
                  Gender: {child.gender}
                </p>
                <Link to={`/timeline/${child.id}`} className="btn btn-primary">View Timeline</Link>  {/* Add this line */}
              </div>
            </div>
          ))}
      </div>
    );
}

export default Child;
