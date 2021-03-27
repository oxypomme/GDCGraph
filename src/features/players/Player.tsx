import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPlayer, selectPlayer, selectPlayerFetching } from '@/app/reducers/playerSlice';

import roles from '@config/roles.json';

import EMissionStatus from '@/models/EMissionStatus';
import EPlayerStatus from '@/models/EPlayerStatus';
import PieStyle from '../commons/PieStyle';
import Loading from '@/components/Loading';
import Tag from '@/components/Tag';
import { VSeparator } from '@/components';
import dayjs from 'dayjs';
import TimeGraph, { TimeStats } from './DayGraph';
import { ChartStat } from '@/models/StatType';

const Base = styled.div`
    width: 50%;
`;

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const ChartContainer = styled.div<{ wide?: string }>`
    flex-basis: ${props => props.wide ? '75%' : '49%'};
    width: ${props => props.wide ? props.wide : '25%'};
    & *[dir="ltr"] {
        margin: 0 auto;
    }
`;

interface ITimeStat {
    count: number,
    alive: number,
    dead: number,
    puknown: number,
    success: number,
    failed: number,
    muknown: number,
}

type PropsType = {
    id: string
}

const PlayerDetail = (props: PropsType): JSX.Element => {
    const dispatch = useAppDispatch();
    const { id } = props;
    const player = useAppSelector(selectPlayer)
    const isPlayerLoading = useAppSelector(selectPlayerFetching);

    const [roleStats, setRoleStats] = React.useState({});
    const [deathStats, setDeathStats] = React.useState({});
    const [looseStats, setLooseStats] = React.useState({});
    const [monthStats, setMonthStats] = React.useState({});
    const [dayStats, setDayStats] = React.useState(new Array(0));

    React.useEffect((): void => {
        dispatch(fetchPlayer(id))
    }, [id]);

    const toLowerWOAccent = (str: string): string => str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const getTotalPlayerStatus = (status: EPlayerStatus): number => {
        if (player) {
            return player.missions.filter(m => m.player_status === status).length;
        }
        return 0;
    }

    const getTotalMissionStatus = (status: EMissionStatus): number => {
        if (player) {
            return player.missions.filter(m => m.mission_status === status).length;
        }
        return 0;
    }

    const getTotalPlayerStatusWithMission = (pStatus: EPlayerStatus, mStatus: EMissionStatus): number => {
        if (player) {
            return player.missions.filter(m => m.player_status === pStatus && m.mission_status === mStatus).length;
        }
        return 0;
    }

    const getTPSWMPercent = (pStatus: EPlayerStatus, mStatus: EMissionStatus): number => ((getTotalPlayerStatusWithMission(EPlayerStatus.DEAD, EMissionStatus.SUCCESS) / getTotalMissionStatus(EMissionStatus.SUCCESS)) * 100);

    const getDeathStats = (): unknown[] => {
        const data: unknown[] = [["Status fin", "Nombre"]];
        if (player) {
            const alive = getTotalPlayerStatus(EPlayerStatus.ALIVE);
            const death = getTotalPlayerStatus(EPlayerStatus.DEAD);
            if (alive) {
                data.push(['Vivant', alive]);
            }
            if (death) {
                data.push(['Mort', death]);
            }
            if (alive + death !== player.infos.count_missions) {
                data.push(['Inconnu', player.infos.count_missions - (alive + death)]);
            }
            return data;
        }
        return [...data, ["", 0]];
    }

    const getLooseStats = (): unknown[] => {
        const data: unknown[] = [["Verdict", "Nombre"]];
        if (player) {
            const win = getTotalMissionStatus(EMissionStatus.SUCCESS);
            const loose = getTotalMissionStatus(EMissionStatus.FAILED);
            if (win) {
                data.push(['Succès', win]);
            }
            if (loose) {
                data.push(['Echec', loose]);
            }
            if (win + loose !== player.infos.count_missions) {
                data.push(['Inconnu', player.infos.count_missions - (win + loose)]);
            }
            return data;
        }
        return [...data, ["", 0]];
    }

    const getRoleStats = (): unknown[] => {
        const data: ChartStat[] = [["Role", "Nombre"]];
        if (player) {
            const errors: { mission: number, role: string }[] = new Array(0);
            const rolesCount: { [role: string]: number } = { Inconnu: player.missions.length };
            for (const miss of player.missions) {
                let isMissionDone = false;
                for (let i = 0; i < Object.values(roles).length; i++) {
                    const roleConfigKey = Object.keys(roles)[i];
                    for (const roleConfigVal of Object.values(roles)[i].map(roleConfigVal => toLowerWOAccent(roleConfigVal))) {
                        if (toLowerWOAccent(miss.role).includes(roleConfigVal)) {
                            isMissionDone = true;
                            if (isNaN(rolesCount[roleConfigKey])) {
                                rolesCount[roleConfigKey] = 1;
                            }
                            else {
                                rolesCount[roleConfigKey]++;
                            }
                            rolesCount.Inconnu--;
                            break;
                        }
                    }
                    if (isMissionDone) {
                        break;
                    }
                }
                if (!isMissionDone) {
                    errors.push({ mission: miss.id, role: miss.role });
                }
            }
            for (let i = 0; i < Object.keys(rolesCount).length; i++) {
                const role = Object.keys(rolesCount)[i];
                if (Object.values(rolesCount)[i] > 0)
                    data.push([role, Object.values(rolesCount)[i]])
            }
            if (errors.length > 0) {
                console.log(`[Player.tsx/getRoleStats/${player.infos.name}] Roles skipped :`, errors, "\nIf you see this warning and you're not the owner of the website, please contact OxyTom#1831 on Discord.");
            }
            return data.sort((a, b) => typeof a[1] === 'number' && typeof b[1] === 'number' ? b[1] - a[1] : 0);
        }
        return [...data, ["", 0]]
    }

    const playableWeeksInMonth = (month: number, year: number): number => {
        const playablesDays = [0, 3, 5, 6];
        let day = 1;
        let counter = 0;
        let date = new Date(year, month, day);
        while (date.getMonth() === month) {
            if (playablesDays.includes(date.getDay())) {
                counter++;
            }
            day++;
            date = new Date(year, month, day);
        }
        return counter;
    }

    const getMonthStats = (): ChartStat[] => {
        const header = ["Mois", "Nombre", "Maximum*"];
        if (player) {
            const data: ChartStat[] = [];
            const months: { [date: string]: { count: number, max: number } } = {};
            for (const miss of player.missions) {
                const date = dayjs(miss.date, 'DD/MM/YYYY');
                const dateKey = date.format('MMM YYYY');
                if (months[dateKey]) {
                    months[dateKey].count++;
                } else {
                    months[dateKey] = {
                        count: 1,
                        max: playableWeeksInMonth(date.month(), date.year())
                    };
                }
            }
            for (let i = 0; i < Object.keys(months).length; i++) {
                const month = Object.keys(months)[i];
                if (Object.values(months)[i].count > 0) {
                    data.push([month, Object.values(months)[i].count, Object.values(months)[i].max])
                }
            }
            return [header, ...data.reverse()];
        }
        return [header, ["", 0, 0]];
    }

    const getDayStats = (): TimeStats[] => {
        const dataDead: TimeStats = [["Journée", "Vivant", "Mort", "Inconnu", "Total"]];
        const dataFail: TimeStats = [["Journée", "Succès", "Echec", "Inconnu", "Total"]];
        if (player) {
            const days: { [date: number]: ITimeStat } = {};
            for (const miss of player.missions) {
                const rawdate = dayjs(miss.date, 'DD/MM/YYYY').day();
                const date = rawdate == 0 ? 7 : rawdate; // Sunday is the last day of the week. Change my mind.
                if (days[date]) {
                    days[date].count++;
                    switch (miss.player_status) {
                        case EPlayerStatus.ALIVE:
                            days[date].alive++;
                            break;
                        case EPlayerStatus.DEAD:
                            days[date].dead++;
                            break;
                        default:
                            days[date].puknown++;
                            break;
                    }
                    switch (miss.mission_status) {
                        case EMissionStatus.SUCCESS:
                            days[date].success++;
                            break;
                        case EMissionStatus.FAILED:
                            days[date].failed++;
                            break;
                        default:
                            days[date].muknown++;
                            break;
                    }
                } else {
                    days[date] = {
                        count: 1,
                        alive: miss.player_status === EPlayerStatus.ALIVE ? 1 : 0,
                        dead: miss.player_status === EPlayerStatus.DEAD ? 1 : 0,
                        puknown: miss.player_status === EPlayerStatus.UNKNOWN ? 1 : 0,
                        success: miss.mission_status === EMissionStatus.SUCCESS ? 1 : 0,
                        failed: miss.mission_status === EMissionStatus.FAILED ? 1 : 0,
                        muknown: miss.mission_status === EMissionStatus.UNKNOWN ? 1 : 0
                    };
                }
            }

            for (let i = 0; i < Object.keys(days).length; i++) {
                const day = Object.keys(days)[i];
                const dayVal = Object.values(days)[i];
                if (dayVal.count > 0) {
                    const label = dayjs().day(parseInt(day)).format('dd');
                    dataDead.push([label, dayVal.alive, dayVal.dead, dayVal.puknown, dayVal.count]);
                    dataFail.push([label, dayVal.success, dayVal.failed, dayVal.muknown, dayVal.count]);
                }
            }
            return [dataDead, dataFail];
        }
        return [[...dataDead, ["", 0, 0, 0, 0]], [...dataFail, ["", 0, 0, 0, 0]]];
    }

    React.useEffect(() => {
        if (!isPlayerLoading) {
            setRoleStats(getRoleStats());
            setDeathStats(getDeathStats());
            setLooseStats(getLooseStats());
            setMonthStats(getMonthStats());
            setDayStats(getDayStats());
        }
    }, [isPlayerLoading]);

    return (
        <Base>
            {isPlayerLoading ? <Loading /> : <></>}
            <h2>#{player?.infos.id} - {player?.infos.name}</h2>
            <p>{player?.infos.count_missions || 0} missions au compteur</p>
            <p>Dernière mission joué le {player?.missions[0]?.date} <Tag element={player?.missions[0]?.mission_status} /></p>
            <Container>
                <ChartContainer>
                    <h3>Mort ou vif</h3>
                    <Chart
                        width={'100%'}
                        height={'auto'}
                        chartType="PieChart"
                        loader={<div>Waiting Data</div>}
                        data={deathStats}
                        options={{ ...PieStyle }}
                    />
                    <p>
                        Ratio : {(getTotalPlayerStatus(EPlayerStatus.ALIVE) / getTotalPlayerStatus(EPlayerStatus.DEAD))
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </ChartContainer>
                <VSeparator />
                <ChartContainer>
                    <h3>Victoire</h3>
                    <Chart
                        width={'100%'}
                        height={'auto'}
                        chartType="PieChart"
                        loader={<div>Waiting Data</div>}
                        data={looseStats}
                        options={{ ...PieStyle }}
                    />
                    <p>
                        Ratio : {(getTotalMissionStatus(EMissionStatus.SUCCESS) / getTotalMissionStatus(EMissionStatus.FAILED))
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </ChartContainer>
                {getTPSWMPercent(EPlayerStatus.DEAD, EMissionStatus.SUCCESS) > 40 ?
                    <div>
                        <h3>Elle a fini sans toi</h3>
                        <p>
                            {player?.infos.name} est mort {getTotalPlayerStatusWithMission(EPlayerStatus.DEAD, EMissionStatus.SUCCESS)} fois alors
                    que la mission s&apos;est soldé par un succès,<br /> ce qui représente {getTPSWMPercent(EPlayerStatus.DEAD, EMissionStatus.SUCCESS)
                                .toLocaleString(undefined, { maximumFractionDigits: 0 })}% des ses missions accomplies !
                        </p>
                    </div> : <></>}
                <ChartContainer wide={"100%"}>
                    <h3>Roles</h3>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Waiting Data</div>}
                        data={roleStats}
                        options={{
                            isStacked: true,
                            legend: 'none',
                            vAxis: { title: "Nombre de missions" },
                            hAxis: {
                                title: "Role",
                                textPosition: 'none'
                            },
                            colors: ['#ADEBAD']
                        }}
                    />
                </ChartContainer>
                <ChartContainer>
                    <h3>Nombre de missions par mois</h3>
                    <Chart
                        width={'100%'}
                        height={'250px'}
                        chartType="LineChart"
                        loader={<div>Waiting Data</div>}
                        data={monthStats}
                        options={{
                            isStacked: true,
                            vAxis: {
                                title: "Nombre de missions",
                                minValue: 0
                            },
                            hAxis: {
                                title: "Mois",
                            },
                            series: {
                                1: { lineDashStyle: [4, 4] }
                            },
                            ...PieStyle
                        }}
                    />
                    <p>
                        *//TODO Explication Max
                    </p>
                </ChartContainer>
                <ChartContainer>
                    <h3>Nombre de missions par journée</h3>
                    <TimeGraph stats={dayStats} />
                </ChartContainer>
            </Container>
        </Base>
    );
}

export default PlayerDetail;