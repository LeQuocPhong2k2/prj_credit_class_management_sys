import React from 'react'
import notFoundImage from '../assets/404.jpg'

const NotFound = () => {
  return (
    <div>
      <img className='w-screen h-screen' src={notFoundImage} alt='cloud' />
    </div>
  )
}

export default NotFound
