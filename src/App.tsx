import React from 'react';
import './App.scss'
import { Layout } from "antd";
import { Content, Footer, Header } from 'antd/es/layout/layout';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import Title from 'antd/es/typography/Title';


function App() {
  return (
    <Layout className="App">
      <Header className='header'>
        <Title className='header__title' level={2}>TO-DO LIST</Title>
      </Header>
      <Content className='content'>
        <TodoForm />
        <TodoList/>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
