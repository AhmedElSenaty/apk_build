import { useEffect, useState } from 'react';
import axios from 'axios';

const api = 'http://192.168.1.7:3000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(api).then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post(api, { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const toggleTodo = async (id, done) => {
    await axios.put(`${api}/${id}`, { done: !done });
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !done } : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${api}/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id, todo.done)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
