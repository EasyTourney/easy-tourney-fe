import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import BaseTemplate from '../templates/base/base.template'
import React from 'react'
import Loader from '../components/Loader'
const Categories = lazy(() => import('../layouts/Categories'))
const Login = lazy(() => import('../pages/Login/Login'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Tournament = lazy(() => import('../layouts/Tournament'))
const Organizer = lazy(() => import('../layouts/Organizer'))

export const router = createBrowserRouter([
  {
    element: <BaseTemplate />,
    children: [
      {
        index: true,
        path: '',
        element: <Navigate to="/category" replace={true} />
      },
      {
        path: 'category',
        element: <Categories />
      },
      {
        path: 'organizer',
        element: <Organizer />
      },
      {
        path: 'tournament',
        element: <Tournament />
      },
      {
        path: 'loader',
        element: <Loader />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
