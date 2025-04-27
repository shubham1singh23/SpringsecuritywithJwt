import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddStudent.css';

function AddStudent() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [student, setStudent] = useState({
    rollno: '',
    name: '',
    cgpa: '',
    subjects: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert string values to appropriate types
      const formattedStudent = {
        rollno: parseInt(student.rollno),
        name: student.name.trim(),
        cgpa: parseFloat(student.cgpa), // Changed to parseFloat for decimal values
        subjects: student.subjects.split(',').map(s => s.trim()).filter(Boolean)
      };

      // Validate the data
      if (isNaN(formattedStudent.rollno) || formattedStudent.rollno <= 0) {
        setError('Please enter a valid roll number');
        return;
      }

      if (isNaN(formattedStudent.cgpa) || formattedStudent.cgpa < 0 || formattedStudent.cgpa > 10) {
        setError('CGPA must be between 0 and 10');
        return;
      }

      const response = await axios.post('http://localhost:8080/students', formattedStudent);
      if (response.data === 'success') {
        navigate('/');
      } else {
        setError('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setError(error.response?.data || 'Error adding student. Please try again.');
    }
  };

  return (
    <div className="add-student">
      <h2>Add New Student</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="number"
            name="rollno"
            className="form-control"
            value={student.rollno}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>CGPA:</label>
          <input
            type="number"
            name="cgpa"
            className="form-control"
            value={student.cgpa}
            onChange={handleChange}
            step="0.01"
            min="0"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Subjects (comma-separated):</label>
          <input
            type="text"
            name="subjects"
            className="form-control"
            value={student.subjects}
            onChange={handleChange}
            placeholder="Math, Physics, Chemistry"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;