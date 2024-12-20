import classes from './home.module.css'
import { gsap, ScrollTrigger } from "gsap/all"
import { useEffect, useRef } from 'react'
import siteLogo_white from '../../assets/amber_logo_white.svg'
import { Link } from 'react-router-dom';
import WorksList from '../../Components/WorksList';

gsap.registerPlugin(ScrollTrigger);

function Home() {

  const HeaderLogo = useRef()
  const component = useRef(null);
  const videoRef = useRef(null);
  const videoWrapRef = useRef(null);
  const bannerTimeline = useRef()
  const target_Shape = useRef()
  const target_Intro = useRef()
  const HeaderLogo_bg = useRef()

  useEffect( () => {

    const videoContainer = videoWrapRef.current;

    bannerTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: videoContainer,
        scrub: 0.4,
        pin: true,
        start: 'top top',
        end: '+=300%',
        pinSpacing: true,
        ease: 'none'
      }
    })

    bannerTimeline.current.to( target_Shape.current, {
      ease: 'none',
      scale: 1.5,
      rotation: 270,
      duration: 1.2
    } ).to( '#homeBanner_intro h2 span', {
      ease: 'none',
      opacity: 1,
      stagger: 0.05,
      duration: 0.75
    }, '<25%').to( HeaderLogo_bg.current, {
      yPercent: 100,
      duration: 0.5
    } )


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  } , [] )


  return (
    <div ref={component}>
      <div ref={HeaderLogo_bg} className={`${classes.siteLogo_bg}`}></div>
      <div ref={HeaderLogo} className={`${classes.siteLogo}`} >
            <Link to='/' >
              <img src={siteLogo_white} alt='amber comm' />
            </Link>
      </div>
      <div ref={videoWrapRef} className={`${classes.homeVideo}`}>
        <video ref={videoRef} 
          preload='auto'
          playsInline 
          autoPlay
          loop
          muted
          src="https://viralfever.in/amber_videos/HEADER_Orange.mp4" 
          style={{ width: '100%', height: 'auto' }} >
        </video> 
        <div id='homeBanner_intro' className={`${ classes.introWrap }`} >
          <svg ref={target_Shape} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.4,-70C49.7,-64.6,52.8,-48.4,61,-34.9C69.3,-21.5,82.7,-10.7,87.7,2.9C92.6,16.4,89,32.9,80,45C70.9,57,56.4,64.7,42.1,68C27.9,71.3,13.9,70.2,-0.8,71.5C-15.5,72.8,-30.9,76.6,-40.1,70.4C-49.3,64.1,-52.1,48,-60.3,34.6C-68.4,21.2,-81.8,10.6,-81.9,0C-82,-10.7,-68.7,-21.4,-60.7,-35C-52.7,-48.6,-50,-65.2,-40.7,-70.6C-31.4,-76.1,-15.7,-70.4,-0.1,-70.3C15.5,-70.1,31.1,-75.4,40.4,-70Z" transform="translate(100 100)" />
          </svg>
          <h2 ref={target_Intro} className={ `m-0 p-0 fw-semibold ${ classes.introText }` } >
            <span>Nothing is by chance. Everything we do comes from the fact that we have done it before. From planning to strategising to creating to implementing, whatever we bring is a tested, collaborative and result-oriented solution. And there's no two ways about it!</span>
          </h2>
        </div>
      </div>
      <div className='bg-white'>
      <WorksList filter_by_cat='all' showAllBtn={true} />
      </div>
      <div className={`${classes.featuredSection}`}>
        <div className={`${classes.featuredWrap}`}>
          <h3 className='text-white text-center m-0' >
          When showing<br/>beats telling.
          </h3>
          <video
            playsInline 
            muted 
            loop 
            autoPlay
            src="https://viralfever.in/amber_videos/updated/COBONE_THUMBNAIL.mp4?v=10" 
            style={{ width: '100%', height: 'auto' }} >
          </video> 
          <p className='text-center text-white mt-md-5 mt-4' >
          Amber Communications is dedicated to making a meaningful impact through community engagement. When creativity and community come together, they create powerful stories that inspire change. Through Amber Initiatives, we embrace the power of collective action and the strength of communities working together for the greater good.
          </p>
          <p className='m-0 text-center' >
            <a className='text-white text-decoration-none' >
              Discover More
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home