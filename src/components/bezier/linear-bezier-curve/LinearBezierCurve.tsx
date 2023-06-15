import "./LinearBezierCurve.scss"
import Timing from "../../../interfaces/Timing";
import Vector2 from "../../../interfaces/Vector2";
import ReactCanvas from "../../react-canvas/ReactCanvas";
import Vector2Input from "../../vector2-input/Vector2Input";
import { useEffect, useRef, useState } from "react";

let defaultStartPoint = { x: 50, y: 50 };
let defaultEndPoint = { x: 450, y: 250 };

const LinearBezierCurve = () => {

    const [startPoint, setStartPoint] = useState<Vector2>(defaultStartPoint);
    const [endPoint, setEndPoint] = useState<Vector2>(defaultEndPoint);
    const startPointRef = useRef<Vector2>(defaultStartPoint);
    const endPointRef = useRef<Vector2>(defaultEndPoint);

    useEffect( () => {
      startPointRef.current = {...startPoint};
      endPointRef.current = {...endPoint};
    }, [startPoint, endPoint]);

    const linearBezier = (t:number, p1:Vector2, p2:Vector2):Vector2 =>
    {
      const x = p1.x + t * (p2.x - p1.x);
      const y = p1.y + t * (p2.y - p1.y);
            
      return {x: x, y: y}
    };

    const draw = (timing:Timing, size:Vector2, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) =>
    {
      ctx.save();
      ctx.fillStyle = "#635985"
      ctx.clearRect(0, 0, size.x, size.y);

      let start = startPointRef.current;
      let end = endPointRef.current;

      ctx.strokeStyle = "#FFFFFF";

      const accuracy = 0.01;

      ctx.beginPath();
      for(let count = 0 ; count <= 1 ; count += accuracy)
      {
        const point = linearBezier(count, start, end);
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();

      ctx.stroke();
    }

    const handleStartPointChange = (value:Vector2) => 
    {
      setStartPoint(value);
    };

    const handleEndPointChange = (value:Vector2) => 
    {
      setEndPoint(value);
    };    

    return (
      <div className="LinearBezierCurve">
        <div className="LinearBezierCurveLeft">
        <ReactCanvas
          id='canvasBezierLinear'
          size={ {x: 500, y: 300} }
          draw={ draw }
        />
        </div>
        <div className="LinearBezierCurveRight">
          <img className="LinearBezierCurveFormula" src="/images/LinearBezierCurveFunc.png" />
          <br/>
          <Vector2Input title="Start Point" value={startPoint} onChange={handleStartPointChange} />
          <Vector2Input title="End Point" value={endPoint} onChange={handleEndPointChange} />
        </div>
      </div>
    )
}

export default LinearBezierCurve;