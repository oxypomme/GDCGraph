import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPlayer, selectPlayer, selectPlayerFetching } from '@/app/reducers/playerSlice';

import PieStyle from '../commons/PieStyle';
import Loading from '@/components/Loading';
import Tag from '@/components/Tag';
import { HSeparator, VSeparator } from '@/components';
import dayjs from 'dayjs';
import TimeGraph, { TimeStats } from './DayGraph';
import { ChartStat } from '@/models/StatType';
import Achivements from './Achivements';

const Base = styled.div`
    width: 50%;
`;

const UpdateLabel = styled.p`
    color: var(--background-light);
    margin: 5px 0 0 0;
`;

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InfoContainer = styled.div`
    text-align: left;
`;

const AchivementsContainer = styled.div`
    text-align: right;
`;

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const ChartContainer = styled.div<{ wide?: string }>`
    flex-basis: ${props => props.wide ? '75%' : '49%'};
    width: ${props => props.wide ? props.wide : '25%'};
    & *[dir="ltr"] {
        margin: 0 auto;
    }
`;

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

    const getDeathStats = (): ChartStat[] => {
        const data: ChartStat[] = [["Status fin", "Nombre"]];
        if (player) {
            const alive = player.total_player_status.Vivant;
            const death = player.total_player_status.Mort;
            if (alive) {
                data.push(['Vivant', alive]);
            }
            if (death) {
                data.push(['Mort', death]);
            }
            if (alive + death !== player.count_missions) {
                data.push(['Inconnu', player.count_missions - (alive + death)]);
            }
            return data;
        }
        return [...data, ["", 0]];
    }

    const getLooseStats = (): ChartStat[] => {
        const data: ChartStat[] = [["Verdict", "Nombre"]];
        if (player) {
            const win = player.total_mission_status.SUCCES;
            const loose = player.total_mission_status.ECHEC;
            const pvp = player.total_mission_status.PVP;
            if (win) {
                data.push(['Succès', win]);
            }
            if (loose) {
                data.push(['Echec', loose]);
            }
            if (pvp) {
                data.push(['PVP', pvp]);
            }
            if (win + loose + pvp !== player.count_missions) {
                data.push(['Inconnu', player.count_missions - (win + loose + pvp)]);
            }
            return data;
        }
        return [...data, ["", 0]];
    }

    const getRoleStats = (): unknown[] => {
        const data: ChartStat[] = [["Role", "Nombre"]];
        if (player) {
            for (let i = 0; i < Object.keys(player.roles.roles_count).length; i++) {
                const role = Object.keys(player.roles.roles_count)[i];
                if (Object.values(player.roles.roles_count)[i] > 0)
                    data.push([role, Object.values(player.roles.roles_count)[i]])
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
            for (let i = 0; i < Object.keys(player.months).length; i++) {
                const month = Object.keys(player.months)[i];
                const date = dayjs(month, 'MMM YYYY');
                if (Object.values(player.months)[i] > 0) {
                    data.push([month, Object.values(player.months)[i], playableWeeksInMonth(date.month(), date.year())])
                }
            }
            return [header, ...data.reverse()];
        }
        return [header, ["", 0, 0]];
    }

    const getDayStats = (): TimeStats[] => {
        const dataDead: TimeStats = [["Journée", "Vivant", "Mort", "Inconnu", "Total", ""]];
        const dataFail: TimeStats = [["Journée", "Succès", "Echec", "Inconnu", "Total", "PVP"]];
        if (player) {
            for (let i = 0; i < Object.keys(player.days).length; i++) {
                const day = Object.keys(player.days)[i];
                const dayVal = Object.values(player.days)[i];
                if (dayVal.count > 0) {
                    const label = dayjs().day(parseInt(day)).format('dd');
                    dataDead.push([label, dayVal.Vivant, dayVal.Mort, dayVal.Inconnu, dayVal.count, 0]);
                    dataFail.push([label, dayVal.SUCCES, dayVal.ECHEC, dayVal.INCONNU, dayVal.count, dayVal.PVP]);
                }
            }
            console.log([dataDead, dataFail]);
            return [dataDead, dataFail];
        }
        return [[...dataDead, ["", 0, 0, 0, 0, 0]], [...dataFail, ["", 0, 0, 0, 0, 0]]];
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
            <UpdateLabel>Mis à jour le : {dayjs(player?.updated).format('DD/MM/YYYY - HH:mm')}</UpdateLabel>
            <PlayerContainer>
                <InfoContainer>
                    <h2>#{player?.id} - {player?.name}</h2>
                    <p>{player?.count_missions || 0} missions au compteur</p>
                    <p>Dernière mission joué le {player?.last_mission?.date} <Tag element={player?.last_mission?.mission_status} /></p>
                </InfoContainer>
                <AchivementsContainer>
                    <Achivements player={player} />
                </AchivementsContainer>
            </PlayerContainer>
            <HSeparator />
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
                        Ratio : {(player?.total_player_status.Vivant / player?.total_player_status.Mort)
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
                        Ratio : {(player?.total_mission_status.SUCCES / player?.total_mission_status.ECHEC)
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </ChartContainer>
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