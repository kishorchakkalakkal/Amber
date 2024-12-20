import { useEffect, useRef, useState } from 'react'
import classes from './tabItems.module.css'
import gsap from 'gsap'

const TabItems = ( props ) => {

    const tabItem = useRef()
    const tabImage = useRef()
    const tabPara = useRef()
    const [ tabOpenStatus, setTabOpenStatus ] = useState( false )

    const tabOpen_timeline = useRef( gsap.timeline({
        ease: "linear",
        duration: 0.05,
        paused: true,
        delay: 0
    }) )

    const tabClickHandler = () => {
        !tabOpenStatus ? tabOpen_timeline.current.play() : tabOpen_timeline.current.reverse()
        setTabOpenStatus( prev => !prev )
    }

    useEffect( () => {
        tabOpen_timeline.current.to( tabImage.current, {
            height: 'auto',
            ease: 'linear'
        }).to( tabPara.current, {
            height: 'auto',
            ease: 'linear'
        }, '<' ).to( tabPara.current.children[0], {
            opacity: '1',
            x: 0,
            ease: 'linear'
        }, '<0.1' )
    }, [])
    
    return (
        <div ref={tabItem} className={ `${classes.honorTabsItem}` } onClick={tabClickHandler} >
            <div className={`${classes.honorTabHeader}`} >
                <h6>
                    {props.index}
                </h6>
            </div>
            <div ref={tabImage} className={`${classes.honorTabImage}`} >
                <img src={props.image} className='img-fluid' alt={props.title} />
            </div>
            <h3 className={`${classes.honorTabTitle}`} >
                {props.title}
            </h3>
            <div ref={tabPara} className={`${classes.honorTabPara}`} >
                <p className='m-0' >
                    {props.para}
                </p>
            </div>
        </div>
    )

}

export default TabItems