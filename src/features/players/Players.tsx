import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPlayerList, selectPlayerFetching, selectPlayerList } from '@/app/reducers/playerSlice';
import Loading from '@/components/Loading';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

const AllPlayers = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const playerList = useAppSelector(selectPlayerList);
    const isPlayerLoading = useAppSelector(selectPlayerFetching);

    React.useEffect((): void => {
        if (playerList.length <= 0) {
            dispatch(fetchPlayerList());
        }
    }, [playerList]);

    const getTop3Stats = (): unknown[] => {
        const headers = ['Player', 'Count'];
        if (playerList.length > 0) {
            return [headers, ...playerList.slice().sort((a, b) => b.count_missions - a.count_missions).slice(0, 3).map(p => ([p.name, p.count_missions]))];
        }
        return [headers, []];
    }

    const getAverage = (): number => {
        if (playerList.length > 0) {
            let sumMiss = 0;
            for (const player of playerList) {
                sumMiss += player.count_missions;
            }
            return sumMiss / playerList.length;
        }
        return 0;
    }

    return (
        <div>
            {isPlayerLoading ? <Loading /> : <></>}
            <h2>{playerList?.length} joueurs ont étés trouvés</h2>
            <Container>
                <Chart
                    width={'auto'}
                    height={'auto'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={getTop3Stats()}
                    options={{
                        isStacked: true,
                        chart: { title: '3 plus gros joueurs' },
                        legend: 'none',
                        vAxis: { title: "Nombre de missions" },
                        colors: ['#ADEBAD']
                    }}
                />
            </Container>
            <p>Chaque joueur a joué {getAverage().toLocaleString(undefined, { maximumFractionDigits: 0 })} missions en moyenne</p>
        </div>
    );
}

export default AllPlayers;