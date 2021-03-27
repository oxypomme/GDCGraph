import React from 'react';
import styled from '@emotion/styled';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchMapList, selectMapList } from '@/app/reducers/mapsSlice';
import { selectPlayerFetching } from '@/app/reducers/playerSlice';

import Loading from '@/components/Loading';
import { ChartStat } from '@/models/StatType';
import { Chart } from 'react-google-charts';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

const MapsCharts = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const mapsList = useAppSelector(selectMapList);
    const isMapsFetching = useAppSelector(selectPlayerFetching);

    const [topMaps, setTopMaps] = React.useState<ChartStat[]>()

    React.useEffect((): void => {
        if (mapsList.length <= 0) {
            dispatch(fetchMapList());
        } else {
            setTopMaps(getWorst5Stats());

        }
    }, [mapsList])

    const getWorst5Stats = (): ChartStat[] => {
        const header = ['Map', 'Nombre de missions']
        if (mapsList.length > 0) {
            return [header, ...mapsList.slice().sort((a, b) => a.mission_count - b.mission_count).slice(0, 5).map(p => ([p.name, p.mission_count]))];
        }
        return [header, ['', 0]]
    }

    return (
        <div>
            {isMapsFetching ? <Loading /> : <></>}
            <Container>
                <Chart
                    width={'auto'}
                    height={'auto'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={topMaps}
                    options={{
                        isStacked: true,
                        chart: { title: '3 plus gros joueurs' },
                        legend: 'none',
                        vAxis: { title: "Nombre de missions" },
                        colors: ['#ADEBAD']
                    }}
                />
            </Container>
        </div>
    );
}

export default MapsCharts;