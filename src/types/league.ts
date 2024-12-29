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