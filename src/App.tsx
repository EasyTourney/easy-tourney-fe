import { Route, Routes } from 'react-router-dom'
import Category from './layouts/Categories'
import Public from './pages/Public'
import { Login } from './pages/Login'
import Dashboard from './layouts/Dashboard'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
      <ToastContainer style={{ fontSize: '15px' }} autoClose={1000} draggable />
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
