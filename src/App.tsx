import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import { Provider } from 'react-redux'

import Task from './components/Task'
import Authentication from './components/Authentication'
import AuthorizationHOC from './hoc/AuthorizationHOC'
import CompleteTask from './components/CompletedTask'
import InfiniteScroll from './components/InfiniteScroll'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
