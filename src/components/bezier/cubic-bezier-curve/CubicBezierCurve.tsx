import "./CubicBezierCurve.scss"
import { useEffect, useRef, useState } from "react";
import Timing from "../../../interfaces/Timing";
import Vector2 from "../../../interfaces/Vector2";
import ReactCanvas from "../../react-canvas/ReactCanvas";
import Vector2Input from "../../vector2-input/Vector2Input";

let defaultStartPoint = { x: 50, y: 50 };
let defaultControlPoint1 = { x: 50, y: 250 };
let defaultControlPoint2 = { x: 450, y: 50 };
let defaultEndPoint = { x: 450, y: 250 };

const cubicBezier = (t:number, p1:Vector2, cp1:Vector2, cp2:Vector2, p2:Vector2):Vector2 =>
{
  const x = Math.pow(1 - t, 3) * p1.x + 3 * Math.pow( (1 - t), 2) * t * cp1.x + 3 * (1 - t) * Math.pow(t, 2) * cp2.x + Math.pow(t, 3) * p2.x;
  const y = Math.pow(1 - t, 3) * p1.y + 3 * Math.pow( (1 - t), 2) * t * cp1.y + 3 * (1 - t) * Math.pow(t, 2) * cp2.y + Math.pow(t, 3) * p2.y;
        
  return {x: x, y: y}
};

const CubicBezierCurve = () => 
{
  const [startPoint, setStartPoint] = useState<Vector2>(defaultStartPoint);
  const [controlPoint1, setControlPoint1] = useState<Vector2>(defaultControlPoint1);
  const [controlPoint2, setControlPoint2] = useState<Vector2>(defaultControlPoint2);
  const [endPoint, setEndPoint] = useState<Vector2>(defaultEndPoint);
  const startPointRef = useRef<Vector2>(defaultStartPoint);
  const controlPoint1Ref = useRef<Vector2>(defaultControlPoint1);
  const controlPoint2Ref = useRef<Vector2>(defaultControlPoint2);
  const endPointRef = useRef<Vector2>(defaultEndPoint);

  useEffect( () => {
    startPointRef.current = {...startPoint};
    controlPoint1Ref.current = {...controlPoint1};
    controlPoint2Ref.current = {...controlPoint2};
    endPointRef.current = {...endPoint};
  }, [startPoint, controlPoint1, controlPoint2, endPoint]);

  const draw = (timing:Timing, size:Vector2, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => 
  {
    ctx.fillStyle = "#635985"
    ctx.fillRect(0, 0, size.x, size.y);

    let start = startPointRef.current;
    let cp1 = controlPoint1Ref.current;
    let cp2 = controlPoint2Ref.current;
    let end = endPointRef.current;

    ctx.strokeStyle = "#FFFFFF";

    const accuracy = 0.001;
    ctx.beginPath();

    for(let count = 0 ; count <= 1 ; count += accuracy)
    {
      const point = cubicBezier(count, start, cp1, cp2, end);
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x + 1, point.y + 1);
    }
    ctx.closePath();
    ctx.stroke();
  }

    const handleStartPointChange = (value:Vector2) => 
    {
      setStartPoint(value);
    };

    const handleControlPoint1Change = (value:Vector2) => 
    {
      setControlPoint1(value);
    };

    const handleControlPoint2Change = (value:Vector2) => 
    {
      setControlPoint2(value);
    };  

    const handleEndPointChange = (value:Vector2) => 
    {
      setEndPoint(value);
    };   

    return (
      <div className="CubicBezierCurve">
        <div className="CubicBezierCurveLeft">
        <ReactCanvas
          id='canvasBezierCubic'
          size={ {x: 500, y: 300} }
          draw={ draw }
        />
        </div>
        <div className="CubicBezierCurveRight">
          <img className="CubicBezierCurveFormula" src="/images/CubicBezierCurveFunc.png" />
          <br/>
          <Vector2Input title="Start Point" value={startPoint} onChange={handleStartPointChange} />
          <Vector2Input title="Control Point 1" value={controlPoint1} onChange={handleControlPoint1Change} />
          <Vector2Input title="Control Point 2" value={controlPoint2} onChange={handleControlPoint2Change} />
          <Vector2Input title="End Point" value={endPoint} onChange={handleEndPointChange} />
        </div>
      </div>
    )
}

export default CubicBezierCurve;