import React from 'react'
import { Link } from 'react-router-dom'
import classes from './stories.module.css'
import siteLogo from '../../assets/amber_logo.svg'

function Stories() {

    const stories = [
        {
            title: '16 Ideas for AI-powered E-Commerce With Our Friends at Burrow',
            slug: '16-ideas-for-ai-powered-e-commerce-with-our-friends-at-burrow',
            category: 'Artificial Intelligence',
            date: '1st of February, 2024',
            readingTime: '15 min read'
        },
        {
            title: 'The web can do what?! with Google',
            slug: 'the-web-can-do-what-with-Google',
            category: 'Website',
            date: '16th of November, 2023',
            readingTime: '15 min read'
        },
        {
            title: 'Why eating together is important (and delicious)',
            slug: 'why-eating-together-is-important-and-delicious',
            category: 'Culture',
            date: '18th February 2016',
            readingTime: '15 min read'
        }
    ]

  return (
    <div className='innerPage' >
      <div className={ `${classes.worksWrap}` } >
        <section className='pageHeader pb-0' >
          <Link to='/' >
          <img src={siteLogo} className='siteLogo' />
          </Link>
        </section>
      </div>
      <section className={`${classes.storiesList} pt-5 mt-5`} >
        {
            stories.map( (s, index) => {
                return (
                    <div key={`story${index}`} className={`${classes.storyItem}`} >
                      <Link to={`/stories/${s.slug}`} >
                            <ul className='m-0 p-0 list-unstyled' >
                                <li className='d-inline-block' >
                                    {s.category}
                                </li>
                                <li className='d-inline-block' >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24">
                                    <g id="Layer_2" data-name="Layer 2">
                                      <g id="Layer_1-2" data-name="Layer 1">
                                        <path d="M13.72,1.77a.53.53,0,0,0-.12-.14l-.12-.09a4.17,4.17,0,0,0-2.37-1A4.08,4.08,0,0,0,7.74,1.86,4.11,4.11,0,0,0,6.56,4.68s0,0,0,0a.81.81,0,0,0,0,.16,4.34,4.34,0,0,0,4.29,4.24,4.29,4.29,0,0,0,2.87-7.34ZM7.59,5.64a6.86,6.86,0,0,0,5.75-2.5,3.42,3.42,0,0,1,.79,1.73C14.08,9,8.5,9.27,7.59,5.64Z"></path>
                                        <path d="M4.84,3.44a1.69,1.69,0,0,0,1.59-1.7A1.72,1.72,0,0,0,4.85,0,1.67,1.67,0,0,0,3.13,1.61s0,.06,0,.09,0,0,0,.07A1.73,1.73,0,0,0,4.84,3.44Z"></path>
                                        <path d="M22,13.25a2.54,2.54,0,0,0-1.83-2.33.66.66,0,0,0,0-.21V6.6c0-.35-.45-.81-.81-.59l-8.57,5.25a.29.29,0,0,0-.1,0l-8-5c-.49-.3-.84.28-.84.68l0,3.94A2.47,2.47,0,0,0,0,13.19s0,0,0,0a.86.86,0,0,0,0,.16,2.54,2.54,0,0,0,1.77,2.31A4.22,4.22,0,0,0,2,18.26a9.17,9.17,0,0,0,2.24,1.45l6.5,4.19a.43.43,0,0,0,.61-.06l6.32-4.08a8.58,8.58,0,0,0,2.19-1.52,4,4,0,0,0,.35-2.56A2.46,2.46,0,0,0,22,13.44v0A.81.81,0,0,0,22,13.25ZM.88,13.34c.23-1.75,3-2,3-.07S1.09,15.15.88,13.34ZM18.77,18a14.05,14.05,0,0,1-2.71,1.84c-1.73,1.11-3.31,2-5,3.11-1.87-1.2-4.27-2.89-6.14-4.09-.4-.26-1.65-.55-1.92-1.35,0-.23,0-.8,0-.86v-1a2.48,2.48,0,0,0,1.8-2.37A2.51,2.51,0,0,0,3,10.93c0-1-.15-2.33-.15-3.28a28.31,28.31,0,0,1,7.36,4.86c.07,2.49.14,7.43.21,9.93,0,.87,1.23,1.61,1.21.75-.07-2.46-.16-8.23-.23-10.69l.07-.07c2.52-1.54,5.09-3.66,7.61-5.2,0,1-.05,2.59-.05,3.6,0,0,0,.05,0,.08a2.47,2.47,0,0,0-1.81,2.37A2.5,2.5,0,0,0,19,15.7,4.6,4.6,0,0,1,18.77,18ZM18,13.35c0-1.89,2.92-1.88,3.14-.07C20.94,15,18.07,15.27,18,13.35Z"></path>
                                      </g>
                                    </g>
                                  </svg>
                                  {s.readingTime}
                                </li>
                            </ul>
                            <h2>
                                {s.title}
                            </h2>
                            <p className='m-0' >
                                read more
                            </p>
                      </Link>
                    </div>
                )
            } )
        }
      </section>
    </div>
  )
}

export default Stories