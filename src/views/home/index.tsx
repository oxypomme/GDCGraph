import React from 'react';
import styled from '@emotion/styled';

import Applet from './App';
import { useHistory } from 'react-router';

const Flex = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    width: 50%;
    margin: 0 auto;
`;

const Home = (): JSX.Element => {
    const history = useHistory();

    const handlePlayersClick = () => {
        history.push('/players');
    }

    const handleMissionsClick = () => {
        history.push('/missions');
    }

    return (
        <>
            <Flex>
                <Applet image="" title="Joueurs" desc="Affiche des stats générales sur les joueurs, ou un joueur en particulier." onClick={handlePlayersClick} />
                <Applet image="" title="Missions" desc="Affiche des stats générales sur les missions, ou une mission en particulier." onClick={handleMissionsClick} />
            </Flex>
            <p>
                Outil développé pour les canards de <a href="https://grecedecanards.fr/">Grèce de Canard</a>.
            </p>
            <p>
                Lié à <a href="https://grecedecanards.fr/GDCStats/">GDC Stats</a>.
            </p>
        </>
    );
}

export default Home;