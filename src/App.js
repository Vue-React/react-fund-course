import React, {useState, useMemo} from 'react';
import PostList from './components/PostList.jsx'
import './styles/App.css';
import PostForm from './components/PostForm.jsx'
import PostFilter from './components/PostFilter.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
import MyModal from './components/UI/modal/MyModal.jsx';
import { usePosts } from './hooks/usePosts.js';

function App() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  // Получаем post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты по JS"/>
    </div>
  );
}

export default App;

// 24.05.22
// timecode: 1:36:18
// коллбеки...