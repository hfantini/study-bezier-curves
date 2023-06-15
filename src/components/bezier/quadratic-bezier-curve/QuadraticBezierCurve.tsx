import "./QuadraticBezierCurve.scss";
import { useEffect, useRef, useState } from "react";
import Timing from "../../../interfaces/Timing";
import Vector2 from "../../../interfaces/Vector2";
import ReactCanvas from "../../react-canvas/ReactCanvas";
import Vector2Input from "../../vector2-input/Vector2Input";

let defaultStartPoint = { x: 50, y: 250 };
let defaultControlPoint = { x: 250, y: 0 };
let defaultEndPoint = { x: 450, y: 250 };

const quadraticBezier = (t:number, p1:Vector2, cp:Vector2, p2:Vector2):Vector2 =>
{
  const x = cp.x + Math.pow( (1 - t), 2 ) * (p1.x - cp.x) + Math.pow(t, 2) * (p2.x - cp.x);
  const y = cp.y + Math.pow( (1 - t), 2 ) * (p1.y - cp.y) + Math.pow(t, 2) * (p2.y - cp.y);
        
  return {x: x, y: y}
};

const QuadraticBezierCurve = () => {

  const [startPoint, setStartPoint] = useState<Vector2>(defaultStartPoint);
  const [controlPoint, setcontrolPoint] = useState<Vector2>(defaultControlPoint);
  const [endPoint, setEndPoint] = useState<Vector2>(defaultEndPoint);
  const startPointRef = useRef<Vector2>(defaultStartPoint);
  const controlPointRef = useRef<Vector2>(defaultControlPoint);
  const endPointRef = useRef<Vector2>(defaultEndPoint);

  useEffect( () => {
    startPointRef.current = {...startPoint};
    controlPointRef.current = {...controlPoint};
    endPointRef.current = {...endPoint};
  }, [startPoint, controlPoint, endPoint]);

  const draw = (timing:Timing, size:Vector2, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => 
  {
      ctx.fillStyle = "#635985"
      ctx.fillRect(0, 0, size.x, size.y);

      let start = startPointRef.current;
      let cp = controlPointRef.current;
      let end = endPointRef.current;

      ctx.strokeStyle = "#FFFFFF";

      const accuracy = 0.001;
      ctx.beginPath();

      for(let count = 0 ; count <= 1 ; count += accuracy)
      {
        const point = quadraticBezier(count, start, cp, end);
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

    const handleControlPointChange = (value:Vector2) => 
    {
      setcontrolPoint(value);
    };   

    const handleEndPointChange = (value:Vector2) => 
    {
      setEndPoint(value);
    };   

    return (
      <div className="QuadraticBezierCurve">
        <div className="QuadraticBezierCurveLeft">
        <ReactCanvas
          id='canvasBezierQuadratic'
          size={ {x: 500, y: 300} }
          draw={ draw }
        />
        </div>
        <div className="QuadraticBezierCurveRight">
          <img className="QuadraticBezierCurveFormula" src="/images/QuadraticBezierCurveFunc.png" />
          <br/>
          <Vector2Input title="Start Point" value={startPoint} onChange={handleStartPointChange} />
          <Vector2Input title="Control Point" value={controlPoint} onChange={handleControlPointChange} />
          <Vector2Input title="End Point" value={endPoint} onChange={handleEndPointChange} />
        </div>
      </div>
    )
}

export default QuadraticBezierCurve;