import React from 'react';

import { Chart } from "react-google-charts";

import { ChartStat } from '@/models/StatType';
import PieStyle from './PieStyle';

type PropsType = {
    stats: ChartStat,
    columns: number[]
}

const CustomComboChart = (props: PropsType): JSX.Element => {
    const { stats, columns } = props;

    return (
        <Chart
            width={'100%'}
            height={'250px'}
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
                series: { 4: { type: 'line' } },
                ...PieStyle
            }}
            chartWrapperParams={{ view: { columns } }}
        />
    );
}

export default CustomComboChart;