import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";
import urljoin from 'url-join';

import { url as urlAPI } from '../../config/gdcapi.json';
import IPlayerType from '../../models/IPlayerType';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

interface IPlayersType extends IPlayerType {
    last_mission: string
}

const AllPlayers = (): JSX.Element => {
    const [players, setPlayers] = React.useState<IPlayersType[]>()

    React.useEffect((): void => {
        (async () => {
            setPlayers(await (await fetch(urljoin(urlAPI, '/players'))).json());
        })();
    }, []);

    const getTop3Stats = (): unknown[] => {
        const headers = ['Player', 'Count'];
        if (players) {
            return [headers, ...players.sort((a, b) => b.count_missions - a.count_missions).slice(0, 3).map(p => ([p.name, p.count_missions]))];
        }
        return [headers];
    }

    const getAverage = (): number => {
        if (players) {
            let sumMiss = 0;
            for (const player of players) {
                sumMiss += player.count_missions;
            }
            return sumMiss / players.length;
        }
        return 0;
    }

    return (
        <div>
            <h2>{players?.length} joueurs ont étés trouvés</h2>
            <Container>
                <Chart
                    width={'auto'}
                    height={'auto'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={getTop3Stats()}
                    options={{
                        isStacked: true,
                        chart: {
                            title: '3 plus gros joueurs',
                        },
                        legend: 'none',
                        vAxis: {
                            title: "Nombre de missions",
                        },
                        colors: ['#ADEBAD']
                    }}
                />
            </Container>
            <p>Chaque joueur a joué {getAverage().toLocaleString(undefined, { maximumFractionDigits: 0 })} missions en moyenne</p>
        </div>
    );
}

export default AllPlayers;