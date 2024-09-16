import styled from 'styled-components';
import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addClit } from '../store/todo/todoSlice';

// Стили для формы
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: 0 auto;
`;

// Стили для полей ввода
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Стили для кнопки
const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const TodoForm = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [phote, setPhote] = useState<string>('');

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      title,
      text,
      phote,
    };
    dispatch(addClit(newTodo));
    // Очистка полей после добавления задачи
    setTitle('');
    setText('');
    setPhote('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)}  
        value={title} 
        placeholder="Title" 
      />
      <Input 
        type="text" 
        onChange={(e) => setText(e.target.value)} 
        value={text}
        placeholder="Text"
      />
      <Input 
        type="url" 
        onChange={(e) => setPhote(e.target.value)} 
        value={phote} 
        placeholder="Photo URL"
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default TodoForm;
