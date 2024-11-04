
export interface Player {
    id: number;
    long_name: string;
    fifa_version: string;
    player_face_url?: string;
    player_positions: string;
    club_name: string;
    nationality_name: string;
    overall: number;
    age: number;
    height_cm?: number;
    weight_kg?: number;
    preferred_foot?: string;
    skill_moves?: number;
    weak_foot?: number;
  }
  