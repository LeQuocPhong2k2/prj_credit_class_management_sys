import Login from '../../client/src/components/User/Login'
import Home from '../../client/src/components/User/Home'
import NotFound from '../../client/src/components/NotFound'
import RegisterCourse from './components/User/RegisterCourse'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import DashBoardAdmin from '../../client/src/components/Admin/DashBoardAdmin'
function App() {
  const isAuth = function () {
    if (!localStorage.getItem('account_id')) {
      window.location.href = '/login'
    }
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} onEnter={isAuth} />
          <Route path='/home' element={<Home />} onEnter={isAuth} />
          <Route path='/register-course' element={<RegisterCourse />} onEnter={isAuth} />
          <Route path='/login' element={<Login />} />
          <Route path='/not-found' element={<NotFound />} />

          <Route path='*' element={<Navigate to='/not-found' />} />
          <Route path='/admin' element={<DashBoardAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
