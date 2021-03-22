import React from 'react';
import styled from '@emotion/styled';

import { Chart } from "react-google-charts";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPlayer, selectPlayer, selectPlayerFetching } from '@/app/reducers/playerSlice';

import EMissionStatus from '@/models/EMissionStatus';
import EPlayerStatus from '@/models/EPlayerStatus';
import PieStyle from './PieStyle';
import Loading from '@/components/Loading';

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

    React.useEffect((): void => {
        dispatch(fetchPlayer(id))
    }, [id]);

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

    return (
        <div>
            {isPlayerLoading ? <Loading /> : <></>}
            <h2>{player?.infos.name}</h2>
            <p>{player?.infos.count_missions} missions au compteur</p>
            <Container>
                <div>
                    <h3>Mort ou vif ?</h3>
                    <p>
                        Ratio : {(getTotalPlayerStatus(EPlayerStatus.ALIVE) / getTotalPlayerStatus(EPlayerStatus.DEAD))
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <Chart
                        width={'300px'}
                        height={'auto'}
                        chartType="PieChart"
                        loader={<div>Waiting Data</div>}
                        data={getDeathStats()}
                        options={{ ...PieStyle }}
                    />
                </div>
                <div>
                    <h3>Victoire ?</h3>
                    <p>
                        Ratio : {(getTotalMissionStatus(EMissionStatus.SUCCESS) / getTotalMissionStatus(EMissionStatus.FAILED))
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <Chart
                        width={'300px'}
                        height={'auto'}
                        chartType="PieChart"
                        loader={<div>Waiting Data</div>}
                        data={getLooseStats()}
                        options={{ ...PieStyle }}
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