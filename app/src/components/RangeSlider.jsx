import Slider from '@mui/material/Slider';
import React from 'react';

function RangeSlider(){
    const [value, setValue] = React.useState([0, 100]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return(
      <Slider
        getAriaLabel={() => 'Preço'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    );
  }

export default RangeSlider;