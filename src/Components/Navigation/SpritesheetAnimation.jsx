import React, { useRef, useEffect } from 'react';
import jsonPath from '../../assets/menu_blob_init.json'
import imagePath from '../../assets/menu_blob_init.png'

const SpritesheetAnimation = ({ animationSpeed = 0.1, hoverTarget }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const frameIndex = useRef(0);
    const frames = useRef([]);
    const totalFrames = useRef(0);
    const spriteImage = useRef(new Image());
    const canvasContext = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvasContext.current = canvas.getContext('2d');

        // Load the spritesheet and JSON data
        const loadSpritesheet = async () => {
            try {
                // Load the image
                spriteImage.current.src = imagePath;
                await new Promise(resolve => {
                    spriteImage.current.onload = resolve;
                });

                // Load the JSON file with frame data
                const response = await fetch(jsonPath);
                const json = await response.json();

                // Extract frame data from the JSON
                frames.current = json.frames.map(frame => {
                    return {
                        x: frame.frame.x,
                        y: frame.frame.y,
                        width: frame.frame.w,
                        height: frame.frame.h,
                    };
                });

                totalFrames.current = frames.current.length;

                // Start animation loop
                requestAnimationFrame(animate);
            } catch (error) {
                console.error('Error loading spritesheet:', error);
            }
        };

        loadSpritesheet();

        // Function to animate the sprite frames
        const animate = () => {
            if (frameIndex.current < totalFrames.current) {
                const currentFrame = frames.current[frameIndex.current];

                // Clear the canvas
                canvasContext.current.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the current frame
                canvasContext.current.drawImage(
                    spriteImage.current,
                    currentFrame.x, currentFrame.y, currentFrame.width, currentFrame.height,
                    0, 0, currentFrame.width, currentFrame.height // Draw on canvas
                );

                frameIndex.current++;
            } else {
                frameIndex.current = 0; // Reset to first frame
            }

            // Loop the animation at the given speed
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, animationSpeed * 1000);
        };

        // Hover interactions to start/stop the animation
        const targetElement = document.querySelector(hoverTarget);

        const handleMouseEnter = () => {
            frameIndex.current = 0; // Reset to start
            requestAnimationFrame(animate); // Start animation
        };

        const handleMouseLeave = () => {
            frameIndex.current = 0; // Reset to start
            canvasContext.current.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        };

        if (targetElement) {
            targetElement.addEventListener('mouseenter', handleMouseEnter);
            targetElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (targetElement) {
                targetElement.removeEventListener('mouseenter', handleMouseEnter);
                targetElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [jsonPath, imagePath, animationSpeed, hoverTarget]);

    return <canvas ref={canvasRef} style={{ width: '400px', height: '400px' }}></canvas>;
};

export default SpritesheetAnimation;
