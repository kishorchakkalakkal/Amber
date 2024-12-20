import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import classes from './works.module.css'
import WorksList from '../../Components/WorksList'
import siteLogo from '../../assets/amber_logo.svg'
import { current } from '@reduxjs/toolkit'

function Works() {

  const [searchParams] = useSearchParams()
  const filterByDefault = searchParams.get('tag') ? searchParams.get('tag') : 'all'

  const [ filterBy, setFilterBy ] = useState(filterByDefault)

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
      <div className={ `${classes.worksWrap}` } >
        <section className='pageHeader pb-0' >
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
              <li ref={filterItem} data-target='products_section' onClick={() => setFilterBy('Social')} onMouseEnter={() => handleMouseEnter(0)} >
              <span>Social Media</span>
              </li>
              <li data-target='experience_section' onClick={() => setFilterBy('Digital Activation')} onMouseEnter={() => handleMouseEnter(1)} >
              <span>Digital Activation</span>
              </li>
              <li data-target='branding_section' onClick={() => setFilterBy('Media')} onMouseEnter={() => handleMouseEnter(2)} >
              <span>Media</span>
              </li>
              <li data-target='branding_section' onClick={() => setFilterBy('Films')} onMouseEnter={() => handleMouseEnter(3)} >
              <span>Films</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <WorksList filter_by_cat={filterBy} showAllBtn={false} />
    </div>
  )
}

export default Works
