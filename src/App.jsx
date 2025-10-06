import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Locations from './pages/Locations'
import Industries from './pages/Industries'
import Custom from './pages/Custom'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/custom" element={<Custom />} />
    </Routes>
  </BrowserRouter>
)

export default App
