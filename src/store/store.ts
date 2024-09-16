import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice"; // Импортируем reducer

export const store = configureStore({
  reducer: {
    todo: todoReducer,  // Правильное использование reducer
  },
});

// Типизация стора и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
