export type EstadoNovedad = 'pendiente' | 'en proceso' | 'resuelto';
export type Prioridad = 'baja' | 'media' | 'alta' | 'critica';

export interface Novedad {
  id: number;
  descripcion: string;
  prioridad: Prioridad;
  estado: EstadoNovedad;
  equipoId?: number;   // el "?" significa que es opcional
  ambienteId?: number;
  fecha: string;
}

export const novedades: Novedad[] = [];