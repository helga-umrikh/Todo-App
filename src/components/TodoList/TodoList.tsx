import React, { useState } from 'react'
import './TodoList.scss'
import {
    Button,
    List,
    Typography,
    Modal,
    Input,
    DatePicker,
    Upload,
    message,
} from 'antd'
import {
    CheckCircleTwoTone,
    DeleteTwoTone,
    EditTwoTone,
    EyeTwoTone,
    UploadOutlined,
} from '@ant-design/icons'
import { red, blue, green } from '@ant-design/colors'
import type { UploadProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Task } from '../../interfaces/Tasks'
import { deleteTask, editTask } from '../../redux/slices/tasksSlice'
const { Title, Paragraph, Text } = Typography

const TodoList = () => {
    // @ts-ignore
    const data = useSelector((state) => state.tasksData)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editedTask, setEditedValue] = useState<Object>({})

    const modifyTask = (prevTask: Task, newProps: Object) => {
        const modifiedTaks = {
            ...prevTask,
            ...newProps,
        }

        return modifiedTaks
    }

    const props: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    return (
        <List
            className="todo-list"
            bordered
            dataSource={data}
            renderItem={(item: Task) => (
                <List.Item
                    className="task"
                    style={{
                        backgroundColor: item.isDone
                            ? `${green[1]}`
                            : 'initial',
                    }}
                >
                    <Title className="task__title" level={4}>
                        {item.title}
                    </Title>
                    <div className="button">
                        <Button
                            className="button__view"
                            icon={<EyeTwoTone twoToneColor={blue[3]} />}
                            onClick={() => {
                                setIsModalOpen(!isModalOpen)
                            }}
                        />
                        <Button
                            className="button__delete"
                            icon={<DeleteTwoTone twoToneColor={red[2]} />}
                            onClick={() => {
                                dispatch(deleteTask(item))
                            }}
                        />
                        <Button
                            className="button__edit"
                            icon={<EditTwoTone twoToneColor={blue[3]} />}
                            onClick={() => {
                                setIsEditModalOpen(!isEditModalOpen)
                                setEditedValue(item)
                            }}
                        />
                        <Button
                            className="button__completed"
                            icon={
                                <CheckCircleTwoTone twoToneColor={green[3]} />
                            }
                            onClick={() => {
                                dispatch(
                                    editTask(
                                        modifyTask(item, {
                                            isDone: !item.isDone,
                                        })
                                    )
                                )
                            }}
                        />
                        <Modal
                            title="Todo"
                            open={isModalOpen}
                            footer={null}
                            onCancel={() => {
                                setIsModalOpen(!isModalOpen)
                            }}
                        >
                            <div className="edit-modal__options">
                                <Title level={3}>{item.title}</Title>
                                <Title level={5}>Due Date:</Title>
                                <Text>
                                    {item.expirationDate
                                        ? item.expirationDate
                                        : 'no expiration date yet'}
                                </Text>
                                <Title level={5}>Description:</Title>
                                <Paragraph>
                                    {item.description
                                        ? item.description
                                        : 'no description yet'}
                                </Paragraph>
                            </div>
                        </Modal>
                        <Modal
                            className="edit-modal"
                            title="Edit Todo"
                            open={isEditModalOpen}
                            footer={null}
                            onCancel={() => {
                                setIsEditModalOpen(!isEditModalOpen)
                            }}
                        >
                            <div className="edit-modal__options">
                                <Title level={5}>Title</Title>
                                <Input
                                    className="edit-modal__input"
                                    defaultValue={item.title}
                                    allowClear
                                    maxLength={45}
                                    showCount
                                    onChange={(e) => {
                                        setEditedValue({
                                            ...editedTask,
                                            title: e.target.value,
                                        })
                                    }}
                                />
                                <Title level={5}>Due to:</Title>
                                <DatePicker
                                    className="edit-modal__input"
                                    onChange={(date) => {
                                        setEditedValue({
                                            ...editedTask,
                                            expirationDate:
                                                date.format('DD-MM-YYYY'),
                                        })
                                    }}
                                />
                                <Title level={5}>Description</Title>
                                <Input.TextArea
                                    className="edit-modal__input"
                                    autoSize
                                    defaultValue={
                                        item.description ? item.description : ''
                                    }
                                    allowClear
                                    onChange={(e) => {
                                        setEditedValue({
                                            ...editedTask,
                                            description: e.target.value,
                                        })
                                    }}
                                ></Input.TextArea>
                                <Title level={5}>Attach files:</Title>
                                <Upload {...props}>
                                    <Button
                                        icon={<UploadOutlined />}
                                        className="edit-modal__input"
                                    >
                                        Click to Upload
                                    </Button>
                                </Upload>
                            </div>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        editTask(modifyTask(item, editedTask))
                                    )
                                    setIsEditModalOpen(!isEditModalOpen)
                                    message.success(
                                        'Task changed successfully!'
                                    )
                                }}
                            >
                                Add changes
                            </Button>
                        </Modal>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default TodoList
