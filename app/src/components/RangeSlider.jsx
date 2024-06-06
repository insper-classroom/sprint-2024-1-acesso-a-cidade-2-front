import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

function RangeSlider(){
    const [value, setValue] = React.useState([0, 100]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return(
      <Box>
        <Slider
          getAriaLabel={() => 'Preço'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='caption'>R$ {value[0]}</Typography>
        <Typography variant='caption'>R$ {value[1]}</Typography>
      </Box>
      </Box>
      
    );
  }

export default RangeSlider;