import React from 'react';

const StudentProfile = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
            <p className="mb-2"><strong>Name:</strong> John Doe</p>
            <p className="mb-2"><strong>Email:</strong> john.doe@example.com</p>
            <p className="mb-2"><strong>Enrolled Courses:</strong></p>
            <ul className="list-disc list-inside">
                <li>Course 1</li>
                <li>Course 2</li>
                <li>Course 3</li>
            </ul>
        </div>
    );
};

export default StudentProfile;