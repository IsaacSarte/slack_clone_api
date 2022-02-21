import React from 'react';

// Components
import Hand from '../components/Hand/Hand.jsx';
import Header from '../components/Header/Header';
import Sections from '../components/Sections/Sections.jsx';

// CSS
import '../index.css';
import styled from 'styled-components';

const HomeContainer = styled.div`
    min-height: 100vh;
    color: white;
    background-color: #4A154B;
`

const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
`

const Home = () => {
    return (
        <HomeContainer>

            {/* Header */}
            <HeaderContainer>
                <Header />
            </HeaderContainer>
            
            {/* Hand Loading */}
            <Hand />

            {/* Section */}
            <Sections />
        </HomeContainer>
    )
}

export default Home;