import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import EditPost from './pages/EditPost';

function App() {

  return (
    <>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create' element={<CreatePost/>}/>
      <Route path='/post/:id' element={<Post/>}/>
      <Route path='/edit/:id' element={<EditPost/>}/>
     </Routes>
    </>
    
  )
}

export default App
