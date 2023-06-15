import './App.scss'
import CubicBezierCurve from './components/bezier/cubic-bezier-curve/CubicBezierCurve'
import LinearBezierCurve from './components/bezier/linear-bezier-curve/LinearBezierCurve'
import QuadraticBezierCurve from './components/bezier/quadratic-bezier-curve/QuadraticBezierCurve'

function App() 
{
  return (
    <div className='App'>
      <h1>BEZIER CURVES</h1>

      <h2>LINEAR BEZIER CURVE</h2>
      <LinearBezierCurve />
      <br/>
      <h2>QUADRATIC BEZIER CURVE</h2>
      <QuadraticBezierCurve />
      <br/>
      <h2>CUBIC BEZIER CURVE</h2>
      <CubicBezierCurve />
      <br/>
    </div>
  )
}

export default App
