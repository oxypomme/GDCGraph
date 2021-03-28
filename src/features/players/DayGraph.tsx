import React from 'react';

import Select from 'react-select';

import CustomComboChart from '../commons/CustomComboChart';
import { ChartStat } from '@/models/StatType';

export type TimeStats = ChartStat[];

type PropsType = {
    stats: TimeStats
}

const chartFilters = [{ value: 1, label: "Total" }, { value: 2, label: "Mort ou vif" }, { value: 3, label: "Victoire" }];

const TimeGraph = (props: PropsType): JSX.Element => {
    const { stats } = props;

    const [currStat, setCurrStat] = React.useState(1);

    const handleFilterChange = (elmnt: { value: number, label: string } | null) => {
        if (elmnt?.value) {
            setCurrStat(elmnt.value)
        }
    }

    return (
        <>
            {
                currStat === 1 ? <CustomComboChart stats={stats[0]} columns={[0, 4]} /> : <></>
            }
            {
                currStat === 2 ? <CustomComboChart stats={stats[0]} columns={[0, 1, 2, 3, 4]} /> : <></>
            }
            {
                currStat === 3 ? <CustomComboChart stats={stats[1]} columns={[0, 1, 2, 3, 4, 5]} /> : <></>
            }
            <Select
                defaultValue={chartFilters[0]}
                options={chartFilters}
                onChange={handleFilterChange}
                menuPlacement="top"
            />
        </>
    )
}

export default TimeGraph;