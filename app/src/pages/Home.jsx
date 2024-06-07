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
      url: 'https://imgs.search.brave.com/Ok73ysO0Z9e14KoPlY_jYYKmX-kKHJL_u8nKZA2SpAc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS9i/Yjc0NzRfZjIzNGU0/NGIwNzI5NDc2Yjkx/NzkxYTViNmIzY2E2/OWV-bXYyLmpwZy92/MS9maWxsL3dfNDY0/LGhfMzEyLGFsX2Ms/cV84MCx1c21fMC42/Nl8xLjAwXzAuMDEs/ZW5jX2F1dG8vQmli/bGlvdGVjYSUyMENv/bXVuaXQlQzMlQTFy/aWElMjBIZWxpJUMz/JUIzcG9saXMuanBn',
      title: 'Bliblioteca Comunitária',
      link: 'https://example.com/page1'
    },
    {
      url: 'https://www.fablablivresp.prefeitura.sp.gov.br/sites/default/files/styles/banner_interno_1377x806/public/images/logo-unidade/helip%202.jpg?itok=cwwu7H7_',
      title: 'Fab Lab Heliópolis',
      link: 'https://example.com/page2'
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
      const url = filters ? 'https://sprint-2024-1-acesso-a-cidade-2.onrender.com/eventos/filtros' : 'https://sprint-2024-1-acesso-a-cidade-2.onrender.com/eventos';
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
              image: 'https://sprint-2024-1-acesso-a-cidade-2.onrender.com'+ event.imagem,
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
      corFundo={'#f5f5f5'}
      corTexto={'black'}
      conteudo={
        <>
          <Filtro Nome='Preço' corTexto={'#757575'} conteudo={<RangeSlider value={priceRange} onChange={(_, newValue) => setPriceRange(newValue)} sx={{backgroundColor: '#black'}} />} />
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
          <Button variant="contained" sx={{backgroundColor: 'white', color: '#757575', marginTop: '3%'}} onClick={handleApplyFilters}>Aplicar</Button>
        </>
      }
    />
  );
}

export default Home;