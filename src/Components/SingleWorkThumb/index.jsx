import React, { useEffect, useRef, useState } from 'react'
import classes from './singleWorkThumb.module.css'

function SingleWorkThumb( props ) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [ showVideo, setShowVideo ] = useState( false )
  const imgRef = useRef()
  const videoRef = useRef()

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  })

  return (
    <>
        <div 
          className={ props.orientation === 'h' ? `${classes.workPlaceholder} ${classes.h}` : `${classes.workPlaceholder} ${classes.v}` }
          onMouseOver={() => setShowVideo( true ) } 
          onMouseLeave={() => { 
            setShowVideo( false )
            setIsLoaded(false)
           } } 
        >
            {
              ( !showVideo || !isLoaded ) && (
                <div className={`${classes.featured}`} style={ { backgroundImage: `url(${ props.orientation === 'h' ? props.imageLink[0] : props.imageLink[1] })` } } >
                  <img ref={imgRef} src={ props.orientation === 'h' ? props.imageLink[0] : props.imageLink[1] } alt='featured-image'  />
                </div>
              )
            }
            <div className={`${classes.featuredPlaceholder} imgPlaceholder`} />
            {
                showVideo && ( props.orientation === 'h' ? props.videoLink[0] : props.videoLink[1] ) && (
                    <video ref={videoRef} muted autoPlay loop poster={props.imgName}>
                        <source src={ props.orientation === 'h' ? props.videoLink[0] : props.videoLink[1] } type="video/mp4" />
                    </video> 
                )
            }
        </div>
    </>
  )
}

export default SingleWorkThumb
