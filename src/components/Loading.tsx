import React from 'react';
import styled from "@emotion/styled";
import { keyframes } from '@emotion/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const InfiniteRotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left:0 ;
    z-index: 9998;
    background-color: black;
    opacity: 0.5;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
        animation: ${InfiniteRotate} 2s linear infinite;
    }
`;

const Loading = (): JSX.Element => {
    return (
        <Background>
            <FontAwesomeIcon icon={faSyncAlt} color={'white'} size={'6x'} />
        </Background>
    );
}

export default Loading;