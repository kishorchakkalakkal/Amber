import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import classes from './navigation.module.css'
import { gsap } from "gsap/all"
import siteLogo from '../../assets/amber_logo_white.svg'

function Navigation() {

  const location = useLocation();
  const isInnerPage = location.pathname !== '/' && !( location.pathname.startsWith('/works/') && location.pathname !== '/works/' );

  const MenuBulge = useRef()

  const BackToTop = useRef()
  const BackToTop_Path = useRef()
  const BackToTop_Text = useRef()
  const BackToTop_Anim = useRef(gsap.timeline({
    paused: true
  }))

  const [ navAnimation, setNavAnimation ] = useState(null)
  const [ preloading, setPreloading ] = useState(true)
  const [ menuOpen, setMenuOpen ] = useState(false)

  const [ menuVisible, setMenuVisible ] = useState( true )
  const [ bulgeOpen, setBulgeOpen ] = useState( true )

  const MenuBackdrop = useRef()
  const MenuBackdrop_wrap = useRef()
  const MenuBackdrop_path = useRef()

  const Hamburger = useRef()
  const CloseMenu = useRef()

  const MenuBulge_Open = useRef()
  const MenuBulge_OpenPath = useRef()
  const MenuBulge_Close = useRef()
  const MenuBulge_ClosePath = useRef()

  const MenuWrap = useRef()
  const MenuItems = useRef()

  const ShowMenu = useRef(gsap.timeline({
    paused: true
  }))
  const MenuBulgeOpen_anim = useRef(gsap.timeline({
    paused: true
  }))
  const hideHamburger_anim = useRef(gsap.timeline({
    paused: true
  }))

  const showRightBulge = useRef(gsap.timeline({
    paused: true
  }))

  const hideRightBulge = useRef(gsap.timeline({
    paused: true
  }))

  const menuHandler = () => {
    setMenuOpen( prev => !prev )
  }

  let svg_maxHeight, path_initial, path_final
  let lockBulge = true

  const bulgeAnchor = window.innerHeight / 2

    const updateMenuPos = ( e ) => {
      if( !lockBulge && window.innerWidth > 1240 )  {
        if( e.clientX > ( window.innerWidth - 200 ) ) {
          gsap.to( MenuBulge.current, {
            y: ( e.clientY - bulgeAnchor ),
            ease: "power3.out",
            duration: 0.75
          } )
          gsap.timeline({
            ease: "power4.out"
          }).to( MenuBulge_OpenPath.current, {
            d: `path('${path_initial}')`,
            ease: "none",
            duration: 0.3
          }).to( Hamburger.current, {
            x: 0,
            ease: "none",
            duration: 0.3
          }, '<' )
        } else {
            gsap.timeline({
              ease: "power4.out"
            }).to( MenuBulge_OpenPath.current, {
              d: `path('${path_final}')`,
              ease: "none",
              duration: 0.3
            }).to( Hamburger.current, {
              x: 150,
              ease: "none",
              duration: 0.3
            }, '<' )
        }
      }
    }

    const handleScroll = () => {
      if (window.scrollY >= 10) {
        lockBulge = false
        gsap.timeline({
          ease: "power4.out"
        }).to( MenuBulge_OpenPath.current, {
          d: `path('${path_final}')`,
          ease: "none",
          duration: 0.3
        }).to( Hamburger.current, {
          x: 150,
          ease: "none",
          duration: 0.3
        }, '<' )
      } else {
        lockBulge = true
        gsap.to( MenuBulge.current, {
          y: 0,
          ease: "power3.out",
          duration: 0
        } )
        gsap.timeline({
          ease: "power4.out"
        }).to( MenuBulge_OpenPath.current, {
          d: `path('${path_initial}')`,
          ease: "none",
          duration: 0.3
        }).to( Hamburger.current, {
          x: 0,
          ease: "none",
          duration: 0.3
        }, '<' )
      }

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        BackToTop_Anim.current.play()
      } else {
        BackToTop_Anim.current.reverse()
      }
    };

    const handleBackToTop = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  
    useEffect( () => {
      
      svg_maxHeight = window.innerHeight > 600 ? 600 : window.innerHeight
      path_initial = 'M200 0 C120 ' + ( svg_maxHeight / 2 ) + ' 120 ' + ( svg_maxHeight / 2 ) + ' 200 ' + svg_maxHeight + ' Z'
      path_final = 'M200 0 C' + ( svg_maxHeight / 2 ) + ' ' + ( svg_maxHeight / 2 ) + ' ' + ( svg_maxHeight / 2 ) + ' ' + ( svg_maxHeight / 2 ) + ' 200 ' + svg_maxHeight + ' Z'
      
      /*----------BACK TO TOP-----------*/
      const btt_path_final = 'M0,55 C100,55 162.5,0 250,0 C337.5,0 400,55 500,55 Z'
      const btt_path_initial = 'M0,55 C100,55 162.5,55 250,55 C337.5,55 400,55 500,55 Z'

      const NavSVG_width = window.innerWidth
      const NavSVG_height = window.innerHeight
      let navpath_initial = 'M' + NavSVG_width + ',0 L' + NavSVG_width + ',' + NavSVG_height 
        + ' L' + (NavSVG_width) + ',' + NavSVG_height 
        + ' C' + (NavSVG_width) + ',' + (NavSVG_height*0.85) + ' ' + (NavSVG_width) + ',' + (NavSVG_height*0.7) + ' ' + (NavSVG_width) + ',' + (NavSVG_height*0.6)
        + ' C' + (NavSVG_width) + ',' + (NavSVG_height*0.4) + ' ' + (NavSVG_width) + ',' + (NavSVG_height*0.3) + ' ' + (NavSVG_width) + ',' + (NavSVG_height*0.15)
        + ' Q' + (NavSVG_width) + ',' + (NavSVG_height*0.05) + ' ' + (NavSVG_width) + ',0' + ' Z'

      let navpath_intermediate = 'M' + NavSVG_width + ',0 L' + NavSVG_width + ',' + NavSVG_height 
      + ' L' + (NavSVG_width*0.5) + ',' + NavSVG_height 
      + ' C' + (NavSVG_width*0.45) + ',' + (NavSVG_height*0.85) + ' ' + (NavSVG_width*0.75) + ',' + (NavSVG_height*0.7) + ' ' + (NavSVG_width*0.4) + ',' + (NavSVG_height*0.6)
      + ' C-' + (NavSVG_width*0.15) + ',' + (NavSVG_height*0.4) + ' ' + (NavSVG_width*0.65) + ',' + (NavSVG_height*0.3) + ' ' + (NavSVG_width*0.45) + ',' + (NavSVG_height*0.15)
      + ' Q' + (NavSVG_width*0.35) + ',' + (NavSVG_height*0.05) + ' ' + (NavSVG_width*0.5) + ',0' + ' Z'

      let navpath_final = 'M' + NavSVG_width + ',0 L' + NavSVG_width + ',' + NavSVG_height 
      + ' L0,' + NavSVG_height 
      + ' C0,' + (NavSVG_height*0.85) + ' 0,' + (NavSVG_height*0.7) + ' 0,' + (NavSVG_height*0.6)
      + ' C0,' + (NavSVG_height*0.4) + ' 0,' + (NavSVG_height*0.3) + ' 0,' + (NavSVG_height*0.15)
      + ' Q0,' + (NavSVG_height*0.05) + ' 0,0' + ' Z'

      MenuBulge_Open.current.setAttribute( 'viewBox', '0 0 200 '+ svg_maxHeight )
      MenuBulge_Close.current.setAttribute( 'viewBox', '0 0 200 '+ svg_maxHeight )
      MenuBulge_Open.current.setAttribute( 'height', svg_maxHeight +'px' )
      MenuBulge_Close.current.setAttribute( 'height', svg_maxHeight +'px' )
      MenuBulge_OpenPath.current.setAttribute( 'd', path_final )
      MenuBulge_ClosePath.current.setAttribute( 'd', path_initial )

      MenuBackdrop.current.setAttribute( 'viewBox', '0 0 ' + NavSVG_width + ' '+ NavSVG_height )
      MenuBackdrop_path.current.setAttribute( 'd', navpath_final )

      BackToTop_Anim.current.to( BackToTop_Path.current, {
        duration: 0.5,
        keyframes: {
            '0%' : { d: `path('${btt_path_initial}')`, ease: "none" },
            '100%' : { d: `path('${btt_path_final}')`, ease: "none"  },
            ease: "circ.inOut"
        }
      } ).to( BackToTop_Text.current, {
        duration: 0.5,
        y: 0
      }, '<' )
    
      MenuBulgeOpen_anim.current.to( MenuBulge_OpenPath.current, {
        duration: 0.5,
        keyframes: {
            '0%' : { d: `path('${path_final}')`, ease: "none" },
            '100%' : { d: `path('${path_initial}')`, ease: "none"  },
            ease: "circ.inOut"
        }
      })
    
      const MenuBulgeClose_anim = gsap.to( MenuBulge_ClosePath.current, {
        duration: 0.5,
        paused: true,
        keyframes: {
            '0%' : { d: `path('${path_initial}')`, ease: "none" },
            '100%' : { d: `path('${path_final}')`, ease: "none"  },
            ease: "circ.inOut"
        },
      })
    
      const ShowHamburger_anim = gsap.to( Hamburger.current, {
        duration: 0.5,
        paused: true,
        x: 0,
        ease: "circ.inOut"
      })
    
      const ShowCloseMenu_anim = gsap.to( CloseMenu.current, {
        duration: 0.5,
        paused: true,
        x: 0,
        ease: "circ.inOut"
      })

      showRightBulge.current.add( MenuBulgeOpen_anim.current.reverse() )
      .add( ShowHamburger_anim.play(), '<' )

      hideRightBulge.current.add( MenuBulgeClose_anim.reverse() )
      .add( ShowCloseMenu_anim.play(), '<' )
    
      const Backdrop_timeline = gsap.timeline({
        paused: true
      })

      Backdrop_timeline.to( MenuBackdrop_path.current, {
        duration: 1,
        keyframes: {
            '0%' : { d: `path('${navpath_final}')`, ease: "none" },
            '75%' : { d: `path('${navpath_intermediate}')`, ease: "none" },
            '100%' : { d: `path('${navpath_initial}')`, ease: "none"  },
            ease: "circ.inOut"
        }
      }).to( MenuBackdrop.current, {
          duration: 1,
          keyframes: {
              '15%' : { scale: 1, ease: "none" },
              '40%' : { scale: 1.15, ease: "none" },
              '100%' : { scale: 1, ease: "none" },
              ease: "linear",
          }
      }, '<0.15')

      ShowMenu.current.to( MenuWrap.current, {
        x: 0,
        duration: 1,
        opacity: 1,
        delay: 0.5,
        ease: "circ.inOut"
      }).from( MenuItems.current.children, {
        x: 100,
        duration: 0.3,
        opacity: 0,
        ease: "circ.inOut",
        stagger: 0.05
      }, '<0.65')

      const menuClose_sequence = gsap.timeline({paused: true})
      menuClose_sequence.add( MenuBulgeClose_anim.play() )
      .add( ShowCloseMenu_anim.reverse(), '<' )
      .add( Backdrop_timeline.play(), '<' )
      .add( ShowHamburger_anim.play(), '-=0.5' )
      .add( MenuBulgeOpen_anim.current.play(), '<' )

      setNavAnimation( menuClose_sequence )

      const preloadTimer = setTimeout( () => {  
        setPreloading( prev => !prev )
      }, 2000)

      document.addEventListener('mousemove', updateMenuPos);
      window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(preloadTimer)
      document.removeEventListener('mousemove', updateMenuPos);
      window.removeEventListener('scroll', handleScroll);
    }

    }, [] )

    useEffect(() => {
      navAnimation ? navAnimation.play() : null
      gsap.set( MenuBulge_Close.current, {
        opacity: 1,
        delay: 3
      } )
      gsap.set( CloseMenu.current, {
        opacity: 1,
        delay: 3
      } )
    }, [preloading] )

    useEffect(() => {
      if( navAnimation ) {
        if( menuOpen ) {
          lockBulge = true
          navAnimation.reverse()
          ShowMenu.current.play()
        } else {
          lockBulge = false
          navAnimation.play()
          ShowMenu.current.reverse()
        }
      }
    }, [menuOpen, navAnimation])


  return (
    <>
      <div className={`${classes.MenuBulge_wrap}`} ref={MenuBulge} >
        <div ref={Hamburger} className={ isInnerPage ? `${classes.hamburgerMenu} ${classes.onInnerPage}` : `${classes.hamburgerMenu}` } onClick={menuHandler} ><span></span></div>
        <div ref={CloseMenu} className={`${classes.CloseMenu}`} onClick={menuHandler} ><span></span></div>
        <svg ref={MenuBulge_Open} className={`${classes.MenuBulge_open}`} viewBox="0 0 200 600" width="200px" height="600px" >
            <g>
                <path ref={MenuBulge_OpenPath} d="0"></path>
            </g>
        </svg>
        <svg ref={MenuBulge_Close} className={`${classes.MenuBulge_close}`} viewBox="0 0 200 600" width="200px" height="600px" >
            <g>
                <path ref={MenuBulge_ClosePath} d="0"></path>
            </g>
        </svg>
      </div>
      <div ref={MenuBackdrop_wrap} className={`${classes.MenuBackdrop}`}>
        <svg viewBox="0 0 0 0" ref={MenuBackdrop} >
          <g>
            <path ref={MenuBackdrop_path} d='0' ></path>
          </g>
        </svg>
      </div>
      <div ref={MenuWrap} className={`${classes.menuWrap}`} >
          <div className={` row ${classes.menuWrap_row}`} >
            <div className='col-md-7'>
              <Link to='/' onClick={menuHandler} >
                <img src={siteLogo} className={`${classes.MenuWrap_logo}`}  />
              </Link>
            </div>
            <div className='col-md-5 ps-xl-0'>
              <ul className='m-0 p-0 list-unstyled' ref={MenuItems} >
                <li>
                  <Link to='/works/' onClick={menuHandler} >
                    Work
                  </Link>
                </li>
                <li>
                  <Link to='/services/' onClick={menuHandler} >Services</Link>
                </li>
                <li>
                  <Link to='/about/' onClick={menuHandler} >About</Link>
                </li>
        
              </ul>
              <ul className={`m-0 p-0 list-unstyled ${classes.socialLinks}`} >
                <li>
                  <a href='#' target='_blank' >Facebook</a>
                </li>
                <li>
                  <a href='#' target='_blank' >Instagram</a>
                </li>
                <li>
                  <a href='#' target='_blank' >LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <div className={`${ classes.BackToTop_Wrap }`} >
          <svg ref={BackToTop} className={`${classes.BackToTop_Curve}`} viewBox="0 0 500 55" width="500" height="55" >
              <g>
                <path ref={BackToTop_Path} d="0" onClick={handleBackToTop} ></path>
              </g>
          </svg>
          <p ref={BackToTop_Text} >Back to top</p>
      </div>
    </>
  )
}

export default Navigation