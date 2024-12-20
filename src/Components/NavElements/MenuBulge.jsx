import paper from 'paper';
import React, { useEffect, useRef } from 'react'
import classes from './menuBulge.module.css'

function MenuBulge() {

    const menuBulge_Open = useRef(null)
    const curveRef = useRef(null);

    useEffect( () => {

        paper.setup(menuBulge_Open.current)
        const { width, height } = paper.view.size;

        const startX = width;
        const startY = 0;
        const endX = width;
        const endY = height;
        const controlX1 = width - 80;
        const controlY1 = height / 2;
        const controlX2 = width - 80;
        const controlY2 = height/2;

        // Create the curve using the specified points  
        curveRef.current = new paper.Path();
        curveRef.current.fillColor = 'blue';
        curveRef.current.moveTo(new paper.Point(startX, startY));
        curveRef.current.cubicCurveTo(
          new paper.Point(controlX1, controlY1),
          new paper.Point(controlX2, controlY2),
          new paper.Point(endX, endY)
        );

        console.log(curveRef.current.segments[1])

        const onMouseMove = (event) => {
            const mouseX = event.point.x;
      
            // Check if the mouse is within 100px of the right edge
            if (mouseX > width - 100) {
              const bendAmount = 150 - ((mouseX - (width - 100)) * 1.5);
              curveRef.current.segments[1].point.x = width - bendAmount;
              curveRef.current.segments[2].point.x = width - bendAmount;
            } else {
                curveRef.current.segments[1].point.x = width;
                curveRef.current.segments[2].point.x = width;
            }
      
            curveRef.current.smooth({ type: 'continuous' });
          };

        paper.view.onMouseMove = onMouseMove;

    return () => {
        paper.project.activeLayer.removeChildren();
        paper.view.off('resize');
      };

    }, [])

    return (
        <>
            <canvas ref={menuBulge_Open} id='menuBulge_Open'  className={`${classes.menuBulgeOpen}`} resize="true" ></canvas>
        </>
    )
}

export default MenuBulge
