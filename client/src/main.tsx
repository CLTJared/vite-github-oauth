import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className='h-screen w-full bg-black/95 p-2 text-gray-100 flex flex-col items-center'>
    <h1 className='text-gray-100 font-bold text-3xl'>GitHub Authentication with OAuth2</h1>
    <p className='mb-5'>
      Welcome to the tutorial on connecting to GitHub with OAuth2 & Vite + React Typescript.
    </p>
      <App />
    </main>
  </React.StrictMode>,
)
