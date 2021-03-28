import MissionType from "./MissionType";

interface IBasePlayerType {
    id: number,
    name: string,
    creation_date: string,
    formation: string,
    count_missions: number
}

interface IPlayerType extends IBasePlayerType {
    last_mission: MissionType | null,
    total_player_status: {
        Vivant: number,
        Mort: number
    },
    total_mission_status: {
        SUCCES: number,
        ECHEC: number,
        PVP: number
    },
    total_player_mission_status: {
        SUCCES_Vivant: number,
        SUCCES_Mort: number,
        ECHEC_Vivant: number,
        ECHEC_Mort: number,
        PVP_Vivant: number,
        PVP_Mort: number
    },
    roles: {
        roles_count: {
            [role: string]: number
        },
        roles_errors: { mission: number, role: string }[]
    },
    months: {
        [month: string]: number
    },
    days: {
        [day: string]: {
            count: number,
            Vivant: number,
            Mort: number,
            Inconnu: number,
            SUCCES: number,
            ECHEC: number,
            PVP: number
        }
    },
    updated: string
}
export interface IPlayersType extends IBasePlayerType {
    last_mission: string,
}

export default IPlayerType;