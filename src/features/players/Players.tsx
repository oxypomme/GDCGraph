import React from 'react';
import { VerticalBarSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import styled from '@emotion/styled';

import urljoin from 'url-join';

import { url as urlAPI } from '../../config/gdcapi.json';
import IPlayerType from '../../models/IPlayerType';
import IStatType from '../../models/IStatType';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

interface IPlayersType extends IPlayerType {
    last_mission: string
}

interface IBarStat extends IStatType {
    x: string,
    y: number
}

const AllPlayers = (): JSX.Element => {
    const [players, setPlayers] = React.useState<IPlayersType[]>()

    React.useEffect((): void => {
        (async () => {
            setPlayers(await (await fetch(urljoin(urlAPI, '/players'))).json());
        })();
    }, []);

    const getTop3Stats = (players: IPlayersType[] | undefined): IBarStat[] => {
        if (players)
            return players.sort((a, b) => b.count_missions - a.count_missions).slice(0, 3).map(p => ({
                x: p.name,
                y: p.count_missions,
                style: {
                    fill: undefined,
                    strokeWidth: undefined
                }
            }));
        return [];
    }

    return (
        <div>
            <h2>{players?.length} joueurs ont déjà effectué une mission</h2>
            <Container>
                <XYPlot
                    xType={'ordinal'}
                    animation={true}
                    width={300}
                    height={300}>
                    <VerticalBarSeries
                        barWidth={0.5}
                        animation={true}
                        data={getTop3Stats(players)}
                        onSeriesMouseOver={ev => {
                            console.log(ev);
                        }} />
                    <XAxis />
                    <YAxis title="Nombre de missions" />
                </XYPlot>
            </Container>
        </div>
    );
}

export default AllPlayers;