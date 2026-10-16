import { Request, Response } from 'express';
import { novedades, Novedad } from '../models/novedad.model';

export class NovedadController {
  // POST /novedades
  public static createNovedad = (req: Request, res: Response): void => {
    const { descripcion, prioridad, equipoId, ambienteId } = req.body;

    if (!descripcion || !prioridad) {
      res.status(400).json({ success: false, message: 'descripcion y prioridad son obligatorias' });
      return;
    }

    // Debe estar asociada a un equipo o a un ambiente
    if (!equipoId && !ambienteId) {
      res.status(400).json({ success: false, message: 'Indica equipoId o ambienteId' });
      return;
    }

    const nueva: Novedad = {
      id: novedades.length + 1,
      descripcion,
      prioridad,
      estado: 'pendiente',
      equipoId,
      ambienteId,
      fecha: new Date().toISOString()
    };
    novedades.push(nueva);
    res.status(201).json(nueva);
  };

  // GET /novedades  -> historial completo
  public static getNovedades = (req: Request, res: Response): void => {
    res.status(200).json(novedades);
  };

  // PATCH /novedades/:id  -> solo el estado
  public static updateEstadoNovedad = (req: Request<{ id: string }>, res: Response): void => {
    const novedad = novedades.find(n => n.id === Number(req.params.id));

    if (!novedad) {
      res.status(404).json({ success: false, message: 'Novedad no encontrada' });
      return;
    }

    const { estado } = req.body;
    if (!estado) {
      res.status(400).json({ success: false, message: 'El estado es obligatorio' });
      return;
    }

    novedad.estado = estado;
    res.status(200).json(novedad);
  };
}