import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import './Timeline.css';  

function TimelineComponent() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const children = useSelector(state => state.child);
    const timelineContainerRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'FETCH_CHILDREN' });
    }, [dispatch]);

    const childData = children.find(child => child.id === Number(id));

    useEffect(() => {
        let timeline = null;  // Define a variable to hold the timeline instance

        if (childData && timelineContainerRef.current) {
            const container = timelineContainerRef.current;
    
            if (!childData.birthday) {
                console.error('Birthday data is missing');
                return;
            }
    
            const birthday = new Date(childData.birthday);
    
            const items = Array.from({ length: 19 }, (_, i) => ({
                id: i,
                content: i === 0 ? 'Birth' : `${i} year${i > 1 ? 's' : ''}`,
                start: new Date(birthday.getFullYear() + i, birthday.getMonth(), birthday.getDate())
            }));
    
            const itemsDataSet = new DataSet(items);
    
            const options = {
                width: '100%',
                height: '200px',
                min: new Date(birthday.getFullYear() -1, birthday.getMonth(), birthday.getDate()),
                max: new Date(birthday.getFullYear() + 19, birthday.getMonth(), birthday.getDate()),
                start: new Date(birthday.getFullYear() - 1, birthday.getMonth(), birthday.getDate()),  // 1 year before the first event
                end: new Date(birthday.getFullYear() + 19, birthday.getMonth(), birthday.getDate()),  // 1 year after the last event
                orientation: 'bottom'
            };
    
            // Instantiate the timeline
            timeline = new Timeline(container, itemsDataSet, options);
        }

        return () => {
            if (timeline) {
                timeline.destroy();  // Destroy the timeline instance on component unmount
            }
        };
    }, [childData]);

    return (
        <div className="container">
            <h1>Timeline</h1>
            {childData ? (
                <div ref={timelineContainerRef} className="timeline-container"></div>
            ) : (
                <div>Loading or no child data found for id: {id}</div>
            )}
        </div>
    );
}

export default TimelineComponent;
