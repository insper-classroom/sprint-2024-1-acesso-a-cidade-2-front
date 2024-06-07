import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Filtro from '../components/Filtro';
import DataPicker from '../components/DataPicker';
import RangeSlider from '../components/RangeSlider';
import Evento from '../components/Evento';
import ImageSlider from '../components/ImageSlider';
import EventDialog from '../components/EventDialog';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

function Home(){
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const images = [
    {
      url: 'https://imgs.search.brave.com/ZDno8QOXgUfXHIdkiCsPfqG71jxI5gHS_yngR8tnhjk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/c2NlbmljLW1vdW50/YWluLWxhbmRzY2Fw/ZS5qcGc_d2lkdGg9/MTAwMCZmb3JtYXQ9/cGpwZyZleGlmPTAm/aXB0Yz0w',
      title: 'Image 1',
      link: 'https://example.com/page1'
    },
    {
      url: 'https://imgs.search.brave.com/HyjWzwYbB76UQRqJ7Xol7utBBUvGpXBTeHIyugUZsnw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzUwLzEzLzQw/LzM2MF9GXzUwMTM0/MDY5X29FU1pkQXJB/WHUzdmtvaXhUZHRk/QWZ2Uk5qMGZ1Vm1a/LmpwZw',
      title: 'Image 2',
      link: 'https://example.com/page2'
    },
    {
      url: 'https://imgs.search.brave.com/QDnhn6ibfZEO7FCWjiQbIwdr2OKIF3WRzW6EbBuF7wc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bmF0dXJlLW1vdW50/YWlucy1yaXZlci1s/YW5kc2NhcGUtYWR2/ZW50dXJlLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA',
      title: 'Image 3',
      link: 'https://example.com/page3'
    }
  ];
  
  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  }
  
  const fetchEvents = async (filters = null) => {
    setLoading(true);
    setError(null);

    try {
      console.log(filters)
      const url = filters ? 'http://127.0.0.1:5000/eventos/filtros' : 'http://127.0.0.1:5000/eventos';
      const options = filters
        ? {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters),
          }
        : {};

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Algo deu errado');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleApplyFilters = (filters) => {
    fetchEvents(filters);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <ImageSlider images={images} onImageClick={handleClickOpen}/>
      </Container>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Filtros onApplyFilters={handleApplyFilters} />
      </Container>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {events.eventos && events.eventos.map((event) => (
          <Evento onImageClick={handleClickOpen}
            key={event._id}
            info={{
              image: 'http://127.0.0.1:5000'+ event.imagem,
              title: event.titulo,
              description: event.descricao,
              date: event.data,
              location: event.local,
              horario: event.horario,
              id : event._id
            }}
          />
        ))}
      </Container>
      <EventDialog event={selectedEvent} open={open} onClose={handleClose} />
    </>
  );
}

function Filtros({ onApplyFilters }) {
  const [valueData, setValueData] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleChangeTipo = (event) => {
    setSelectedTipo(event.target.value);
  };

  const handleChangeArea = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleApplyFilters = () => {
    const filters = {
      valor_min: priceRange[0],
      valor_max: priceRange[1],
      data: valueData,
      tipo: selectedTipo,
      area: selectedArea,
    };
    onApplyFilters(filters);
  };

  return (
    <Filtro
      Nome={'Filtros'}
      corFundo={'#1976D2'}
      corTexto={'white'}
      conteudo={
        <>
          <Filtro Nome='Preço' corTexto={'#757575'} conteudo={<RangeSlider value={priceRange} onChange={(_, newValue) => setPriceRange(newValue)} />} />
          <Filtro
            Nome='Tipo de Evento'
            corTexto={'#757575'}
            conteudo={
              <RadioGroup value={selectedTipo} onChange={handleChangeTipo}>
                {['Musica', 'Esporte', 'Cinema e Teatro', 'Oficina', 'Comida / Gastronomia', 'Museu', 'Dança'].map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            }
          />
          <Filtro Nome='Data' corTexto={'#757575'} conteudo={<DataPicker value={valueData} onChange={(newValue) => setValueData(newValue)} />} />
          <Filtro
            Nome='Área'
            corTexto={'#757575'}
            conteudo={
              <RadioGroup value={selectedArea} onChange={handleChangeArea}>
                {['Fora de Heliópolis', 'Dentro de Heliópolis'].map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            }
          />
          <Button variant="contained" sx={{backgroundColor: 'white', color: '#757575'}} onClick={handleApplyFilters}>Aplicar</Button>
        </>
      }
    />
  );
}

export default Home;