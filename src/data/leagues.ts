// League configuration and mapping
export const LEAGUE_DISPLAY_TO_API = {
  'PREF': 'PREFERENT',
  '1a': 'PRIMERA',
  '2a A': 'SEGUNDA_A',
  '2a B': 'SEGUNDA_B',
  '3a A': 'TERCERA_A',
  '3a B': 'TERCERA_B',
  '4a': 'CUARTA'
} as const;

export const LEAGUES = [
  { id: 'PREF', name: 'PREF' },
  { id: '1a', name: '1a' },
  { id: '2a A', name: '2a A' },
  { id: '2a B', name: '2a B' },
  { id: '3a A', name: '3a A' },
  { id: '3a B', name: '3a B' },
  { id: '4a', name: '4a' }
] as const;

export type LeagueId = keyof typeof LEAGUE_DISPLAY_TO_API;