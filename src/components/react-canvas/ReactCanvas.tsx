import { useEffect, useRef } from "react";
import Vector2 from "../../interfaces/Vector2";
import Timing from "../../interfaces/Timing";

export interface ReactCanvasProps {
    id: string,
    size: Vector2
    draw: (timing:Timing, size:Vector2, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => void;
}

export const ReactCanvas = (props:ReactCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const requestAnimFrameIDRef = useRef<number|undefined>(undefined);
    const timingRef = useRef<Timing|undefined>();

    useEffect( () => {
        return () => {
            if(requestAnimFrameIDRef.current)
            {
                window.cancelAnimationFrame(requestAnimFrameIDRef.current);
            }
        }
    }, []);

    useEffect( () => {
        if(canvasRef.current)
        {
            init(canvasRef.current);
        }
    }, [canvasRef]);

    const init = (canvas:HTMLCanvasElement) => {
        let ctx = canvas.getContext('2d');
        if(ctx)
        {
            requestAnimFrameIDRef.current = window.requestAnimationFrame( (totalElapsedTime:number) => {
                tick(totalElapsedTime, canvas, ctx!);
            } );
        } 
        else 
        {
            console.error("Canvas not supported.");
        }
    };

    const tick = (totalElapsedTime:number, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => {

        // UPDATE & DRAW
        if(timingRef.current)
        {
            if(props.draw !== undefined)
            {
                props.draw(timingRef.current, props.size, canvas, ctx);
            }
        } 
        else 
        {
            timingRef.current = {
                totalElapsedTime: 0,
                deltaTime: 0,
                FPS: 0
            }
        }

        // CALC TIMING
        if(totalElapsedTime > 0)
        {
            const lastFrameTime = totalElapsedTime - timingRef.current.totalElapsedTime;
            timingRef.current.deltaTime = lastFrameTime / 1000;
            timingRef.current.FPS = Math.round(1000 / lastFrameTime);
            timingRef.current.totalElapsedTime = totalElapsedTime;
        }
        
        // RECURSIVE CALL

        requestAnimFrameIDRef.current = window.requestAnimationFrame( (elapsedTime:number) => {
            tick(elapsedTime, canvas, ctx);
        } );
    };

    return(
        <canvas 
            id={`${props.id}_canvas`} 
            ref={canvasRef}
            width={props.size.x} 
            height={props.size.y}>

        </canvas>
    );
}

export default ReactCanvas;