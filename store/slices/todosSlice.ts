import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import todosService from "../../services/todosService";

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const todos = await todosService.getAllTodos();
      return todos;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: Omit<Todo, "id">, { rejectWithValue }) => {
    try {
      const newTodo = await todosService.createTodo(todo);
      return newTodo;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const updatedTodo = await todosService.updateTodo(todo);
      return updatedTodo;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      await todosService.deleteTodo(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleDone = createAsyncThunk(
  "todos/toggleDone",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { todos: TodosState };
      const todo = state.todos.todos.find((t) => t.id === id);
      if (!todo) throw new Error("Todo not found");
      const updatedTodo = await todosService.updateTodo({
        ...todo,
        done: !todo.done,
      });
      return updatedTodo;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      }
    );
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    });

    builder.addCase(
      updateTodo.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      }
    );

    builder.addCase(
      deleteTodo.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      }
    );

    builder.addCase(
      toggleDone.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      }
    );
  },
});

export default todosSlice.reducer;
