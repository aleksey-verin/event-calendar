import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { Layout } from 'antd'
import { useActions } from './hooks/useActions'
import { IUser } from './models/IUser'
// import 'antd/dist/reset.css'

function App() {
  const { setUser, setIsAuth } = useActions()

  useEffect(() => {
    if (localStorage.getItem('event-auth')) {
      setIsAuth(true)
      setUser({ username: localStorage.getItem('event-username' || '') } as IUser)
    }
  }, [])

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  )
}

export default App
