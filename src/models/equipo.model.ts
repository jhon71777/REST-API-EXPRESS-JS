export type EstadoEquipo = 'operativo' | 'mantenimiento' | 'dañado';

export interface Equipo {
  id: number;
  nombre: string;
  serial: string;
  ambienteId: number;
  estado: EstadoEquipo;
}

export const equipos: Equipo[] = [];