import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import "./index.css";

function StudentPage({setUser}) {
  const db = getFirestore();
  const auth = getAuth();
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", class: "", section: "", rollNumber: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchStudents();
  }, [db]);

  const handleAddStudent = async () => {
    await addDoc(collection(db, "students"), formData);
    setShowModal(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  
    return (
      <div className="dashboard">
         <nav className="sidebar">
        <button onClick={() => window.location.reload()}>Students Page</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="students-page">
        <h2>Students List</h2>
        <button className="add-student" onClick={() => setShowModal(true)}>Add Student</button>
        
        <table className="table">
          <thead className="table-header">
            <tr className="table-header-cell">
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-header">
            {students.map((student) => (
              <tr className="table-header-cell" key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <button className="edit">
                    <img className="edit" src="https://img.icons8.com/?size=100&id=49&format=png&color=000000" alt="edit" />
                  </button>
                  <button className="delete" onClick={async () => {
                    await deleteDoc(doc(db, "students", student.id));
                    setStudents(students.filter(s => s.id !== student.id));
                  }}>
                  <img className="delete" src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000" alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <h2>Add Student</h2>
            <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" placeholder="Class" onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
            <input type="text" placeholder="Section" onChange={(e) => setFormData({ ...formData, section: e.target.value })} />
            <input type="text" placeholder="Roll Number" onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} />
            <button onClick={handleAddStudent}>Submit</button>
          </div>
        )}
      </div>
      </div>

    );
}

export default StudentPage