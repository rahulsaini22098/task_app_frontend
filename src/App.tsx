import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Task from './components/Task'
import Authentication from './components/Authentication'
import AuthorizationHOC from './hoc/AuthorizationHOC'
import MainLayout from './hoc/MainLayout/MainLayout'
import CompleteTask from './components/CompletedTask'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <AuthorizationHOC>
              <Task />
            </AuthorizationHOC>
          } 
        />

        <Route 
          path='/completed' 
          element={
            <AuthorizationHOC>
              <CompleteTask />
            </AuthorizationHOC>
          } 
        />
        <Route 
          path='/' 
          element={
            <AuthorizationHOC>
              <Task />
            </AuthorizationHOC>
          } 
        />
        
        <Route 
          path='/signin' 
          element={<Authentication />} 
        />

        <Route 
          path='/signin' 
          element={<Authentication />} 
        />

        <Route 
          path='/signup' 
          element={<Authentication />} 
        />

        <Route 
          path='*' 
          element={<Navigate to='/signup' />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
