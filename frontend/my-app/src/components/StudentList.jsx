import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/students');
      setStudents(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:8080/students/${id}`);
        setStudents(students.filter(student => student.rollno !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student. Please try again.');
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({
      ...student,
      subjects: Array.isArray(student.subjects) ? student.subjects.join(', ') : ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formattedStudent = {
        ...editingStudent,
        subjects: editingStudent.subjects.split(',').map(s => s.trim()).filter(Boolean),
        cgpa: parseInt(editingStudent.cgpa)
      };

      await axios.put(`http://localhost:8080/students`, formattedStudent);
      setStudents(students.map(s =>
        s.rollno === editingStudent.rollno ? formattedStudent : s
      ));
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (student?.name?.toLowerCase() || '').includes(searchLower) ||
      String(student?.rollno || '').toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="student-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      {editingStudent ? (
        <div className="edit-form card">
          <h3>Edit Student</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editingStudent.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>CGPA:</label>
              <input
                type="number"
                name="cgpa"
                value={editingStudent.cgpa}
                onChange={handleChange}
                className="form-control"
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
                value={editingStudent.subjects}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Save</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setEditingStudent(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="students-grid">
          {filteredStudents.length === 0 ? (
            <div>No students found</div>
          ) : (
            filteredStudents.map(student => (
              <div key={student.rollno} className="student-card card">
                <h3>{student.name}</h3>
                <p><strong>Roll No:</strong> {student.rollno}</p>
                <p><strong>CGPA:</strong> {student.cgpa}</p>
                <p><strong>Subjects:</strong></p>
                <ul>
                  {Array.isArray(student.subjects) ? (
                    student.subjects.map((subject, index) => (
                      <li key={index}>{subject}</li>
                    ))
                  ) : (
                    <li>No subjects listed</li>
                  )}
                </ul>
                <div className="button-group">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.rollno)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default StudentList;