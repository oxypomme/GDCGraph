import React from 'react';
import styled from '@emotion/styled';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchMapList, selectMapFetching, selectMapList } from '@/app/reducers/mapsSlice';
import Loading from '@/components/Loading';
import { ChartStat } from '@/models/StatType';
import { Chart } from 'react-google-charts';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const MapsCharts = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const mapsList = useAppSelector(selectMapList);
    const isMapsFetching = useAppSelector(selectMapFetching);

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
                <h2>Maps les moins jouées</h2>
                <Chart
                    width={'600px'}
                    height={'300px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={topMaps}
                    options={{
                        isStacked: true,
                        hAxis: { title: 'Map' },
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