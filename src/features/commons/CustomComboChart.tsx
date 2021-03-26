import React from 'react';

import { Chart } from "react-google-charts";

import PieStyle from './PieStyle';

export type ChartStat = (string | number)[]

type PropsType = {
    stats: ChartStat,
    columns: number[]
}

const CustomComboChart = (props: PropsType): JSX.Element => {
    const { stats, columns } = props;

    return (
        <Chart
            width={'100%'}
            height={'auto'}
            chartType="ComboChart"
            loader={<div>Waiting Data</div>}
            data={stats}
            options={{
                isStacked: true,
                vAxis: { title: "Nombre de missions" },
                hAxis: {
                    title: "Journée"
                },
                seriesType: 'bars',
                series: { 3: { type: 'line' } },
                ...PieStyle
            }}
            chartWrapperParams={{ view: { columns } }}
        />
    );
}

export default CustomComboChart;