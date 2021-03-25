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

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
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
        }
        return data;
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
        }
        return data;
    }

    const getRoleStats = (): unknown[] => {
        const data: any[][] = [["Role", "Nombre"]];
        if (player) {
            const rolesCount: { [role: string]: number } = { Inconnu: player.missions.length };
            for (const miss of player.missions) {
                let isMissionDone = false;
                const roleLower = toLowerWOAccent(miss.role);
                for (let i = 0; i < Object.values(roles).length; i++) {
                    const roleConfigVals = Object.values(roles)[i].map(roleConfigVal => toLowerWOAccent(roleConfigVal));
                    const roleConfigKey = Object.keys(roles)[i];

                    for (const roleConfigVal of roleConfigVals) {
                        if (roleLower.includes(roleConfigVal)) {
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
                    console.log(`[Player.tsx/getRoleStats/${player.infos.name}] Role skipped :`, miss.role, "Mission ID :", miss.id, "\nIf you see this warning and you're not the owner of the website, please contact OxyTom#1831 on Discord.");
                }
            }
            for (let i = 0; i < Object.keys(rolesCount).length; i++) {
                const role = Object.keys(rolesCount)[i];
                if (Object.values(rolesCount)[i] > 0)
                    data.push([role, Object.values(rolesCount)[i]])
            }
        }

        return data.sort((a, b) => b[1] - a[1]);
    }

    React.useEffect(() => {
        setRoleStats(getRoleStats());
        setDeathStats(getDeathStats());
        setLooseStats(getLooseStats());
    }, [isPlayerLoading]);

    return (
        <div>
            {isPlayerLoading ? <Loading /> : <></>}
            <h2>#{player?.infos.id} - {player?.infos.name}</h2>
            <p>{player?.infos.count_missions} missions au compteur</p>
            <p>Dernière mission joué le {player?.missions[0].date} <Tag element={player?.missions[0].mission_status} /></p>
            <Container>
                <div>
                    <h3>Mort ou vif ?</h3>
                    <Chart
                        width={'300px'}
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
                </div>
                <div>
                    <h3>Victoire ?</h3>
                    <Chart
                        width={'300px'}
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
                </div>
                <div>
                    <h3>Roles</h3>
                    <Chart
                        width={'300px'}
                        height={'auto'}
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
                </div>
            </Container>
            {/*<div>
                <p>
                    {player?.infos.name} est mort {getTotalPlayerStatusWithMission(EPlayerStatus.DEAD, EMissionStatus.SUCCESS)} fois alors
                    que la mission s&apos;est soldé par un succès,<br /> ce qui représente {((getTotalPlayerStatusWithMission(EPlayerStatus.DEAD, EMissionStatus.SUCCESS) / getTotalMissionStatus(EMissionStatus.SUCCESS)) * 100)
                        .toLocaleString(undefined, { maximumFractionDigits: 0 })}% des ses missions accomplies !
                </p>
            </div>*/}
        </div>
    );
}

export default PlayerDetail;