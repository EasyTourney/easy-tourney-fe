import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import BaseTemplate from '../templates/base/base.template'
import React from 'react'
import OrganizerTemplate from '../templates/oganizer/oganizer.template'
import ProtectedRoute from './ProtectedRoute'
const General = lazy(() => import('../layouts/General'))
const Schedule = lazy(() => import('../layouts/Schedule'))
const Result = lazy(() => import('../layouts/Result'))
const Participants = lazy(() => import('../layouts/Participants'))
const Categories = lazy(() => import('../layouts/Categories'))
const Login = lazy(() => import('../pages/Login/Login'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Tournament = lazy(() => import('../layouts/Tournament'))
const Organizer = lazy(() => import('../layouts/Organizers'))


const getDefaultRedirectPath = () => {
  const storedRole = localStorage.getItem('userRole')
  const isAdmin = storedRole === 'ADMIN'
  const isOrganizer = storedRole === 'ORGANIZER'
  if (isAdmin) {
    return '/category'
  } else if (isOrganizer) {
    return '/tournament'
  } else {
    return '/login'
  }
}

export const router = createBrowserRouter([
  {
    element: <BaseTemplate />,
    children: [
      {
        index: true,
        path: '/',
        element: <Navigate to={getDefaultRedirectPath()} replace={true} />
      },
      {
        path: 'category',
        element: <ProtectedRoute element={<Categories />} allowedRoles={['ADMIN']} />
      },
      {
        path: 'organizer',
        element: <ProtectedRoute element={<Organizer />} allowedRoles={['ADMIN']} />
      },
      {
        path: 'tournament',
        element: <ProtectedRoute element={<Tournament />} allowedRoles={['ADMIN', 'ORGANIZER']} />
      }
    ]
  },
  {
    element: <OrganizerTemplate />,
    children: [
      {
        path: '/tournament',
        element: <Navigate to="/tournament" replace={true} />
      },
      {
        path: '/tournament/general',
        element: <ProtectedRoute element={<General />} allowedRoles={['ADMIN', 'ORGANIZER']} />
      },
      {
        path: 'tournament/participant',
        element: <ProtectedRoute element={<Participants />} allowedRoles={['ADMIN', 'ORGANIZER']} />
      },
      {
        path: '/tournament/schedule',
        element: <ProtectedRoute element={<Schedule />} allowedRoles={['ADMIN', 'ORGANIZER']} />
      },
      {
        path: '/tournament/result',
        element: <ProtectedRoute element={<Result />} allowedRoles={['ADMIN', 'ORGANIZER']} />
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
