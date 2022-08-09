import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Task from './components/Task'
import Authentication from './components/Authentication'
import AuthorizationHOC from './hoc/AuthorizationHOC'
import MainLayout from './hoc/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={<MainLayout />} 
        />
        
        <Route 
          path='/signin' 
          element={<Authentication />} 
        />

        <Route 
          path='/task' 
          element={
            <AuthorizationHOC>
              <Task />
            </AuthorizationHOC>
          } 
        />

        <Route 
          path='*' 
          element={<Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
