import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем интерфейс для элемента todo
interface Todo {
  title: string;
  text: string;
  phote: string;
  id: number;
}

// Типизируем начальное состояние
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Типизируем редьюсер с помощью PayloadAction
    addClit: (state, { payload }: PayloadAction<Todo>) => {
      state.todos.push(payload); // Добавляем новый элемент в массив todos
    },
    todoDel: (state, { payload }: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id != payload);
    },
    editTodo:(state,{payload}:PayloadAction<Todo>)=>{
        const index=state.todos.findIndex(todo=>todo.id===payload.id)
        if(index!==1){
            state.todos[index]=payload
        }
    }
  },
});

// Экспортируем actions и reducer
export const { addClit,todoDel,editTodo } = todoSlice.actions;
export default todoSlice.reducer; // Экспортируем reducer по умолчанию
