import React from 'react';

const StudySession = () => {
    return (
        <div>
            <h2>Create Study Session</h2>
            <form>
                <div>
                    <label>Session Title:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" />
                </div>
                <div>
                    <label>Time:</label>
                    <input type="time" />
                </div>
                <div>
                    <label>Duration:</label>
                    <input type="text" placeholder="e.g. 1 hour" />
                </div>
                <button type="submit">Create Session</button>
            </form>  
        </div>
    );
};

export default StudySession;