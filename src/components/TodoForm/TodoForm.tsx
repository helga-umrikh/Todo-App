import React, { useState, ChangeEvent } from 'react'
import './TodoForm.scss'
import { Input, Button } from 'antd'
import { PlusSquareTwoTone } from '@ant-design/icons'
import { blue } from '@ant-design/colors'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/slices/tasksSlice'
import { Task } from '../../interfaces/Tasks'
import { v4 as uuidv4 } from 'uuid'

const TodoForm = () => {
    const [taskState, setTaskState] = useState<string>('')
    const [inputStatus, setInputStatus] = useState<Boolean>(false)
    const dispatch = useDispatch()

    const createTask = () => {
        const task: Task = {
            id: uuidv4(),
            title: taskState,
            description: null,
            expirationDate: new Date(),
            isDone: false,
        }

        dispatch(addTask(task))
        setTaskState('')
        setInputStatus(false)
    }

    return (
        <div className="todo-form">
            <Input
                className="todo-form__input"
                placeholder={'What would you like to do?'}
                value={taskState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setTaskState(e.target.value)
                }}
                status={inputStatus ? 'error' : undefined}
            />
            <Button
                icon={
                    <PlusSquareTwoTone
                        twoToneColor={blue[4]}
                        onClick={() => {
                            if (taskState) {
                                createTask()
                            } else {
                                setInputStatus(true)
                            }
                        }}
                    />
                }
            ></Button>
        </div>
    )
}

export default TodoForm
