import React, { useEffect, useRef } from 'react'
import classes from './bannerVideo.module.css'
import { gsap, ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger);

function BannerVideo() {

    const target_videoWrap = useRef()
    const target_video = useRef()
    const target_shape = useRef()
    const target_intro = useRef()
    const video_1 = 'https://www.dropbox.com/scl/fi/qejf5dgqiv6m77d71r2ec/abstract-background-ink-water-20072.mp4?rlkey=zwgwzw4bfhx7oy034t7un6mod&raw=1'
    const video_2 = 'https://assets.codepen.io/39255/output_960.mp4'
    const video_3 = 'https://viralfever.in/amber_videos/updated/Home_Updated.mp4'
    const video_4 = 'https://viralfever.in/amber_videos/updated/home_video_bitrate_reduced.mp4'
    const video_5 = 'https://viralfever.in/amber_videos/updated/home_video_bitrate_dimension_reduced.mp4'
    const video_6 = 'https://viralfever.in/amber_videos/updated/Home_Updated_V4_Keyframe1.25FPS.mp4'
    const video_7 = 'https://viralfever.in/amber_videos/updated/Home_Updated_V4_Keyframe1.30FPS.mp4'
    const video_8 = 'https://viralfever.in/amber_videos/updated/Home_Updated_V4_Keyframe1.15FPS.CBR.mp4'

    useEffect( () => {

        const videoWrap = target_videoWrap.current
        const video = target_video.current
        
        console.log( video )

        const handleMetadataLoad = () => {

            const bannerTimeline = gsap.timeline( {
                scrollTrigger: {
                    trigger: videoWrap,
                    scrub: 0.75,
                    pin: true,
                    start: 'top top',
                    end: '+=500%',
                    pinSpacing: true,
                    ease: 'none'
                }
            } )
            
            bannerTimeline.to( video , {
                currentTime: video.duration,
                duration: 0.5,
                ease: "linear",
            })

        }

        video.addEventListener('loadedmetadata', handleMetadataLoad);

        return () => {
            video.removeEventListener('loadedmetadata', handleMetadataLoad);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }

    }, [] )


    return (

        <div ref={target_videoWrap} className={ `${ classes.bannerVideoWrap }` } >

            <video ref={target_video} id='homeBanner_video'
                playsInline muted
                src={video_8}
                type="video/mp4" >
            </video> 

            <div id='homeBanner_intro'>
                <svg ref={target_shape} 
                    viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M40.4,-70C49.7,-64.6,52.8,-48.4,61,-34.9C69.3,-21.5,82.7,-10.7,87.7,2.9C92.6,16.4,89,32.9,80,45C70.9,57,56.4,64.7,42.1,68C27.9,71.3,13.9,70.2,-0.8,71.5C-15.5,72.8,-30.9,76.6,-40.1,70.4C-49.3,64.1,-52.1,48,-60.3,34.6C-68.4,21.2,-81.8,10.6,-81.9,0C-82,-10.7,-68.7,-21.4,-60.7,-35C-52.7,-48.6,-50,-65.2,-40.7,-70.6C-31.4,-76.1,-15.7,-70.4,-0.1,-70.3C15.5,-70.1,31.1,-75.4,40.4,-70Z" transform="translate(100 100)" />
                </svg>
                <h2 ref={target_intro} className={ `m-0 p-0 fw-semibold` } >
                    <span>Nothing is by chance. Everything we do comes from the fact that we have done it before. From planning to strategising to creating to implementing, whatever we bring is a tested, collaborative and result-oriented solution. And there's no two ways about it!</span>
                </h2>
            </div>

        </div>

    )
}

export default BannerVideo