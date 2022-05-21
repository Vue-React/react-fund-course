import React, {useState, useRef} from 'react';
import PostList from './components/PostList.jsx'
import './styles/App.css';
import MyButton from './components/UI/button/MyButton.jsx';
import MyInput from './components/UI/input/MyInput.jsx';

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body
    }
    console.log(newPost);

    setPosts([...posts, newPost])
    setTitle('')
    setBody('')
  }


  return (
    <div className="App">
      <form>
        {/* Управляемый компонент */}
        <MyInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Название поста"
          />
        {/* Неуправляемый/неконтролируемый компонент */}
        <MyInput
          value={body}
          onChange={e => setBody(e.target.value)}
          type="text"
          placeholder="Описание поста"
          />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты по JS"/>
    </div>
  );
}

export default App;
