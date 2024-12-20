import React, { useEffect, useRef } from 'react'
import classes from './about.module.css'
import TabItems from '../../Components/TabItems'
import Masonry from 'react-masonry-css';
import SingleWorkThumb from '../../Components/SingleWorkThumb';
import { Link } from 'react-router-dom';

import team1 from '../../assets/NicholasSequeira.jpg'
import team2 from '../../assets/ShynilHashim.png'
import team3 from '../../assets/JinalGhadia.png'
import team4 from '../../assets/TahmeenaShaikh.jpg'
import siteLogo from '../../assets/amber_logo.svg'

import tabImage01 from '../../assets/code_of_honor/01.png'
import tabImage02 from '../../assets/code_of_honor/02.png'
import tabImage03 from '../../assets/code_of_honor/03.png'
import tabImage04 from '../../assets/code_of_honor/04.png'
import tabImage05 from '../../assets/code_of_honor/05.png'
import tabImage06 from '../../assets/code_of_honor/06.png'
import { useState } from 'react';

const About = () => {

  const tabItems = [
    {
      count: '01',
      title: 'Appreciate',
      para: "Never shy away from appreciating good work. Acknowledging good quality and expressing our admiration for it only helps us learn it for ourselves.",
      image: tabImage01
    },
    {
      count: '02',
      title: 'Complement',
      para: "Different folks are good at different things. Magic happens when these diverse skills support each other to move towards a common goal.",
      image: tabImage02
    },
    {
      count: '03',
      title: 'Converse',
      para: "Surprise, surprise. In the business of communication, communicating is key. Conversations sparks ideas. Ideas ignite change. Actually, we urge our team to err on the higher side. Over communicate. It eliminates misunderstanding and traps missed opportunities.",
      image: tabImage03
    },
    {
      count: '04',
      title: 'Dissect',
      para: "No problem is unsolvable. All it needs is a deep diving experience, where we deconstruct each element threadbare. Only when fully understood, we will gear up to take its BS by the horn.",
      image: tabImage04
    },
    {
      count: '05',
      title: 'Democratize',
      para: "Good ideas have no reliable sources, they can come from anywhere. So we keep our eyes, ears and minds open while the entire Amber Collective chips in with thoughts.",
      image: tabImage05
    },
    {
      count: '06',
      title: 'Many > Man',
      para: "Plural makes it better. While everyone in the Collective brings individual strengths to the table, the table stands on legs of fellowship.",
      image: tabImage06
    }
  ]

  const teamMembers = [
    {
      id : 1,
      name : 'Nicholas Sequeira',
      image : team1,
      location : 'New York'
    },
    {
      id : 1,
      name : 'Shynil Hashim',
      image : team2,
      location : 'New York'
    },
    {
      id : 1,
      name : 'Jinal Ghadia',
      image : team3,
      location : 'New York'
    },
    {
      id : 1,
      name : 'Tahmeena Shaikh',
      image : team4,
      location : 'New York'
    }
  ]

  const jumpAheadHandler = (target) => {
    console.log(target )
    document.getElementById( target ).scrollIntoView({
      behavior: "smooth"
    })
  }

  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    550: 1
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
      <div className={ `${classes.aboutWrap}` } >
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
              <li ref={filterItem} onClick={() => jumpAheadHandler('contact_section')} onMouseEnter={() => handleMouseEnter(0)} >
                <span>Contact</span>
              </li>
              <li  onClick={() => jumpAheadHandler('codeOfHonor_section')} onMouseEnter={() => handleMouseEnter(1)} >
                <span>Our code</span>
              </li>
            </ul>
          </div>
        </section>
        <section className={ `${classes.aboutSection}` } >
          <h1>
          We are this
          </h1>
          <h5 className='mb-0 fw-light' >
          A bunch of like-minded adventurers, out here to rummage ideas that solve marketing problems. We make creativity do all the hard work, while hierarchies take a nap in the &#8216;useless&#8217; corner. We do great work that gets greater results, thanks to a team that isn&#8217;t afraid to ask &#8216;What Ifs&#8217;. For instance, they&#8217;re asking what if we stop talking about us now.
          </h5>
        </section>
      </div>
      <section id='codeOfHonor_section' className={ `${classes.honorWrap}` } >
        <div className='sectionHead' >
          <span>Yes, we have a Code of Honor</span>
          <h2>
          A Collective Effort
          </h2>
          <p>
          We are in this together. Whether cozing up at the office or legs-up at home, the Amber Collective is always on the same page. Syncing thoughts, matching wavelengths, and sharing notes, so that the end results is a perfect harmony. This is how we do it.
          </p>
        </div>
        <div className={ `${classes.honorTabs}` } >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {
              tabItems.map( (item, index) => {
                return (
                  <TabItems 
                    key={ `honorTabItem${index}` } 
                    index={item.count}
                    title={item.title}  
                    para={item.para}
                    image={item.image}
                  />
                )
              } )
            }
          </Masonry>
        </div>
      </section>
      <section id='team_section' className={ `${classes.teamWrap} d-none` } >
        <div className='sectionHead' >
          <span>We are</span>
          <h2>
          Many &gt; Man
          </h2>
          <p>
          Plural makes it better. While everyone in the Collective brings individual
          strengths to the table, the table stands on legs of fellowship.
          </p>
        </div>
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {
              teamMembers.map( (member, index) => {
                return (
                  <div key={`${member.name}${index}`} className={`${classes.memberWrap}`} >
                    <SingleWorkThumb orientation='h' imageLink={ [member.image] } videoLink={[]} onAssetLoaded={() => 1 } />
                    <h3>{member.name}</h3>
                  </div>
                )
              } )
            }
          </Masonry>
      </section>
    </div>
  )
}

export default About