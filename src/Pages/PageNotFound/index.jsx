import React from 'react'
import classes from './pageNotFound.module.css'
import contactGIF from '../../assets/contact.gif'
import siteLogo from '../../assets/amber_logo.svg'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='innerPage' >
      <div className={ `${classes.serviceWrap}` } >
        <section className='pageHeader pb-5' >
          <Link to='/' >
            <img src={siteLogo} className='siteLogo' />
          </Link>
        </section>
        <section className={ `${classes.pnf_content} d-flex flex-column align-items-center` } >
          <img src={contactGIF} />
          <h2>Oops!</h2>
          <h4>Looks like you're lost in our creative space.</h4>
          <Link to='/' className={`btn mt-4 ${classes.backBtn}`} >Return to Safety</Link>
        </section>
      </div>
    </div>
  )
}

export default PageNotFound