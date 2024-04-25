import React from 'react'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ'
  }, [])

  if (!localStorage.getItem('account_id')) {
    window.location.href = '/login'
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
    </div>
  )
}

export default Home
