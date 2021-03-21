import React from 'react';
import styled from '@emotion/styled';

import { RadialChart } from 'react-vis';
import urljoin from 'url-join';

import { url as urlAPI } from '../../config/gdcapi.json';
import EMissionStatus from '../../models/EMissionStatus';
import EPlayerStatus from '../../models/EPlayerStatus';
import MissionType from '../../models/MissionType';
import IPlayerType from '../../models/IPlayerType';
import IStatType from '../../models/IStatType';

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;

    & > * {
        margin: 0 50px;
    }
`;

type PropsType = {
    id: number
}

type PlayerDetailType = {
    infos: IPlayerType,
    missions: Array<MissionType>
}

interface IRadialStat extends IStatType {
    angle: number,
    label: string,
    subLabel: string
}

const PlayerDetail = (props: PropsType): JSX.Element => {
    const { id } = props;
    const [player, setPlayer] = React.useState<PlayerDetailType>();

    React.useEffect((): void => {
        (async () => {
            setPlayer(await (await fetch(urljoin(urlAPI, `/players/${id}`))).json());
        })();
    }, [id]);

    const getTotalPlayerStatus = (player: PlayerDetailType | undefined, status: EPlayerStatus): number => {
        if (player) {
            return player.missions.filter(m => m.player_status === status).length;
        }
        return 0;
    }

    const getTotalMissionStatus = (player: PlayerDetailType | undefined, status: EMissionStatus): number => {
        if (player) {
            return player.missions.filter(m => m.mission_status === status).length;
        }
        return 0;
    }

    const getTotalPlayerStatusWithMission = (player: PlayerDetailType | undefined, pStatus: EPlayerStatus, mStatus: EMissionStatus): number => {
        if (player) {
            return player.missions.filter(m => m.player_status === pStatus && m.mission_status === mStatus).length;
        }
        return 0;
    }

    const getDeathStats = (player: PlayerDetailType | undefined): IRadialStat[] => {
        const data = [];
        if (player) {
            const alive = getTotalPlayerStatus(player, EPlayerStatus.ALIVE);
            const death = getTotalPlayerStatus(player, EPlayerStatus.DEAD);
            if (alive) {
                data.push({
                    angle: alive,
                    label: "En vie",
                    subLabel: alive.toString(),
                    style: { fill: '#D9EDF7', strokeWidth: 0 }
                });
            }
            if (death) {
                data.push({
                    angle: death,
                    label: "Mort",
                    subLabel: death.toString(),
                    style: { fill: '#FCF8E3', strokeWidth: 0 }
                });
            }
            if (alive + death !== player.infos.count_missions) {
                data.push({
                    angle: player.infos.count_missions - (alive + death),
                    label: "Inconnu",
                    subLabel: (player.infos.count_missions - (alive + death)).toString(),
                    style: { fill: '#CCC', strokeWidth: 0 }
                });
            }
        }
        return data;
    }

    const getLooseStats = (player: PlayerDetailType | undefined): IRadialStat[] => {
        const data = [];
        if (player) {
            const win = getTotalMissionStatus(player, EMissionStatus.SUCCESS);
            const loose = getTotalMissionStatus(player, EMissionStatus.FAILED);
            if (win) {
                data.push({
                    angle: win,
                    label: "Victoire",
                    subLabel: win.toString(),
                    style: { fill: '#DFF0D8', strokeWidth: 0 }
                });
            }
            if (loose) {
                data.push({
                    angle: loose,
                    label: "Echec",
                    subLabel: loose.toString(),
                    style: { fill: '#F2DEDE', strokeWidth: 0 }
                });
            }
            if (win + loose !== player.infos.count_missions) {
                data.push({
                    angle: player.infos.count_missions - (win + loose),
                    label: "Inconnu",
                    subLabel: (player.infos.count_missions - (win + loose)).toString(),
                    style: { fill: '#FCF8E3', strokeWidth: 0 }
                });
            }
        }
        return data;
    }

    return (
        <div>
            <h2>{player?.infos.name}</h2>
            <p>{player?.infos.count_missions} missions au compteur</p>
            <Container>
                <div>
                    <h3>Mort ou vif ?</h3>
                    <RadialChart
                        data={getDeathStats(player)}
                        showLabels={true}
                        animation={true}
                        width={300}
                        height={300} />
                    <p>
                        Ratio : {(getTotalPlayerStatus(player, EPlayerStatus.ALIVE) / getTotalPlayerStatus(player, EPlayerStatus.DEAD))
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </div>
                <div>
                    <h3>Victoire ?</h3>
                    <RadialChart
                        data={getLooseStats(player)}
                        showLabels={true}
                        animation={true}
                        width={300}
                        height={300} />
                    <p>
                        Ratio : {(getTotalMissionStatus(player, EMissionStatus.SUCCESS) / getTotalMissionStatus(player, EMissionStatus.FAILED))
                            .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
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