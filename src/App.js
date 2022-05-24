import React, {useState, useMemo} from 'react';
import PostList from './components/PostList.jsx'
import './styles/App.css';
import PostForm from './components/PostForm.jsx'
import PostFilter from './components/PostFilter.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
import MyModal from './components/UI/modal/MyModal.jsx';

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'аа', body: 'бб'},
    {id: 2, title: 'гг 2', body: 'аа'},
    {id: 3, title: 'вв 3', body: 'яя'},
  ])

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    if(filter.sort){
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);


  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


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
// timecode: 1:33:37
// коллбеки...