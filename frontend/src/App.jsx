import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Navbar, Hero, Menu, Cart, OrderConfirm, Admin } from './components'
import axios from 'axios'
import './App.css'

axios.defaults.baseURL = '/api'

function App() {
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenu()
    fetchCart()
  }, [])

  const fetchMenu = async () => {
    try {
      const res = await axios.get('/menu')
      setMenu(res.data.data)
    } catch (err) {
      console.error('Menu load error', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    try {
      const res = await axios.get('/cart')
      setCart(res.data.data || [])
    } catch (err) {
      console.error('Cart load error', err)
    }
  }

  const addToCart = async (itemId) => {
    await axios.post('/cart', { itemId, quantity: 1 })
    fetchCart()
  }

  const updateCart = async (itemId, quantity) => {
    await axios.put(`/cart/${itemId}`, { quantity })
    fetchCart()
  }

  return (
    <div className="app">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<Hero featured={menu.slice(0, 3)} />} />
        <Route path="/menu" element={<Menu items={menu} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart items={cart} updateCart={updateCart} />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App

