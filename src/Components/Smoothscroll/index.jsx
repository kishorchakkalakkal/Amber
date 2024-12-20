import React, { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

function Smoothscroll( {children} ) {

  const lenisRef = useRef()
  
  useEffect(() => {

    function update(time) {
      lenisRef.current?.lenis?.raf(time)
      requestAnimationFrame(update);
    }

    lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update() )

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(update)
  
    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root options={{
        duration: 1.5, 
        easing: (time) => Math.min(1, 1.001 - Math.pow(2.25, -10 * time))
    }} >
        {children}
    </ReactLenis>
  )
}

export default Smoothscroll