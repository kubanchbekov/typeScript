import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { editTodo, todoDel } from "../store/todo/todoSlice";
import { useState } from "react";

type TodoType = {
  title: string;
  text: string;
  phote: string;
  id: number;
};

// Стили для всего списка задач
const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

// Стили для каждой задачи
const TodoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

// Стили для полей ввода
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

// Стили для кнопок
const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:first-of-type {
    background-color: #007bff;
    color: white;
  }

  &:nth-of-type(2) {
    background-color: #dc3545;
    color: white;
  }

  &:last-of-type {
    background-color: #6c757d;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

// Стили для формы редактирования
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TodoList = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [editPhote, setEditPhote] = useState<string>("");

  const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const handleTodoEdit = (todo: TodoType) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditText(todo.text);
    setEditPhote(todo.phote);
  };

  const handleTodoDelete = (id: number) => {
    dispatch(todoDel(id));
  };

  const handleSaveEdit = () => {
    if (editId !== null) {
      dispatch(
        editTodo({
          id: editId,
          title: editTitle,
          text: editText,
          phote: editPhote,
        })
      );
      setEditId(null); // Сбрасываем редактирование
    }
  };

  const handleCancelEdit = () => {
    setEditId(null); // Сбрасываем редактирование
  };

  return (
    <TodoContainer>
      {todos?.map((item) => (
        <TodoItem key={item.id}>
          {editId === item.id ? (
            <EditForm>
              <Input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle}
                placeholder="Edit Title"
              />
              <Input
                type="text"
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
                placeholder="Edit Text"
              />
              <Input
                type="url"
                onChange={(e) => setEditPhote(e.target.value)}
                value={editPhote}
                placeholder="Edit Photo URL"
              />
              <div>
                <Button type="button" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button type="button" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </EditForm>
          ) : (
            <div>
              <p>{item.title}</p>
              <p>{item.text}</p>
              <img src={item.phote} alt={item.title} />
              <div>
                <Button onClick={() => handleTodoDelete(item.id)}>Delete</Button>
                <Button onClick={() => handleTodoEdit(item)}>Edit</Button>
              </div>
            </div>
          )}
        </TodoItem>
      ))}
    </TodoContainer>
  );
};

export default TodoList;
