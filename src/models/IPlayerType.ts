interface IPlayerType {
    id: number,
    name: string,
    creation_date: string,
    formation: string,
    count_missions: number
}

export interface IPlayersType extends IPlayerType {
    last_mission: string
}

export default IPlayerType;