// Add the Match type to the API types
export interface Match {
  id: string;
  dateTime: string;
  homeGame: boolean;
  visitorClub: string;
  result: {
    name: 'WON' | 'LOST' | 'NOT_PLAYED';
    gamesWon: number;
    gamesLost: number;
  };
}

export interface ClubCalendar {
  clubName: string;
  matches: Match[];
}