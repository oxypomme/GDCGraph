import React from "react";
import styled from "@emotion/styled";

import IPlayerType from "@/models/IPlayerType";
import ReactTooltip from "react-tooltip";

import playablesDays from "@config/playablesDays.json";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faGamepad,
  faSkull,
  faTrophy,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const Card = styled.div`
  background: var(--background-dark);
  width: 100%;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  position: relative;
  & > h4 {
    margin: 0;
    margin-left: 5px;
    display: inline;
  }
  & > svg {
    position: absolute;
    left: 10px;
  }
`;

type PropsType = {
  player: IPlayerType;
};

interface AchivementType {
  name: string;
  icon?: IconDefinition;
  desc: string;
}

const UNLOCK_PERCENT = 40 / 100;
const NB_MISSION_MIN = 400;

const Achivements = (props: PropsType): JSX.Element => {
  const { player } = props;

  const [achivements, setAchivements] = React.useState<AchivementType[]>([]);

  React.useEffect(() => {
    const achs: AchivementType[] = [];
    if (player) {
      if (
        player.total_player_mission_status.SUCCES_Mort /
          player.total_mission_status.SUCCES >=
        UNLOCK_PERCENT
      ) {
        achs.push({
          name: "Elle a fini sans toi",
          icon: faSkull,
          desc: `Est mort dans ${(
            (player.total_player_mission_status.SUCCES_Mort /
              player.total_mission_status.SUCCES) *
            100
          ).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}% de ses missions accomplies`,
        });
      }

      if (player.count_missions >= NB_MISSION_MIN) {
        achs.push({
          name: "Petit joueur",
          icon: faGamepad,
          desc: `A joué seulement ${player.count_missions} missions`,
        });
      }

      const sortedDays = Object.keys(player.days)
        .map((key, i) => ({
          day: dayjs().day(parseInt(key)).format("dddd"),
          count: Object.values(player.days)[i].count,
        }))
        .sort((a, b) => b.count - a.count);
      if (sortedDays[0]?.count / player?.count_missions >= UNLOCK_PERCENT) {
        achs.push({
          name: `Joueur du ${sortedDays[0].day}`,
          icon: faCalendarDay,
          desc: `A joué ${(
            (sortedDays[0].count / player.count_missions) *
            100
          ).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}% de ses missions le ${sortedDays[0].day}`,
        });
      }

      const sortedRoles = Object.keys(player.roles.roles_count)
        .map((key, i) => ({
          name: key,
          count: Object.values(player?.roles.roles_count)[i],
        }))
        .sort((a, b) => b.count - a.count);
      if (sortedRoles[0]?.count / player?.count_missions >= UNLOCK_PERCENT) {
        achs.push({
          name: `Éternel ${sortedRoles[0].name}`,
          desc: `A joué ${(
            (sortedRoles[0].count / player.count_missions) *
            100
          ).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}% de ses missions en tant que ${sortedRoles[0].name}`,
        });
      }

      let leaderCount = 0;
      for (const role of sortedRoles) {
        if (role.name.includes("Leader")) {
          leaderCount += role.count;
        }
      }
      if (leaderCount / player?.count_missions >= UNLOCK_PERCENT) {
        achs.push({
          name: "Leader un jour, Leader toujours",
          desc: `A joué ${(
            (leaderCount / player.count_missions) *
            100
          ).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}% de ses missions en tant que Leader (SL, TL ou Leader)`,
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
            <FontAwesomeIcon icon={a.icon || faTrophy} />
            <h4>{a.name}</h4>
          </Card>
          <ReactTooltip />
        </>
      ))}
    </>
  );
};

export default Achivements;
