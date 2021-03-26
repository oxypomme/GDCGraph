import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    flex: 1 0 25%;
    border: 1px solid black;
    border-radius: 10px;
    margin: 5%;
    padding: 5%;
    cursor: pointer;
`;

type PropsType = {
    image: string,
    title: string,
    desc: string,
    onClick: () => void
}

const Applet = (props: PropsType): JSX.Element => {
    const { image, title, desc, onClick } = props;
    return (
        <Container tabIndex={0} onClick={onClick}>
            <img src={image} />
            <h2>{title}</h2>
            <p>{desc}</p>
        </Container>
    );
}

export default Applet;