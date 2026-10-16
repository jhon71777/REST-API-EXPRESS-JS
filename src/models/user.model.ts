export type Rol = 'estudiante' | 'docente' | 'administrador';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
  activo: boolean;
}

// "Base de datos" temporal en memoria
export const usuarios: Usuario[] = [];