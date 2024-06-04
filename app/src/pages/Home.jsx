import React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header'
import Filtro from '../components/Filtro'
import DataPicker from '../components/DataPicker'
import CheckBox from '../components/CheckBox';
import RangeSlider from '../components/RangeSlider';
import HoraPicker from '../components/HoraPicker';
import Evento from '../components/Evento';

function Home(){
    return (
        <>
          <Header />
          <Container maxWidth="sm" sx={{mt: 5}}>
            <Filtros />
          </Container>
          <Container maxWidth="sm" sx={{mt: 5}}>
            <Evento />
          </Container>
        </>
        );
}

function Filtros() {

  const [valueData, setValueData] = React.useState(null);

    return(
      <Filtro Nome={'Filtros'} corFundo={'#1976D2'} corTexto={'white'} 
      conteudo={
      <>
      <Filtro Nome='Preço' corTexto={'#757575'} conteudo={<RangeSlider />}/>
      <Filtro Nome='Tipo de Evento' corTexto={'#757575'} conteudo={<CheckBox opcoes={['Musica','Esporte','Cinema e Teatro', 'Oficina','Comida / Gastronomia','Museu','Dança']} />}/>
      <Filtro Nome='Data' corTexto={'#757575'} conteudo={<DataPicker />}/>
      <Filtro Nome='Horário' corTexto={'#757575'} conteudo={<HoraPicker />}/>
      <Filtro Nome='Área' corTexto={'#757575'} conteudo={<CheckBox opcoes={['Fora de Heliópolis', 'Mina', 'sla']} />}/>
      <Filtro Nome='Faixa Etária' corTexto={'#757575'} conteudo={<CheckBox opcoes={['Jovens','Velhos']} />}/>
      </>
      }/>
      
    );
  }

export default Home;