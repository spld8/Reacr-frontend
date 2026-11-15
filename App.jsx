
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Pravishya", age: 20 },
    { id: 2, name: "Rahul", age: 21 }
  ]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE and UPDATE
  function handleSubmit() {
    if (!name || !age) {
      alert("Enter all details");
      return;
    }

    if (editId) {
      setStudents(students.map((s) =>
        s.id === editId
          ? { ...s, name, age: Number(age) }
          : s
      ));
      setEditId(null);
    } else {
      setStudents([
        ...students,
        {
          id: Date.now(),
          name,
          age: Number(age)
        }
      ]);
    }

    setName("");
    setAge("");
  }

  // EDIT
  function handleEdit(student) {
    setName(student.name);
    setAge(student.age);
    setEditId(student.id);
  }

  // DELETE
  function handleDelete(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div className="container">
      <h1>Student CRUD App</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add Student"}
      </button>

      <h2>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>
                <button onClick={() => handleEdit(s)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
