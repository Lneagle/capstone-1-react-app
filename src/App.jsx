import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Locations from './pages/Locations'
import Industries from './pages/Industries'
import Custom from './pages/Custom'
import JobList from './components/JobList'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/locations" element={<Locations />}>
        <Route path=":slug" element={<JobList />} />
      </Route>
      <Route path="/industries" element={<Industries />}>
        <Route path=":slug" element={<JobList />} />
      </Route>
      <Route path="/custom" element={<Custom />} />
    </Routes>
  </BrowserRouter>
)

export default App
