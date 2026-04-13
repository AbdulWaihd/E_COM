import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Shared/components/Header'
import AddCard from './modules/cards/AddCard'
import Home from './modules/home/Home'
function App() {

  return (
    <>
  <Header/>
  <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddCard />} />
      </Routes>
    </>
  )
}

export default App
