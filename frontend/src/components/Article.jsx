import React from 'react'

function Article({title,image,path,nid}) {
  return (
    
    <div className='article bg-white rounded-lg shadow-md p-4 mb-4 flex gap-20' key={nid}>
    
    <div className='relative w-1/5 h-60 mb-2 bg-pink-100'>
    <img src={image} alt={title} className='object-cover w-full h-full rounded-lg'/>
    <a href={path} className='text-blue-500 hover:text-blue-700 text-sm underline'>Read more</a>
    </div>
    <h2 className='text-lg font-bold mb-2'>{title}</h2>
    </div>
  )
}

export default Article