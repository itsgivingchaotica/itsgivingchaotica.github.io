import React from 'react';
import { TwitterPicker } from 'react-color';
import '../ColorPicker.css';

const ColorPicker = ({
    currentColor2,
    setCurrentColor2
}) => {
    return (
        <div>
            <TwitterPicker
            className="center"
            color={currentColor2}
            onChangeComplete={(color) => {
            setCurrentColor2(color.hex)
        }}
      />    
        </div>
    );
}

export default ColorPicker;