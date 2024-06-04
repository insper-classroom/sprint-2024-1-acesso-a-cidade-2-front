import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import 'dayjs/locale/pt-br'; // Importa o locale pt-br

function DataPicker() {
    const [value, setValue] = React.useState(null);
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          label="Selecione a data"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
        />
      </LocalizationProvider>
    );
  }

export default DataPicker;