import Login from './components/Student/Login'
import HomePage from './components/Student/HomePage'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>

      {/* <Login /> */}
    </div>
  )
}

export default App
