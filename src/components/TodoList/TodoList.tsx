import React from 'react';
import './TodoList.scss'
import { Button, List, Typography } from 'antd';
import { CheckCircleTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { red, blue, green } from '@ant-design/colors';
const { Title } = Typography;


const TodoList = () => {
  const data = [];

  return (
    <List className='todo-list' bordered dataSource={data} renderItem={(item) => (
      <List.Item className='task'>
        <Title className='task__title' level={4}>{item.length > 45 ? item.substring(0, 50) + '...' : item}</Title>
        <div className='button'>
        <Button className='button__delete' icon={ <DeleteTwoTone twoToneColor={red[2]} />}  />
        <Button className='button__edit' icon={ <EditTwoTone twoToneColor={blue[3]}/>} />
        <Button className='button__completed' icon={ <CheckCircleTwoTone twoToneColor={green[3]}/>} />
        </div>
      </List.Item>
    )}/>
  )
}

export default TodoList