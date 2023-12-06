import { Route, Routes } from 'react-router-dom'
import Category from './layouts/Categories'
import Public from './pages/Public'
import Dashboard from './layouts/Dashboard'
import { ToastContainer } from 'react-toastify'
import { Login } from './pages/Login'

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1000} draggable />
      <Routes>
        <Route path="/*" element={<Public />}>
          <Route path="" element={<Dashboard />} />
          <Route path="categories" element={<Category />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
