import React from 'react';
import styled from '@emotion/styled';

import canardhurt from '@res/canardhurt.png'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const NotFound = (): JSX.Element => {
    return (
        <Container>
            <h1>404</h1>
            <h2>Page non trouvée</h2>
            <img src={canardhurt} />
            <p>Alors là, on vous a perdu...</p>
        </Container>
    );
}

export default NotFound;