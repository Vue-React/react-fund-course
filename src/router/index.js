import About from '../pages/About'
import Login from '../pages/Login'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'

export const privateRoutes = [
    {path: '/about', component: About, exect: true},
    {path: '/posts', component: Posts, exect: true},
    {path: '/posts/:id', component: PostIdPage, exect: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exect: true},
]