import EMissionStatus from "./EMissionStatus";
import EPlayerStatus from "./EPlayerStatus";

type MissionType = {
    id: number,
    name: string
    map: string,
    date: string,
    duration: number,
    mission_status: EMissionStatus,
    players: number,
    end_players: number,
    role: string,
    player_status: EPlayerStatus
}

export default MissionType;