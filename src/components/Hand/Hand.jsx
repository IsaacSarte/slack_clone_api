import React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper } from '@fortawesome/free-solid-svg-icons';

// CSS
import '../../index.css';
import styled from 'styled-components';

const HandWave = styled(motion.div)`
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 20vh;
`

const Icon = styled.h1`
    color: #B2856A; 
    font-size: 5rem;

    @media screen and (max-width: 500px) {
        font-size: 3rem;
    }
`

const Title = styled.h1`
    margin-top: 1rem;
    font-size: 3rem;

    @media screen and (max-width: 500px) {
        font-size: 2.5rem;
    }
`

const Hand = () => {
    return (
        <HandWave
            initial={{ display: 'flex' }}
            animate={{ display: 'none' }}
            transition={{ duration: 15, delay: 2 }}
        >
            <div>
                <Icon className="hand"><FontAwesomeIcon icon={faHandPaper} /></Icon>
                <Title>Welcome Back</Title>
            </div>
        </HandWave>
    )
}

export default Hand;