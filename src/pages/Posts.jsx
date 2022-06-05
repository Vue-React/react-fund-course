import React, {useEffect, useState} from 'react';
import PostList from '../components/PostList.jsx'
import '../styles/App.css';
import PostForm from '../components/PostForm.jsx'
import PostFilter from '../components/PostFilter.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import MyModal from '../components/UI/modal/MyModal.jsx';
import { usePosts } from '../hooks/usePosts.js';
import PostService from '../API/PostService.js';
import Loader from '../components/UI/loader/Loader.jsx';
import { useFetching } from '../hooks/useFetching.js';
import { getPageCount } from '../utils/pages.js';
import Pagination from '../components/UI/pagination/Pagination.jsx';

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  // Получаем post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>Get Posts</button> */}
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
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты по JS"/>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />      
    </div>
  );
}

export default Posts;