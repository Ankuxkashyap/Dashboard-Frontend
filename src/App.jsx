import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import PostsPage from './Pages/PostsPage';
import UpdatePost from './Pages/UpdatePost';

function App() {
  return (
    <Routes>  
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/posts" element={<PostsPage />} />
      <Route path="/post-update/:id" element={<UpdatePost />} />
      <Route path="*" element={<h1 className='text-center mt-20 text-3xl'>404 Not Found</h1>} />
    </Routes>
  )
}

export default App;
