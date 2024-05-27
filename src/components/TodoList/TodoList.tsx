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
    FileTwoTone,
    UploadOutlined,
} from '@ant-design/icons'
import { red, blue, green } from '@ant-design/colors'
import type { UploadFile, UploadProps } from 'antd'
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
    const [attachedFiles, setAttachedFiles] = useState<UploadFile<any>[]>([])

    const modifyTask = (
        prevTask: Task,
        newProps: Object,
        files?: UploadFile<any>[]
    ) => {
        const modifiedTaks = {
            ...prevTask,
            ...newProps,
            files,
        }

        return modifiedTaks
    }

    const props: UploadProps = {
        multiple: true,
        action: '',
        // @ts-ignore
        onChange({ fileList }) {
            console.log(fileList)

            setAttachedFiles(fileList)
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
                    <div className="edit-options">
                        <Button
                            className="edit-options__view"
                            icon={<EyeTwoTone twoToneColor={blue[3]} />}
                            onClick={() => {
                                setIsModalOpen(!isModalOpen)
                            }}
                        />
                        <Button
                            className="edit-options__delete"
                            icon={<DeleteTwoTone twoToneColor={red[2]} />}
                            onClick={() => {
                                dispatch(deleteTask(item))
                            }}
                        />
                        <Button
                            className="edit-options__edit"
                            icon={<EditTwoTone twoToneColor={blue[3]} />}
                            onClick={() => {
                                setIsEditModalOpen(!isEditModalOpen)
                                setEditedValue(item)
                            }}
                        />
                        <Button
                            className="edit-options__completed"
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
                    </div>
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
                            <Title level={5}>Attached files:</Title>
                            <Paragraph>
                                {item.files && item.files?.length > 0
                                    ? item.files.map((e, index) => (
                                          <div className="edit-modal__file">
                                              <FileTwoTone />
                                              <Paragraph>
                                                  {e.originFileObj
                                                      ? e.originFileObj.name
                                                      : index}
                                              </Paragraph>
                                          </div>
                                      ))
                                    : 'no files yet'}
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
                            <Upload
                                {...props}
                                fileList={attachedFiles}
                                beforeUpload={() => false}
                            >
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
                                    editTask(
                                        modifyTask(
                                            item,
                                            editedTask,
                                            attachedFiles
                                        )
                                    )
                                )
                                setIsEditModalOpen(!isEditModalOpen)
                                message.success('Task changed successfully!')
                            }}
                        >
                            Save changes
                        </Button>
                    </Modal>
                </List.Item>
            )}
        />
    )
}

export default TodoList
