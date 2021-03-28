import React from 'react';
import styled from '@emotion/styled';

import IPlayerType from '@/models/IPlayerType';
import ReactTooltip from 'react-tooltip';

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
            if (player.total_player_mission_status.SUCCES_Mort / player.total_mission_status.SUCCES > .4) {
                achs.push({
                    name: "Elle a fini sans toi",
                    icon: "",
                    desc: `Est mort dans ${(player.total_player_mission_status.SUCCES_Mort / player.total_mission_status.SUCCES * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}% de ses missions accomplies`
                });
            }

            if (player.count_missions > 400) {
                achs.push({
                    name: "Petit joueur",
                    icon: "",
                    desc: `A joué seulement ${player.count_missions} missions`
                });
            }

            const sortedRoles = Object.keys(player.roles.roles_count).map((key, i) => ({
                name: key,
                count: Object.values(player?.roles.roles_count)[i]
            })).sort((a, b) => b.count - a.count);
            if (sortedRoles[0].count / player?.count_missions > .4) {
                achs.push({
                    name: `Éternel ${sortedRoles[0].name}`,
                    icon: "",
                    desc: `A joué ${(sortedRoles[0].count / player.count_missions * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}% de ses missions en tant que ${sortedRoles[0].name}`
                });
            }
        }
        setAchivements(achs);
        ReactTooltip.rebuild();
    }, [player]);

    return (
        <>
            {achivements.map((a, id) => (
                <Card key={id} data-tip={a.desc}>
                    <h4>{a.name}</h4>
                </Card>
            ))}
        </>
    );
}

export default Achivements;
/*
<div>
                        <h3>Elle a fini sans toi</h3>
                        <p>
                            {player?.name} est mort {player?.total_player_mission_status.SUCCES_Mort} fois alors
                    que la mission s&apos;est soldé par un succès,<br /> ce qui représente {((player?.total_player_mission_status.SUCCES_Mort / player?.total_mission_status.SUCCES) * 100)
                                .toLocaleString(undefined, { maximumFractionDigits: 0 })}% des ses missions accomplies !
                        </p>
                    </div>
 */