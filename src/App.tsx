import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Task from './components/Task'
import Authentication from './components/Authentication'
import AuthorizationHOC from './hoc/AuthorizationHOC'
import CompleteTask from './components/CompletedTask'
import InfiniteScroll from './components/InfiniteScroll'

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
          path='/scroll' 
          element={
            <AuthorizationHOC>
              <InfiniteScroll />
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
