import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import fetchTasksFromStorage from '../../api/fetchTasks'
import { Task } from '../../interfaces/Tasks'

const initialState: Task[] = []

export const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState: initialState,
    reducers: {
        setTasks: (state: Task[], action: PayloadAction<Task[]>) => {
            state = action.payload
        },

        addTask: (state: Task[], action: PayloadAction<Task>) => {
            state.push(action.payload)
        },

        deleteTask: (state: Task[], action: PayloadAction<Task>) => {
            const { id } = action.payload
            state = state.filter((item) => item.id !== id)
            return state
        },

        editTask: (state: Task[], action: PayloadAction<Task>) => {
            const { id } = action.payload
            state = state.map((item) =>
                item.id === id ? action.payload : item
            )
            return state
        },
    },
})

export const { setTasks, addTask, deleteTask, editTask } = tasksSlice.actions

export default tasksSlice.reducer
