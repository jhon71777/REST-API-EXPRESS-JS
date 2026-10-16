export type EstadoAmbiente = 'operativo' | 'mantenimiento' | 'inactivo';

export interface Ambiente {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  estado: EstadoAmbiente;
}

export const ambientes: Ambiente[] = [];