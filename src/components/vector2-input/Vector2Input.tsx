import "./Vector2Input.scss";
import Vector2 from "../../interfaces/Vector2";

interface Vector2InputProps
{
    title: string,
    value: Vector2,
    onChange?: (value:Vector2) => void;
};

const Vector2Input = ( {title="", value={x:0, y: 0}, onChange}: Vector2InputProps) =>
{
    const handleOnChange = (evt:React.ChangeEvent<HTMLInputElement>, axis:'x'|'y') =>
    {
        if(onChange)
        {
            const newValue = evt.currentTarget.value !== '' ? parseInt(evt.currentTarget.value) : 0;

            if( !isNaN(newValue) )
            {  
                const x = axis === 'x' ? newValue : value.x;
                const y = axis === 'y' ? newValue : value.y;
                onChange({x: x, y: y});
            }
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <input type="text" className="Vector2InputField" value={value.x} onChange={ (evt) => {handleOnChange(evt, 'x')} }></input>
            <input type="text" className="Vector2InputField" value={value.y} onChange={ (evt) => {handleOnChange(evt, 'y')} }></input>
        </div>
    );
};

export default Vector2Input;