import React, { useEffect, useRef, useState } from 'react'
import classes from './service.module.css'
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';

import siteLogo from '../../assets/amber_logo.svg'
import socialGIF from '../../assets/lottie/Social-Animation-1733910284959.lottie'
import techGIF from '../../assets/lottie/Technology-Animation- 1733910479098.lottie'
import digiGIF from '../../assets/lottie/DigitalActivations-Animation-1733910540894.lottie'
import marketGIF from '../../assets/lottie/In-marketexperiences-Animation-1733910584937.lottie'
import mediaGIF from '../../assets/lottie/Media-Animation-1733910662589.lottie'
import filmGIF from '../../assets/lottie/Films-Animation-1734381414428.lottie'
import WorksListAlt from '../../Components/WorksListAlt';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Services = () => {

  const awards = [
    {
      title: 'MENA Effie Awards',
      rank: '2' 
    },
    {
      title: 'MENADigital Awards',
      rank: '3' 
    },
    {
      title: 'Viral Campaigns',
      rank: '3' 
    },
    {
      title: 'Community Appreciation',
      rank: '5' 
    }
  ]

  const jumpAheadHandler = (e) => {
    const target = e.target.getAttribute('data-target')
    document.getElementById( target ).scrollIntoView({
      behavior: "smooth"
    })
  }

  const breakpointColumnsObj = {
    default: 2,
    500: 1
  };

  const [hoverIndex, setHoverIndex] = useState(null);

  const filterItem = useRef()

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className='innerPage' >
      <div className={ `${classes.serviceWrap}` } >
        <section className='pageHeader' >
          <Link to='/' >
          <img src={siteLogo} className='siteLogo' />
          </Link>
          <div className='jumpToSection' >
            <h6>
              Jump ahead
            </h6>
            <ul className="m-0 p-0 list-unstyled" onMouseLeave={handleMouseLeave} >
              <span
                className="hover-dot"
                style={{
                  top: hoverIndex !== null ? `${ ( hoverIndex * filterItem.current.getBoundingClientRect().height ) + ( filterItem.current.getBoundingClientRect().height / 2 ) }px` : '0', 
                  opacity: hoverIndex !== null ? 1 : 0,
                }}
              ></span>
              <li ref={filterItem}  onClick={jumpAheadHandler} onMouseEnter={() => handleMouseEnter(0)} >
              <span data-target='social_media_section'>Social Media</span>
              </li>
              <li  onClick={jumpAheadHandler} onMouseEnter={() => handleMouseEnter(1)} >
              <span data-target='digital_activation_section'>Digital Activation</span>
              </li>
              <li  onClick={jumpAheadHandler} onMouseEnter={() => handleMouseEnter(2)} >
              <span data-target='media_section'>Media</span>
              </li>
              <li  onClick={jumpAheadHandler} onMouseEnter={() => handleMouseEnter(3)} >
              <span data-target='films_section'>Films</span>
              </li>
              <li  onClick={jumpAheadHandler} onMouseEnter={() => handleMouseEnter(4)} >
              <span data-target='shinyThings_section'>Shiny Things</span>
              </li>
            </ul>
          </div>
        </section>
        <section className={ `${classes.titleSection}` } >
          <h1>
            What we do?
          </h1>
          <h5 className='mb-0 fw-light' >
            We solve problems, by understanding them first and annihilating them later. We mix media, blend strats and leverage tech to arrive at the exact solution for that specific problem. No off-the-shelf services for you.
          </h5>
        </section>
      </div>
      <section id='social_media_section' className={ `${classes.serviceSection} ${classes.firstChild}` } >
        <div className='sectionHead pb-5' >
          <div className={ `${classes.imgLeft}` } >
            <DotLottieReact
              loop
              autoplay
              src={socialGIF}
            />
          </div>
          <span>We make (digital)</span>
          <h2 className={ `${classes.serviceSectionTitle} pb-0` } > 
          Social Media
          </h2>
          <p className='mb-0' >
          Armed with phones and bursting with vibes, our social media squad ventures out into the world, seeking the next big trend or making a new one for themselves. A new viral? We&#8217;re right there. A new platform? We&#8217;re on it. From influencer collabs to interactive campaigns, we&#8217;ll go that extra mile to keep things fresh.
          </p>
        </div>
        <div className={`${classes.servicesWorkList}`} >
          <div className={`${classes.worklist}`}>
            <WorksListAlt filter_by_cat='Social' />
          </div>
        </div>
      </section>
      <section id='technology_section' className={ `${classes.serviceSection}` } >
        <div className='sectionHead pb-5' >
          <div className={ `${classes.imgLeft}` } >
            <DotLottieReact
              loop
              autoplay
              src={techGIF}
            />
          </div>
          <span>We make (digital)</span>
          <h2 className={ `${classes.serviceSectionTitle} pb-0` } > 
          Technology
          </h2>
          <p className='mb-0' >
          Though it&#8217;s something exactly a bot would say, our tech team says they are humans. And they love weaving their tech prowess into the storytelling process. Personalizing experiences for consumers, gaining engagement, and achieving results - all while being the invisible behind-the-scenes magicians.
          </p>
        </div>
        <div className={`${classes.servicesWorkList}`} >
          
          <div className={`${classes.worklist}`}>
          <WorksListAlt filter_by_cat='Technology' />
          </div>
        </div>
      </section>
      <section id='digital_activation_section' className={ `${classes.serviceSection}` } >
        <div className='sectionHead pb-5' >
          <div className={ `${classes.imgLeft}` } >
            <DotLottieReact
              loop
              autoplay
              src={digiGIF}
            />
          </div>
          <span>We make</span>
          <h2 className={ `${classes.serviceSectionTitle} pb-0` } > 
          Digital Activations
          </h2>
          <p className='mb-0' >
          Because every campaign needs a hype-man. Driven by data and inspired by innovation, this team takes the creative ball and rolls with it till its logical end. Turning thoughts into clicks and converting campaigns into tangible results
          </p>
        </div>
        <div className={`${classes.servicesWorkList}`} >
          
          <div className={`${classes.worklist}`}>
          <WorksListAlt filter_by_cat='Digital Activation' />
          </div>
        </div>
      </section>
      <section id='im-market_section' className={ `${classes.serviceSection}` } >
        <div className='sectionHead pb-5' >
          <div className={ `${classes.imgLeft}` } >
            <DotLottieReact
              loop
              autoplay
              src={marketGIF}
            />
          </div>
          <span>We make</span>
          <h2 className={ `${classes.serviceSectionTitle} pb-0` } > 
          In-Market Experiences
          </h2>
          <p className='mb-0' >
          There are campaigns that reside in presentations all their lives. It takes a certain kind of go-getting to manifest them in the real world. A sort of bridge between the digital realm and the touch-and-feel of physical experiences. We have these doers on speed-dial, who can craft immersive activations at places where it matters - the point of sale.
          </p>
        </div>
        <div className={`${classes.servicesWorkList}`} >
          
          <div className={`${classes.worklist}`}>
          <WorksListAlt filter_by_cat='In-Market' />
          </div>
        </div>
      </section>
      <section id='media_section' className={ `${classes.serviceSection}` } >
        <div className='sectionHead pb-5' >
          <div className={ `${classes.imgLeft}` } >
            <DotLottieReact
              loop
              autoplay
              src={mediaGIF}
            />
          </div>
          <span>We make</span>
          <h2 className={ `${classes.serviceSectionTitle} pb-0` } > 
          Media
          </h2>
          <p className='mb-0' >
          Our number-crunching, channel-mixing team ensures the message is delivered to the intended eyes at the right place at the right time. Clever placement and contextual messaging are second nature to them. Be it boosting sales or improving footfalls, their specialization in performance marketing is sure to get you results.
          </p>
        </div>
        <div className={`${classes.servicesWorkList}`} >
          
          <div className={`${classes.worklist}`}>
          <WorksListAlt filter_by_cat='Media' />
          </div>
        </div>
      </section>
      <section id='films_section' className={ `${classes.serviceSection}` } >
        <div className='sectionHead pb-5' >
          <div className={ `${classes.imgLeft}` } >
            <DotLottieReact
              loop
              autoplay
              src={filmGIF}
            />
          </div>
          <span>We make</span>
          <h2 className={ `${classes.serviceSectionTitle} pb-0` } > 
          Films
          </h2>
          <p className='mb-0' >
          Our film making department straddles the entire spectrum - from guerrilla tactics at shoestring budgets to longform stories of epic scales. The scripts are crafted in a way where limited budgets are never a constraint, and neither is attention-deficit audience. From writing to production to post, we have control over the cinematic chain to ensure films that are effective, and more importantly, entertaining.
          </p>
        </div>
        <div className={`${classes.servicesWorkList}`} >
          
          <div className={`${classes.worklist}`}>
          <WorksListAlt filter_by_cat='Films' />
          </div>
        </div>
      </section>
      <section id='shinyThings_section' className={ `${classes.serviceSection}` } >
        <div className='sectionHead pb-0' >
          <span>We earned</span>
          <h2 className={ ` pb-0` } > 
          Appreciation
          </h2>
          <p className='mb-0' >
          We're supposed to say we're humbled, but we're actually proud when we win awards. They're not a perfect measure of creativity (it's about happy users, not happy judges) but they're a sign we're doing something right.
          </p>
          <div className={`${classes.awardsWrap}`}>
            <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
            {
              awards.map( (work, index) => {
                return (
                  <div key={`awards#${index}`} className={`${classes.awardsItem}`}>
                    <h5>
                      {work.title}
                    </h5>
                    <h4>
                      {work.rank}
                    </h4>
                  </div>
                )
              })
            }
            </Masonry>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services