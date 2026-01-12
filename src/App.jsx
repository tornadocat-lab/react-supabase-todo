import React, { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // 初始化時抓取資料
  useEffect(() => {
    fetchTodos();
  }, []);

  // 1. 查詢所有 Todo
  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data);
    }
  }

  // 2. 新增 Todo
  async function addTodo() {
    if (!title.trim()) return;
    const { error } = await supabase.from("todos").insert([{ title }]);
    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTitle(""); // 清空輸入框
      fetchTodos(); // 重新整理列表
    }
  }

  // 3. 更新 Todo 狀態為已完成
  async function completeTodo(id) {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: true })
      .eq("id", id);
    if (error) {
      console.error("Error completing todo:", error);
    } else {
      fetchTodos();
    }
  }

  // 4. 更新 Todo 文字內容 (補全)
  async function updateTodo(id) {
    const newTitle = prompt("請輸入新的待辦事項名稱:");
    if (!newTitle) return;

    const { error } = await supabase
      .from("todos")
      .update({ title: newTitle })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      fetchTodos();
    }
  }

  // 5. 刪除 Todo (補全)
  async function deleteTodo(id) {
    const confirmed = window.confirm("確定要刪除這項任務嗎？");
    if (!confirmed) return;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      fetchTodos();
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <hr />

      {/* 未完成清單 */}
      <h2>Incompleted Todos</h2>
      <div>
        {todos
          .filter((todo) => !todo.is_complete)
          .map((todo) => (
            <div key={todo.id} style={{ marginBottom: "10px" }}>
              <span style={{ marginRight: "10px" }}>{todo.title}</span>
              <button onClick={() => completeTodo(todo.id)}>Complete</button>
              <button onClick={() => updateTodo(todo.id)}>Update</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
      </div>

      <hr />

      {/* 已完成清單 */}
      <h2>Completed Todos</h2>
      <div>
        {todos
          .filter((todo) => todo.is_complete) // 修正了原本程式碼中的 (t) => todo 變數錯誤
          .map((todo) => (
            <div key={todo.id} style={{ marginBottom: "10px" }}>
              <span style={{ textDecoration: "line-through", marginRight: "10px" }}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;