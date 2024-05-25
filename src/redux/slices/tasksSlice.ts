import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../interfaces/Tasks'

const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: initialState,
  reducers: {
    addTask: (
      state: Task[],
      action: PayloadAction<Task>
    ) => {
      state.push(action.payload);
    },

    deleteTask: (
      state: Task[],
      action: PayloadAction<Task>
    ) => {
      const { id } = action.payload
      state = state.filter((item) => item.id !== id)
      return state
    },

    editTask: (
      state: Task[],
      action: PayloadAction<Task>
    ) => {
      const { id } = action.payload
      state.map((item) =>
        item.id === id ? action.payload : item
      )
    },
  }
})

export const { addTask, deleteTask, editTask } = tasksSlice.actions

export default tasksSlice.reducer