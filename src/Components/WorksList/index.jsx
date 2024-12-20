import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'

import SingleWorkThumb from '../SingleWorkThumb'
import classes from './workslist.module.css'

import paper from 'paper/dist/paper-core'
import { useSelector } from 'react-redux'

const WorksList = React.memo( ( { filter_by_cat, showAllBtn } ) => {

    const [ workList, setWorkList ] = useState([])

    const works = useSelector( state => state.works.items )
    const status = useSelector( state => state.works.status )

    const containerRef = useRef(null)
    const canvasRef = useRef(null)

    const breakpointColumnsObj = {
        default: 3,
        700: 2
    }

    let container, containerRect, canvas, ctx
    let maskPaths = [], outerSegmentPositions = [], innerSegmentPositions = []

    const parentClass = classes.ProjectsList

    const maskOffset = 2;

    useEffect( () => {

        container = containerRef.current;
        canvas = canvasRef.current;

        containerRect = container.getBoundingClientRect();
        ctx = canvas.getContext('2d');

        paper.setup(canvas)

        let mousePos = new paper.Point( 0, 0 ), mouseX = 0, mouseY = 0

        const boundary = window.innerWidth * 0.1

        const getInnerSegmentPositions = ( x, y, w, h ) => {

            const horizontalSegmentWidth = w / 4
            let verticalSegmentWidth
            let segments = []
        
            if( h > w ) {
                verticalSegmentWidth = h / 5
                segments = [
                    [ x, y ],
                    [ x + ( horizontalSegmentWidth * 1 ), y ],
                    [ x + ( horizontalSegmentWidth * 2 ), y ],
                    [ x + ( horizontalSegmentWidth * 3 ), y ],
                    [ x + w, y ],
                    [ x + w, y + ( verticalSegmentWidth * 1 ) ],
                    [ x + w, y + ( verticalSegmentWidth * 2 ) ],
                    [ x + w, y + ( verticalSegmentWidth * 3 ) ],
                    [ x + w, y + ( verticalSegmentWidth * 4 ) ],
                    [ x + w, y +h ],
                    [ x + ( horizontalSegmentWidth * 3 ), y + h ],
                    [ x + ( horizontalSegmentWidth * 2 ), y + h ],
                    [ x + ( horizontalSegmentWidth * 1 ), y + h ],
                    [ x, y + h ],
                    [ x, y + ( verticalSegmentWidth * 4 ) ],
                    [ x, y + ( verticalSegmentWidth * 3 ) ],
                    [ x, y + ( verticalSegmentWidth * 2 ) ],
                    [ x, y + ( verticalSegmentWidth * 1 ) ]
                ]
            } else {
                verticalSegmentWidth = h / 2
                segments = [
                    [ x, y ],
                    [ x + ( horizontalSegmentWidth * 1 ), y ],
                    [ x + ( horizontalSegmentWidth * 2 ), y ],
                    [ x + ( horizontalSegmentWidth * 3 ), y ],
                    [ x + w, y ],
                    [ x + w, y + ( verticalSegmentWidth * 1 ) ],
                    [ x + w, y + h ],
                    [ x + ( horizontalSegmentWidth * 3 ), y + h ],
                    [ x + ( horizontalSegmentWidth * 2 ), y + h ],
                    [ x + ( horizontalSegmentWidth * 1 ), y + h ],
                    [ x, y + h ],
                    [ x, y + ( verticalSegmentWidth * 1 ) ]
                ]
            }
        
            return segments
        }
    
        const getOuterSegmentPositions = ( x, y, w, h ) => {
            return [
                [ x - maskOffset, y - maskOffset ],
                [ x + w + maskOffset, y - maskOffset ],
                [ x + w + maskOffset, y + h + maskOffset ],
                [ x - maskOffset, y + h + maskOffset ]
            ]
        }

        const drawRectangles = () => {

            paper.project.activeLayer.removeChildren()

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            containerRect = container.getBoundingClientRect();

            let containerPaddingTop = 144
            if( window.innerWidth >= 1550 ) {
                containerPaddingTop = 168
            } else if( window.innerWidth <= 1240 ) {
                containerPaddingTop = 128
            }

            let segemtPositionIndex = 0
            const gridColumns = container.querySelectorAll('.my-masonry-grid_column')
            gridColumns.forEach(( col, index ) => {

                const wraps = col.querySelectorAll('.singleWork')
                const images = col.querySelectorAll('.imgPlaceholder')
                let topOffset = containerPaddingTop

                for( let k = 0; k < images.length; k++ ) {
                    const img = images[k].getBoundingClientRect()
                    const x = img.left
                    const y = topOffset
                    topOffset += wraps[k].getBoundingClientRect().height

                    const outerPath = new paper.Path()
                    outerPath.fillColor = new paper.Color('#ff0000')
                    outerPath.closed = true
                    outerSegmentPositions[segemtPositionIndex] = getOuterSegmentPositions( x, y, img.width, img.height )
                    for (let e = 0; e < outerSegmentPositions[segemtPositionIndex].length; e++) {
                        outerPath.add(new paper.Point( outerSegmentPositions[segemtPositionIndex][e][0], outerSegmentPositions[segemtPositionIndex][e][1] ))
                    }

                    maskPaths[segemtPositionIndex] = new paper.Path()
                    maskPaths[segemtPositionIndex].fillColor = new paper.Color("#FF0000")
                    maskPaths[segemtPositionIndex].closed = true
                    innerSegmentPositions[segemtPositionIndex] = getInnerSegmentPositions( x, y, img.width, img.height )
                    for (let e = 0; e < innerSegmentPositions[segemtPositionIndex].length; e++) {
                        maskPaths[segemtPositionIndex].add(new paper.Point( innerSegmentPositions[segemtPositionIndex][e][0], innerSegmentPositions[segemtPositionIndex][e][1] ))
                    }

                    const maskCompound = new paper.CompoundPath( { children: [outerPath, maskPaths[segemtPositionIndex]] } )
                    maskCompound.fillColor = new paper.Color('#FFFFFF')
                    maskCompound.fillRule = 'evenodd'

                    segemtPositionIndex++
                }

            })
        }

        const getDistanceBwPoints = ( x1, y1, x2, y2 ) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance;
        }

        const findThirdPoint = (x1, y1, x2, y2, distance) => {
            const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const unitVectorX = (x2 - x1) / d;
            const unitVectorY = (y2 - y1) / d;
            const deltaX = distance * unitVectorX;
            const deltaY = distance * unitVectorY;
            const x3 = x1 + deltaX;
            const y3 = y1 + deltaY;
            return { x: x3, y: y3 };
        }

        const getRectangleCenter = (x, y, ex, ey) => {
            const centerX = x + ( ex - x ) / 2;
            const centerY = y + ( ey - y ) / 2;
            return { centerX, centerY };
        }

        let mouseInsideFlags = []

        const isCorner = ( point, ctrl1, ctrl2 ) => {
            if( point ) {
                return ( (point[0] === ctrl1[0] && point[1] === ctrl1[1]) || (point[0] === ctrl1[0] && point[1] === ctrl2[1]) || (point[0] === ctrl2[0] && point[1] === ctrl2[1]) || (point[0] === ctrl2[0] && point[1] === ctrl1[1]) )
            }
            return false
        }

        paper.view.onFrame = (event) => {

            if( mouseX && mouseY ) {
                containerRect = container.getBoundingClientRect();
                mousePos = new paper.Point( mouseX - containerRect.left, mouseY - containerRect.top )
                let minDistance = 1000
                let boundOffset = window.innerWidth * 0.015
                for( let m = 0; m < maskPaths.length; m++ ) {
                    if( !mouseInsideFlags[m] ) {
                        mouseInsideFlags[m] = {
                            status: false,
                            target: {
                                segment: null,
                                point: null
                            },
                            next: {
                                segment: null,
                                point: null
                            },
                            prev: {
                                segment: null,
                                point: null
                            },
                            burst: false
                        }
                        break
                    }
                    let mouseInsideFlag = mouseInsideFlags[m]
                    const mask = maskPaths[m]
                    const staticMaskPositions = innerSegmentPositions[m]
                    const ctrl1 = staticMaskPositions[0]
                    const ctrl2 = staticMaskPositions[ staticMaskPositions.length / 2 ]
                    const center = getRectangleCenter( ctrl1[0], ctrl1[1], ctrl2[0], ctrl2[1] )
                    if( 0 && mousePos.x >= ctrl1[0] + boundOffset && mousePos.x <= ctrl2[0] - boundOffset && mousePos.y >= ctrl1[1] + boundOffset && mousePos.y <= ctrl2[1] - boundOffset ) {
                        if( mouseInsideFlag.burst ) {
                            mouseInsideFlag.target.segment.clearHandles()
                            mouseInsideFlag.target.segment.point = new paper.Point( mouseInsideFlag.target.point[0], mouseInsideFlag.target.point[1] )
                            mouseInsideFlag.next.segment.clearHandles()
                            mouseInsideFlag.next.segment.point = new paper.Point( mouseInsideFlag.next.point[0], mouseInsideFlag.next.point[1] )
                            mouseInsideFlag.prev.segment.clearHandles()
                            mouseInsideFlag.prev.segment.point = new paper.Point( mouseInsideFlag.prev.point[0], mouseInsideFlag.prev.point[1] )
                            mouseInsideFlag.next.segment.next.clearHandles()
                            mouseInsideFlag.prev.segment.previous.clearHandles()
                            
                        }
                        if( !mouseInsideFlag.status ) {
                            let minDistance = 1000
                            for( let s = 0; s < mask.segments.length; s++ ) {
                                const segment = mask.segments[s]
                                segment.clearHandles()
                                const staticSegmentPoint = staticMaskPositions[s]
                                segment.point = new paper.Point( staticSegmentPoint[0], staticSegmentPoint[1] )
                                const dp = getDistanceBwPoints( staticSegmentPoint[0], staticSegmentPoint[1], mousePos.x, mousePos.y )
                                if( minDistance > dp ) {
                                    minDistance = dp
                                    mouseInsideFlag.target.segment = segment
                                    mouseInsideFlag.target.point = staticSegmentPoint
                                    mouseInsideFlag.prev.segment = mask.segments[ (s - 1) % mask.segments.length ]
                                    mouseInsideFlag.prev.point = staticMaskPositions[ (s - 1) % mask.segments.length ]
                                    mouseInsideFlag.next.segment = mask.segments[ (s + 1) % mask.segments.length ]
                                    mouseInsideFlag.next.point = staticMaskPositions[ (s + 1) % mask.segments.length ]
                                }
                            }
                            mouseInsideFlag.status = true
                        }
                        const d = getDistanceBwPoints( mouseInsideFlag.target.point[0], mouseInsideFlag.target.point[1], mousePos.x, mousePos.y )
                        if( d < boundOffset * 4.5 ) {
                            mouseInsideFlag.target.segment.point = mousePos
                            if( isCorner( mouseInsideFlag.next.point, ctrl1, ctrl2 ) && null ) {
                                const newPoint = new paper.Point( findThirdPoint( mouseInsideFlag.next.point[0], mouseInsideFlag.next.point[1], center.centerX, center.centerY, d * 0.8 ) )
                                mouseInsideFlag.next.segment.point = newPoint
                            } else {
                                const newPoint = new paper.Point( findThirdPoint( mouseInsideFlag.next.point[0], mouseInsideFlag.next.point[1], center.centerX, center.centerY, d * 0.35 ) )
                                mouseInsideFlag.next.segment.point = newPoint
                            }
                            if( isCorner( mouseInsideFlag.prev.point, ctrl1, ctrl2 ) && null )  {
                                const newPoint = new paper.Point( findThirdPoint( mouseInsideFlag.prev.point[0], mouseInsideFlag.prev.point[1], center.centerX, center.centerY, d * 0.8 ) )
                                mouseInsideFlag.prev.segment.point = newPoint
                            } else {
                                const newPoint = new paper.Point( findThirdPoint( mouseInsideFlag.prev.point[0], mouseInsideFlag.prev.point[1], center.centerX, center.centerY, d * 0.35 ) )
                                mouseInsideFlag.prev.segment.point = newPoint
                            }
                            mouseInsideFlag.next.segment.smooth({ type: "geometric" })
                            mouseInsideFlag.next.segment.next.smooth({ type: "geometric" })
                            mouseInsideFlag.prev.segment.smooth({ type: "geometric" })
                            mouseInsideFlag.prev.segment.previous.smooth({ type: "geometric" })
                            mouseInsideFlag.target.segment.smooth({ type: "catmull-rom", factor: d * 0.0025 })
                        } else {
                            mouseInsideFlag.burst = true
                        }
                        break
                    } else {
                        mouseInsideFlag.status = false
                        for( let s = 0; s < mask.segments.length; s++ ) {
                            const segment = mask.segments[s]
                            const staticSegmentPoint = staticMaskPositions[s]
                            const dp = getDistanceBwPoints( staticSegmentPoint[0], staticSegmentPoint[1], mousePos.x, mousePos.y )
                            if( dp < boundary ) {
                                let factor = 0
                                if( isCorner( staticSegmentPoint, ctrl1, ctrl2 ) ) {
                                    segment.smooth({ type: "geometric", factor: ( boundary - dp )* 0.0035 })
                                    factor = ( boundary - dp )* 0.45
                                } else {
                                    segment.smooth({ type: "geometric" })
                                    factor = ( boundary - dp )* 0.2
                                }
                                const newPoint = new paper.Point( findThirdPoint( staticSegmentPoint[0], staticSegmentPoint[1], center.centerX, center.centerY, factor) )
                                segment.point = newPoint
                            } else {
                                segment.point = new paper.Point( staticSegmentPoint[0], staticSegmentPoint[1] )
                                segment.handleIn = segment.handleOut = null;
                            }
                        }
                    }
                }
            }

        }
/*
        const resizeCanvas = () => {
            containerRect = container.getBoundingClientRect();
            canvas.width = containerRect.width;
            canvas.height = containerRect.height;
            console.log('1')
            drawRectangles();
        };
*/
        const handleMouseMove = (event) => {
            mouseX = event.clientX
            mouseY = event.clientY
        }
        console.log( window.innerWidth > 700 )
        if( window.innerWidth > 700 ) {
           // resizeCanvas()
           console.log('in')
           drawRectangles();
        }

      //  window.innerWidth > 700 ? resizeCanvas() : null

       // window.addEventListener('resize', resizeCanvas);
        container.addEventListener( 'mousemove', handleMouseMove )

        return () => {
           // window.removeEventListener('resize', resizeCanvas);
            container.removeEventListener( 'mousemove', handleMouseMove )
        };

    }, [workList])

    useEffect( () => {

        if ( status === 'succeeded' ) {
            if ( filter_by_cat != 'all' ) {
                setWorkList( works.filter( work => ( work.tag_names.includes( filter_by_cat ) && work.acf.show_in_works === 'Show' ) ) )
            } else {
                setWorkList( works )
            }
            
        }

    }, [status, filter_by_cat] )

    return (
        <>
            <section ref={containerRef} className={ `${parentClass}` } >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                {
                    ( status === 'succeeded' ) && workList.map( ( work, index ) => {
                        return (

                            <div key={work.id}>
                                {
                                ( work.acf.show_in_works === 'Show' ) ? 
                                    (
                                        <div  className={`${classes.workWrap} singleWork`} >
                                            <Link to={ `/works/${work.slug}` } >
                                                <SingleWorkThumb 
                                                    orientation={ ( Math.random() < 0.5 ? 'h' : 'v' ) } 
                                                    imageLink={ [ work.acf.horizontal_thumbnail_image_url, work.acf.vertical_thumbnail_image_url ] } 
                                                    videoLink={ [ work.acf.horizontal_thumbnail_video, work.acf.vertical_thumbnail_video ] }  
                                                />
                                            </Link>
                                            <div className={`${classes.workData}`}>
                                                <h4>
                                                    <Link to={ `/works/${work.slug}` } >
                                                        <span  dangerouslySetInnerHTML={{ __html: work.title.rendered }}  ></span>
                                                    </Link>
                                                </h4>
                                                <ul className={ `${classes.taglist} m-0 p-0 list-unstyled` } >
                                                {
                                                    work.tag_names.map( (tag, index) => {
                                                    return ( 
                                                        <li key={ `${work.id}${index}` } >
                                                            <Link to={ `/works/?tag=${tag}` } >
                                                                {tag}
                                                            </Link>
                                                        </li> 
                                                    )
                                                    } )
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                    ) : null
                                
                            }
                            </div>
                            
                        )
                    })
                }
                </Masonry>
                <canvas ref={canvasRef} className={ `${ classes.worksCanvas }` } />
            </section>
            {
                showAllBtn && (
                    <div className='d-flex justify-content-center  pb-5 bg-white'>
                        <Link to='/works/' className='btn btn-link mb-5' >View All Projects</Link>
                    </div>
                )
            }
        </>
    )
}, (prevProps, nextProps) => {
    return prevProps.filter_by_cat === nextProps.filter_by_cat;
} )

export default WorksList