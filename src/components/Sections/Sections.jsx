import React from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import '../../index.css';
import styled from 'styled-components';

// Videos
import vid2 from '../assets/sec2vid.mp4';
import vid3 from '../assets/sec3vid.mp4';

const SectionContainer = styled(motion.div)`

`

const Title = styled.h1`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    gap: 2rem;

    @media screen and (max-width: 500px) {
        margin-top: 2rem;
        gap: 1rem;
        >svg {
            margin-top: -0.25rem;
            width: 40px;
            height: 40px;
        }
    }
`

const Text = styled.h2`

    @media screen and (max-width: 500px) {
        font-size: 1.75rem;
    }
`

const SectionCard = styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10rem;

    >div>div {
        position: relative;
        margin-top: 1rem;
        width: 400px;
        height: 25vh;
    }

    >div>div>video {
        position: absolute;
        border-radius: 12.5px;
    }

    >div>div>iframe {
        position: absolute;
        border-radius: 12.5px;
        z-index: 3;
    }

    @media screen and (max-width: 500px) {
        flex-wrap: wrap;
        max-width: 768px;
        gap: 2rem;

        >div>div {
            width: 150%;
            left: 0%;
            transform: translate(-17%,0%);
            z-index: 0;
        }
    }
`

const CardText = styled.span`
    font-size: 1.5rem;
    font-weight: 550;
`

const Line = styled.div`
    >div>span {
        position: fixed;
        color: #000;
        font-size: 1.25rem;
        font-weight: 600;
        transform: rotate(-180deg);
        margin-top: -7rem;
        right: 5%;
    }

    @media screen and (max-width: 500px) {
        >div>span {
            font-size: 1rem;
        }
    }
`

const Sections = () => {
    return (
        <SectionContainer
            initial={{ display: 'none' }}
            animate={{ display: 'initial' }}
            transition={{ type: 'fade', duration: 1, delay: 2.5 }}
        >

            <Title>
                <svg id="hand-icon" xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none">
                    <path stroke="#dab8a3" stroke-width="1" d="M20.5 5A1.5 1.5 0 0 0 19 6.5V11h-1V4.5a1.5 1.5 0 0 0-3 0V11h-1V3.5a1.5 1.5 0 0 0-3 0V11h-1V5.5a1.5 1.5 0 0 0-3 0v10.81l-2.22-3.6a1.5 1.5 0 0 0-2.56 1.58l3.31 5.34A5 5 0 0 0 9.78 22H17a5 5 0 0 0 5-5V6.5A1.5 1.5 0 0 0 20.5 5z">
                    </path>
                </svg>
                <Text>Welcome Back</Text>
            </Title>

            <SectionCard>
                <div>
                    <CardText>New way of working</CardText>
                    <div>
                        <iframe
                            width="100%"
                            height="80%"
                            src="https://www.youtube.com/embed/pQcN1xO7RdA"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        >

                        </iframe>
                    </div>
                </div>

                <div>
                    <CardText>Organize your work</CardText>
                    <div>
                        <video width="100%" autoplay="autoplay" loop="loop" muted="muted">
                            <source src={vid3} />
                        </video>
                    </div>
                </div>

                <div>
                    <CardText>Be more productive</CardText>
                    <div>
                        <video width="100%" autoplay="autoplay" loop="loop" muted="muted">
                            <source src={vid2} />
                        </video>
                    </div>
                </div>
            </SectionCard>

            <Line>
                <div className="custom-shape-divider-bottom-1645435805">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                    </svg>
                    <span>For Educational Purposes Only</span>
                </div>
            </Line>

        </SectionContainer>
    )
}

export default Sections