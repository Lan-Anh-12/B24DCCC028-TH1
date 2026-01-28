import { useEffect, useState } from 'react';

// Kiểu dữ liệu
type Todo = {
  id: number;
  text: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Load dữ liệu từ localStorage 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(data);
  }, []);

  // Lưu todos vào localStorage
  const saveTodos = (data: Todo[]) => {
    setTodos(data);
    localStorage.setItem('todos', JSON.stringify(data));
  };

  // Thêm, cập nhật todo
  const handleSubmit = () => {
    if (!text.trim()) return;

    if (editId !== null) {
      saveTodos(
        todos.map(t =>
          t.id === editId ? { ...t, text } : t
        )
      );
      setEditId(null);
    } else {
      saveTodos([...todos, { id: Date.now(), text }]);
    }

    setText('');
  };

  // Xóa todo
  const handleDelete = (id: number) => {
    saveTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
           Todo List
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Nhập công việc..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            {editId !== null ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map(t => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
            >
              <span className="break-words">{t.text}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setText(t.text);
                    setEditId(t.id);
                  }}
                  className="text-sm px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            Chưa có công việc nào
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
