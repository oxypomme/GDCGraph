import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPlayer, selectPlayer, selectPlayerFetching } from '@/app/reducers/playerSlice';

import roles from '@config/roles.json';

import EMissionStatus from '@/models/EMissionStatus';
import EPlayerStatus from '@/models/EPlayerStatus';
import PieStyle from './PieStyle';
import Loading from '@/components/Loading';
import Tag from '@/components/Tag';
import { VSeparator } from '@/components';
import dayjs from 'dayjs';

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
    const [dayStats, setDayStats] = React.useState({});

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
        const data: any[][] = [["Role", "Nombre"]];
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
            return data.sort((a, b) => b[1] - a[1]);
        }
        return [...data, ["", 0]]
    }

    const getMonthStats = (): any => {
        const data: any[][] = [];
        if (player) {
            const months: { [date: string]: number } = {};
            for (const miss of player.missions) {
                const date = dayjs(miss.date, 'DD/MM/YYYY').format('MMM YYYY');
                if (months[date]) {
                    months[date]++;
                } else {
                    months[date] = 1;
                }
            }
            for (let i = 0; i < Object.keys(months).length; i++) {
                const month = Object.keys(months)[i];
                if (Object.values(months)[i] > 0)
                    data.push([month, Object.values(months)[i]])
            }
            return [["Mois", "Nombre"], ...data.reverse()];
        }
        return [["Mois", "Nombre"], ["", 0]];
    }

    const getDayStats = (): any => {
        const data: any[][] = [["Journée", "Nombre"]];
        if (player) {
            const days: { [date: number]: number } = {};
            for (const miss of player.missions) {
                const rawdate = dayjs(miss.date, 'DD/MM/YYYY').day();
                const date = rawdate == 0 ? 7 : rawdate; // Sunday is the last day of the week. Change my mind.
                if (days[date]) {
                    days[date]++;
                } else {
                    days[date] = 1;
                }
            }
            for (let i = 0; i < Object.keys(days).length; i++) {
                const day = Object.keys(days)[i];
                if (Object.values(days)[i] > 0) {
                    const label = dayjs().day(parseInt(day)).format('dd');
                    data.push([label, Object.values(days)[i]])
                }
            }
            return data;
        }
        return [...data, ["", 0]];
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
                <div>
                    <h3>On a fini sans toi</h3>
                    <p>
                        {player?.infos.name} est mort {getTotalPlayerStatusWithMission(EPlayerStatus.DEAD, EMissionStatus.SUCCESS)} fois alors
                    que la mission s&apos;est soldé par un succès,<br /> ce qui représente {((getTotalPlayerStatusWithMission(EPlayerStatus.DEAD, EMissionStatus.SUCCESS) / getTotalMissionStatus(EMissionStatus.SUCCESS)) * 100)
                            .toLocaleString(undefined, { maximumFractionDigits: 0 })}% des ses missions accomplies !
                    </p>
                </div>
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
                        height={'auto'}
                        chartType="LineChart"
                        loader={<div>Waiting Data</div>}
                        data={monthStats}
                        options={{
                            isStacked: true,
                            legend: 'none',
                            vAxis: {
                                title: "Nombre de missions",
                                minValue: 0
                            },
                            hAxis: {
                                title: "Mois",
                            },
                            colors: ['#ADEBAD']
                        }}
                    />
                </ChartContainer>
                <ChartContainer>
                    <h3>Nombre de missions par journée</h3>
                    <Chart
                        width={'100%'}
                        height={'auto'}
                        chartType="ColumnChart"
                        loader={<div>Waiting Data</div>}
                        data={dayStats}
                        options={{
                            isStacked: true,
                            legend: 'none',
                            vAxis: { title: "Nombre de missions" },
                            hAxis: {
                                title: "Journée"
                            },
                            colors: ['#ADEBAD']
                        }}
                    />
                </ChartContainer>
            </Container>
        </Base>
    );
}

export default PlayerDetail;