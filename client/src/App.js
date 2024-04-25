import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  const isAuth = function() {
    if (!localStorage.getItem('account_id')) {
      window.location.href = '/login'
    }
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <Login /> */}
          <Route path='/' element={<Home />} onEnter={isAuth} />
          <Route path='/login' element={<Login />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
