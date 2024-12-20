import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import classes from './singleWork.module.css'
import { useSelector } from 'react-redux'
import siteLogo from '../../../assets/amber_logo_white.svg'

function SingleWork() {

    const loadStylesheets = (id) => {
        const now = new Date();
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        //link.href = `https://ambercomm.ae/backend/wp-content/uploads/elementor/css/post-${id}.css?v=${now}`;
        link.href = `https://wordpress.viralfever.in/wp-content/uploads/elementor/css/post-${id}.css?v=${now}`;
        document.head.appendChild(link);
    }

    const [ work, setWork ] = useState( null )
    const [ styleLoaded, setStyleLoaded ] = useState( false )

    const { slug } = useParams()
    const works = useSelector( state => state.works.items )
    const status = useSelector( state => state.works.status )

    let videoContainers = null
    
    useEffect( () => {
        if (status === 'succeeded') {
            setWork( works.find( w => w.slug === slug ) )
        }
    }, [status] )

    useEffect( () => {
        if( work ) {
            loadStylesheets(work.id);
            setTimeout(() => {
                setStyleLoaded(true)
                window.scrollTo(0, 0);
            }, 2000)
        }
    }, [work] )

    useEffect( () => {
        if( styleLoaded ) {
            videoContainers = document.querySelectorAll('.amberVideoWrap')
            videoContainers?.forEach( vc => {

                if( vc.querySelector('video') ) {
                    const v = vc.querySelector('video')
                    const i = vc.querySelector('.elementor-custom-embed-image-overlay')
                    vc.addEventListener( 'mouseenter', () => {
                        i.style.display = 'none'
                        v.play()
                    } )
                    vc.addEventListener( 'mouseleave', () => {
                        i.style.display = 'block'
                        v.pause()
                        v.currentTime = 0
                    } )
                } else {
                    const v = vc.querySelector('iframe')
                    const i = vc.querySelector('.elementor-custom-embed-image-overlay')
                    const vc_player = new Vimeo.Player(v);
                    vc.addEventListener( 'mouseenter', () => {
                        i.style.display = 'none'
                        vc_player.play()
                    } )
                    vc.addEventListener( 'mouseleave', () => {
                        i.style.display = 'block'
                        vc_player.pause()
                        vc_player.setCurrentTime(0)
                    } )
                }
                
            } )
        }
        return () => {
            videoContainers?.forEach( vc => {
                vc.removeEventListener( 'mouseover', null )
                vc.removeEventListener( 'mouseleave', null )
            } )
        }
    }, [styleLoaded])

    return (
        <div className={ `${classes.workPageContent}` } style={{background: work?.acf.brand_color}} >
            <section className={`${classes.pageHeader}`} >
                <Link to='/' >
                <img src={siteLogo} className='siteLogo' />
                </Link>
            </section>
            { styleLoaded && <div id='workContent' className={ styleLoaded ? `${classes.workPageContent} ${classes.loaded}` : `${classes.workPageContent}` } dangerouslySetInnerHTML={{ __html: work.content.rendered }} /> }
        </div>
    )

}

export default SingleWork