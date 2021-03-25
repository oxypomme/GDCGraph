import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const NotImplemented = (): JSX.Element => {
    return (
        <Container>
            <h1>501</h1>
            <h2>Page en cours de construction</h2>
            <p>
                &quot;Vous pouvez attendre le temps que je bosse ?&quot;<br />
                <a href="https://github.com/oxypomme">OxyTom</a>, 2021
            </p>
        </Container>
    );
}

export default NotImplemented;