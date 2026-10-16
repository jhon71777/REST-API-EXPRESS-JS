import { Request, Response } from 'express';
import { usuarios } from '../models/user.model';
import { ambientes } from '../models/ambiente.model';
import { equipos } from '../models/equipo.model';
import { novedades } from '../models/novedad.model';

export class DashboardController {
  // GET /dashboard/resumen
  public static getResumen = (req: Request, res: Response): void => {
    res.status(200).json({
      usuarios: usuarios.filter(u => u.activo).length,
      ambientesActivos: ambientes.filter(a => a.estado === 'operativo').length,
      equiposOperativos: equipos.filter(e => e.estado === 'operativo').length,
      novedadesCriticas: novedades.filter(n => n.prioridad === 'critica' && n.estado !== 'resuelto').length
    });
  };
}