import React from 'react'
import { Link } from 'react-router-dom'
import classes from './singlestory.module.css'
import videoPlaceholder from '../../../assets/storyPlaceholder.png'
import videoPlaceholder2 from '../../../assets/storyPlaceholder-2.png'
import siteLogo from '../../../assets/amber_logo.svg'

function SingleStory() {

  return (
    <div className='innerPage' >
      <div className={ `${classes.worksWrap}` } >
        <section className={ `${classes.pageHeader}` }>
          <Link to='/' >
          <img src={siteLogo} className='siteLogo' />
          </Link>
          <ul className={ `m-0 p-0 list-unstyled ${classes.storyMeta}` }>
            <li>
              <h6>
                Category
              </h6>
              <h5>
                Artificial Intelligence
              </h5>
            </li>
            <li>
              <h6>
              Date
              </h6>
              <h5>
              1st of February, 2024
              </h5>
            </li>
          </ul>
          <h1 className={ `m-0 p-0 ${classes.storyHeader}`} >
          16 Ideas for AI-powered E-Commerce With Our Friends at Burrow
          </h1>
        </section>
      </div>
      <img src={videoPlaceholder} className='w-100' alt='storyImage' />
      <section className={`${classes.storyContent}`} >
        <div className={`${classes.storyContent_inner}`} >
          <h6>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M13.72,1.77a.53.53,0,0,0-.12-.14l-.12-.09a4.17,4.17,0,0,0-2.37-1A4.08,4.08,0,0,0,7.74,1.86,4.11,4.11,0,0,0,6.56,4.68s0,0,0,0a.81.81,0,0,0,0,.16,4.34,4.34,0,0,0,4.29,4.24,4.29,4.29,0,0,0,2.87-7.34ZM7.59,5.64a6.86,6.86,0,0,0,5.75-2.5,3.42,3.42,0,0,1,.79,1.73C14.08,9,8.5,9.27,7.59,5.64Z"></path>
                  <path d="M4.84,3.44a1.69,1.69,0,0,0,1.59-1.7A1.72,1.72,0,0,0,4.85,0,1.67,1.67,0,0,0,3.13,1.61s0,.06,0,.09,0,0,0,.07A1.73,1.73,0,0,0,4.84,3.44Z"></path>
                  <path d="M22,13.25a2.54,2.54,0,0,0-1.83-2.33.66.66,0,0,0,0-.21V6.6c0-.35-.45-.81-.81-.59l-8.57,5.25a.29.29,0,0,0-.1,0l-8-5c-.49-.3-.84.28-.84.68l0,3.94A2.47,2.47,0,0,0,0,13.19s0,0,0,0a.86.86,0,0,0,0,.16,2.54,2.54,0,0,0,1.77,2.31A4.22,4.22,0,0,0,2,18.26a9.17,9.17,0,0,0,2.24,1.45l6.5,4.19a.43.43,0,0,0,.61-.06l6.32-4.08a8.58,8.58,0,0,0,2.19-1.52,4,4,0,0,0,.35-2.56A2.46,2.46,0,0,0,22,13.44v0A.81.81,0,0,0,22,13.25ZM.88,13.34c.23-1.75,3-2,3-.07S1.09,15.15.88,13.34ZM18.77,18a14.05,14.05,0,0,1-2.71,1.84c-1.73,1.11-3.31,2-5,3.11-1.87-1.2-4.27-2.89-6.14-4.09-.4-.26-1.65-.55-1.92-1.35,0-.23,0-.8,0-.86v-1a2.48,2.48,0,0,0,1.8-2.37A2.51,2.51,0,0,0,3,10.93c0-1-.15-2.33-.15-3.28a28.31,28.31,0,0,1,7.36,4.86c.07,2.49.14,7.43.21,9.93,0,.87,1.23,1.61,1.21.75-.07-2.46-.16-8.23-.23-10.69l.07-.07c2.52-1.54,5.09-3.66,7.61-5.2,0,1-.05,2.59-.05,3.6,0,0,0,.05,0,.08a2.47,2.47,0,0,0-1.81,2.37A2.5,2.5,0,0,0,19,15.7,4.6,4.6,0,0,1,18.77,18ZM18,13.35c0-1.89,2.92-1.88,3.14-.07C20.94,15,18.07,15.27,18,13.35Z"></path>
                </g>
              </g>
            </svg>
            15 min. read
          </h6>
          <h3 className={`${classes.storyContent_intro}`} >
          Have you ever wondered, "How might generative AI revolutionize E-commerce?" Well, that's exactly the brain-tickling question we explored during our collaboration with the US-based furniture startup, Burrow. In this blog post, we're diving into a range of concepts, from immediately achievable ideas to future-forward dreams, all to give you a sneak peek into the potential transformations ahead in the world of commerce.
          </h3>
          <div className={`${classes.storyContent_indent}`}>
            <p>
            Generative AI is everywhere these days. But what is generative AI, really? We like to frame it as "Something that didn’t exist until a user expressed intent towards it". Generative AI is what powers tools like ChatGPT, Gemini, Midjourney, and others. These tools all rely on large language models, which have rapidly improved in quality over the past months.?<br/><br/>
            And while tech giants are in a sprint to develop AI assistants that can do just about anything, our focus here is on Burrow’s specific business and user experience opportunities. We're excited about the possibilities generative AI brings and how it might help even out the playing field, giving smaller players the chance to compete with the giants.<br/><br/>
            When collaborating with a brand like Burrow, our goal is to ensure that the generative AI serves the specific needs of this business. That's why the ideas below are all based on the concept of what we are calling a Brand Language Model…
            </p>
            <img src='https://images.ctfassets.net/9uhkiji6mhey/3QPDv7LXOsHYmBZphDY3UR/db2a5d9fee4392e19e2f069e6f76d69a/llm_vs_brand.jpg?q=85' alt='image' className='w-100' />
            <p className={`${classes.storyContent_caption}`} >
            These specialized brand models take all the cool stuff the big models can do and tailor them with specific guardrails and training to meet the needs of a particular brand and business.
            </p>
            <h5 className={`${classes.storyContent_subHead}`} >
            What if...
            </h5>
            <p>
            When working on innovation projects like this, we often find ourselves asking 'What if' or 'How might we…?' These questions broaden our minds to new ideas. Below, you'll find the questions - and answers - that sparked our interest. We hope you find them intriguing too!<br/><br/>
            <i>(By the way, we're not just daydreaming here; As part of a cross DEPT® initiative, we're working with our AI Greenhouse team to make some of these concepts a reality)</i>
            </p>
          </div>
          <img src={videoPlaceholder2} className='w-100' alt='storyImage' />
          <div className={`${classes.storyContent_indent}`}>
          <h5 className={`${classes.storyContent_subHead}`} >
          What if you could access the AI assistant from multiple points in the customer journey?
            </h5>
            <p>
            It should always be easy to start using AI assistant tools. Here we offer suggestions on what AI can help you with, or you can begin with a custom prompt. This approach mixes traditional search with AI-powered features.
            </p>
            <img src='https://images.ctfassets.net/9uhkiji6mhey/1awWfwC5D8oX7ZoyODJbNR/0b57032fc41e3c8cce5863dba27401a3/entrypoints.jpg?q=85' alt='image' className='w-100' />
            <p className={`${classes.storyContent_caption}`} >
            We could enhance the search dropdown, possibly within a larger menu, to support freeform searches and provide starting points for AI use. Chips or cards in product categories could highlight AI features, guiding users in adapting to these new tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SingleStory