import React from 'react';
import styled from '@emotion/styled';

import IPlayerType from '@/models/IPlayerType';
import ReactTooltip from 'react-tooltip';

import playablesDays from '@config/playablesDays.json';
import dayjs from 'dayjs';

const Card = styled.div`
    background: var(--background-dark);
    width: 100%;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    & > h4 {
        margin: 0;
    }
`;

type PropsType = {
    player: IPlayerType
}

interface AchivementType {
    name: string,
    icon: string,
    desc: string
}

const Achivements = (props: PropsType): JSX.Element => {
    const { player } = props;

    const [achivements, setAchivements] = React.useState<AchivementType[]>([]);

    React.useEffect(() => {
        const achs: AchivementType[] = [];
        if (player) {
            if (player.total_player_mission_status.SUCCES_Mort / player.total_mission_status.SUCCES >= .4) {
                achs.push({
                    name: "Elle a fini sans toi",
                    icon: "",
                    desc: `Est mort dans ${(player.total_player_mission_status.SUCCES_Mort / player.total_mission_status.SUCCES * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}% de ses missions accomplies`
                });
            }

            if (player.count_missions >= 400) {
                achs.push({
                    name: "Petit joueur",
                    icon: "",
                    desc: `A joué seulement ${player.count_missions} missions`
                });
            }

            const sortedDays = Object.keys(player.days).map((key, i) => ({
                day: dayjs().day(parseInt(key)).format('dddd'),
                count: Object.values(player.days)[i].count
            })).sort((a, b) => b.count - a.count);
            if (sortedDays[0]?.count / player?.count_missions >= .4) {
                achs.push({
                    name: `Joueur du ${sortedDays[0].day}`,
                    icon: "",
                    desc: `A joué ${(sortedDays[0].count / player.count_missions * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}% de ses missions le ${sortedDays[0].day}`
                });
            }

            const sortedRoles = Object.keys(player.roles.roles_count).map((key, i) => ({
                name: key,
                count: Object.values(player?.roles.roles_count)[i]
            })).sort((a, b) => b.count - a.count);
            if (sortedRoles[0]?.count / player?.count_missions >= .4) {
                achs.push({
                    name: `Éternel ${sortedRoles[0].name}`,
                    icon: "",
                    desc: `A joué ${(sortedRoles[0].count / player.count_missions * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}% de ses missions en tant que ${sortedRoles[0].name}`
                });
            }
        }
        setAchivements(achs);
    }, [player]);

    return (
        <>
            {achivements.map((a, id) => (
                <>
                    <Card key={id} data-tip={a.desc}>
                        <h4>{a.name}</h4>
                    </Card>
                    <ReactTooltip />
                </>
            ))}
        </>
    );
}

export default Achivements;