import { compose, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { isRejectedWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { isRejectedWithValue }) => {
    try {
      const response = await api.post("/todos", {
        //add to database
        id: Date.now(),
        title: payload.title,
        completed: false,
      });
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { isRejectedWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todos/toggleAsyncTodos",
  async (payload, { isRejectedWithValue }) => {
    try {
      const response = await api.patch(`/todos/${payload.id}`, {
        completed: payload.completed,
      });

      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    todos: [],
    error: "",
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === +action.payload.id
      );
      selectedTodo.completed = !action.payload.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== +action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
        state.todos = [];
        state.error = "";
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = "";
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(addAsyncTodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // show in UI
      })
      .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== +action.payload.id
        );
      })
      .addCase(toggleAsyncTodos.fulfilled, (state, action) => {
        const selectedTodo = state.todos.find(
          (todo) => todo.id === +action.payload.id
        );
        selectedTodo.completed = action.payload.completed;
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
