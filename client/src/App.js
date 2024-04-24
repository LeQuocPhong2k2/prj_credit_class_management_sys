import logo from './logo.svg'
import Login from './components/Login'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <Login /> */}
    </div>
  )
}

export default App
