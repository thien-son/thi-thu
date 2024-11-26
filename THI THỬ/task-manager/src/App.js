import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addTask = () => {
    if (taskName.trim()) {
      const newTask = { id: Date.now(), name: taskName, completed: false };
      setTasks([...tasks, newTask]);
      setTaskName('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const startEditing = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskName(task.name);
    setEditingId(id);
  };

  const saveEdit = () => {
    setTasks(tasks.map((task) => task.id === editingId ? { ...task, name: taskName } : task));
    setTaskName('');
    setEditingId(null);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Quản Lý Công Việc</h1>
          <nav>
            <Link to="/">Trang chính</Link>
            <Link to="/about">Về Chúng Tôi</Link>
            <Link to="/contact">Liên Hệ</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <main>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Thêm công việc mới"
              />
              {editingId ? (
                <button onClick={saveEdit}>Lưu</button>
              ) : (
                <button onClick={addTask}>Thêm</button>
              )}
              
              <ul>
                {tasks.map((task) => (
                  <li key={task.id}>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.name}
                    </span>
                    <button onClick={() => toggleComplete(task.id)}>
                      {task.completed ? 'Chưa xong' : 'Hoàn thành'}
                    </button>
                    <button onClick={() => startEditing(task.id)}>Sửa</button>
                    <button onClick={() => deleteTask(task.id)}>Xóa</button>
                  </li>
                ))}
              </ul>
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer>
          <p>Trang thông tin &copy; 2024.</p>
        </footer>
      </div>
    </Router>
  );
}

function About() {
  return <h2>Về Chúng Tôi</h2>;
}

function Contact() {
  return <h2>Liên Hệ</h2>;
}

export default App;
