import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Services from './Pages/Services'
import PageNotFound from './Pages/PageNotFound'
import Navigation from './Components/Navigation'
import Footer from './Components/Footer'
import Smoothscroll from './Components/Smoothscroll'
import { useEffect } from 'react'
import Works from './Pages/Works'
import Stories from './Pages/Stories'
import ScrollToTop from './Components/ScrollToTop'
import SingleStory from './Pages/Stories/SingleStory'
import SingleWork from './Pages/Works/SingleWork'
import { fetchPosts } from './Redux/worklist'
import { useDispatch, useSelector } from 'react-redux'
import MouseTracker from './Components/MouseTracker'

function App() {

  const worksCategoryId = 55
  const dispatch = useDispatch()
  const status = useSelector((state) => state.works.status)
  const error = useSelector((state) => state.works.error)

  const loadStylesheets = () => {
    const now = new Date();
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    //link.href = `https://ambercomm.ae/backend/wp-content/plugins/elementor/assets/css/frontend-lite.min.css?ver=3.21.5`;
    link.href = `https://wordpress.viralfever.in/wp-content/plugins/elementor/assets/css/frontend-lite.min.css?ver=3.21.5`;
    document.head.prepend(link);
}

  useEffect(() => {
    loadStylesheets()
    if (status === 'idle') {
      dispatch(fetchPosts(worksCategoryId))
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return null
  }

  if (status === 'failed') {
    console.log( error )
    return null
  }

  return (
    <Smoothscroll>
      <ScrollToTop />
      <Navigation />
      <MouseTracker />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/services' element={<Services />} />
        <Route exact path='/works' element={<Works />} />
        <Route exact path='/works/:slug' element={<SingleWork />} />
        <Route exact path='/stories' element={<Stories />} />
        <Route exact path='/stories/16-ideas-for-ai-powered-e-commerce-with-our-friends-at-burrow' element={<SingleStory />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Smoothscroll>
  )
}

export default App
