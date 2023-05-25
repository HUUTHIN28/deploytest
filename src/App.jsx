

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
// import Home from './page/Home';
// import About from './page/About';
import { Suspense, lazy } from 'react';
import DetailHome from './page/DetailHome';


const Home = lazy(() => import('./page/Home'));
const About = lazy(() => import('./page/About'));
function App() {


  return (
    <>
  <Suspense fallback={<div>Loading...</div>}>
   <BrowserRouter>

    <ul>
    <li><Link to='/'>about</Link></li>
      <li><Link to='/home'>Home</Link></li>
      
    </ul>
      <Routes>
        <Route path="/home" element={<Home />} >
          <Route path=':id' element={<DetailHome/>}/>
        </Route>
        <Route path="/" element={<About />} />
      </Routes>
   
  </BrowserRouter>
  </Suspense>
    </>
  )
}

export default App
