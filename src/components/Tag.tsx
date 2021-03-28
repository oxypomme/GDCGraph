import React from 'react';
import styled from '@emotion/styled';
import EMissionStatus from '@/models/EMissionStatus';
import EPlayerStatus from '@/models/EPlayerStatus';

const Container = styled.span<{ color: string }>`
    background-color: ${props => props.color};
    font-size: 8pt;
    padding: 2px;
    border-radius: 5px;
    vertical-align: text-top;
`;

type PropsType = {
    element: EMissionStatus | EPlayerStatus | undefined
}

const Tag = (props: PropsType): JSX.Element => {
    const { element } = props;

    if (element === undefined) {
        return <></>;
    }

    const [color, setColor] = React.useState('');
    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        switch (element) {
            case EMissionStatus.SUCCESS:
                setColor('#81d5ff');
                setContent('Succès');
                break;
            case EPlayerStatus.ALIVE:
                setColor('#81d5ff');
                setContent('Vivant');
                break;

            case EMissionStatus.FAILED:
                setColor('#ee9e9e');
                setContent('Echec');
                break;
            case EPlayerStatus.DEAD:
                setColor('#ee9e9e');
                setContent('Mort');
                break;
            default:
                setColor('#fceb96');
                setContent('Inconnu')
                break;
        }
    }, [element]);

    return (
        <Container color={color}>
            {content}
        </Container>
    );
}

export default Tag;