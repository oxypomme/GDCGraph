import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPlayerList, selectPlayerFetching, selectPlayerList } from '@/app/reducers/playerSlice';
import Loading from '@/components/Loading';
import dayjs from 'dayjs';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

const UpdateLabel = styled.p`
    color: var(--background-light);
    margin: 5px 0 0 0;
`;

const AllPlayers = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const playerList = useAppSelector(selectPlayerList);
    const isPlayerLoading = useAppSelector(selectPlayerFetching);

    const [topPlayer, setTopPlayer] = React.useState<unknown[]>();
    const [averagePlayer, setAveragePlayer] = React.useState<number>();

    React.useEffect((): void => {
        if (playerList.players.length <= 0) {
            dispatch(fetchPlayerList());
        } else {
            setTopPlayer(getTop3Stats());
            setAveragePlayer(getAverage());
        }
    }, [playerList]);

    const getTop3Stats = (): unknown[] => {
        const headers = ['Joueur', 'Nombre de missions'];
        if (playerList.players.length > 0) {
            return [headers, ...playerList.players.slice().sort((a, b) => b.count_missions - a.count_missions).slice(0, 3).map(p => ([p.name, p.count_missions]))];
        }
        return [headers, ["", 0]];
    }

    const getAverage = (): number => {
        if (playerList.players.length > 0) {
            let sumMiss = 0;
            for (const player of playerList.players) {
                sumMiss += player.count_missions;
            }
            return sumMiss / playerList.players.length;
        }
        return 0;
    }

    return (
        <div>
            {isPlayerLoading ? <Loading /> : <></>}
            <UpdateLabel>Mis à jour le : {dayjs(playerList?.updated).format('DD/MM/YYYY - HH:mm:ss')}</UpdateLabel>
            <h2>{playerList?.players.length} joueurs ont été trouvés</h2>
            <Container>
                <Chart
                    width={'auto'}
                    height={'auto'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={topPlayer}
                    options={{
                        isStacked: true,
                        chart: { title: '3 plus gros joueurs' },
                        legend: 'none',
                        vAxis: { title: "Nombre de missions" },
                        colors: ['#ADEBAD']
                    }}
                />
            </Container>
            <p>Chaque joueur a joué {averagePlayer?.toLocaleString(undefined, { maximumFractionDigits: 0 })} missions en moyenne</p>
        </div>
    );
}

export default AllPlayers;