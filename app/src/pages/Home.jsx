import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Filtro from '../components/Filtro';
import DataPicker from '../components/DataPicker';
import CheckBox from '../components/CheckBox';
import RangeSlider from '../components/RangeSlider';
import HoraPicker from '../components/HoraPicker';
import Evento from '../components/Evento';
import ImageSlider from '../components/ImageSlider';

function Home() {
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/eventos');
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

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <ImageSlider images={images} />
      </Container>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Filtros />
      </Container>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {events['eventos'].map((event) => (
          <Evento
            key={event._id}
            info={{
              image: event.imageUrl,
              title: event.titulo,
              description: event.descricao,
              date: event.data,
              location: event.location
            }}
          />
        ))}
      </Container>
    </>
  );
}

function Filtros() {
  const [valueData, setValueData] = React.useState(null);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  return (
    <Filtro
      Nome={'Filtros'}
      corFundo={'#1976D2'}
      corTexto={'white'}
      conteudo={
        <>
          <Filtro Nome='Preço' corTexto={'#757575'} conteudo={<RangeSlider />} />
          <Filtro
            Nome='Tipo de Evento'
            corTexto={'#757575'}
            conteudo={<CheckBox handleChange={handleChange} selectedOptions={selectedOptions} opcoes={['Musica', 'Esporte', 'Cinema e Teatro', 'Oficina', 'Comida / Gastronomia', 'Museu', 'Dança']} />}
          />
          <Filtro Nome='Data' corTexto={'#757575'} conteudo={<DataPicker />} />
          <Filtro Nome='Horário' corTexto={'#757575'} conteudo={<HoraPicker />} />
          <Filtro
            Nome='Área'
            corTexto={'#757575'}
            conteudo={<CheckBox handleChange={handleChange} selectedOptions={selectedOptions} opcoes={['Fora de Heliópolis', 'Mina', 'sla']} />}
          />
          <Filtro
            Nome='Faixa Etária'
            corTexto={'#757575'}
            conteudo={<CheckBox handleChange={handleChange} selectedOptions={selectedOptions} opcoes={['Jovens', 'Velhos']} />}
          />
        </>
      }
    />
  );
}

export default Home;