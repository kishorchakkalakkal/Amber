import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setMousePos } from '../../Redux/mousePos';

function MouseTracker() {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleMouseMove = (event) => {
          dispatch(setMousePos({ x: event.clientX, y: event.clientY }))
        }
    
        window.addEventListener('mousemove', handleMouseMove)
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
        }

    }, [dispatch]);

    return null
}

export default MouseTracker