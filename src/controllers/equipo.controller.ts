import { Request, Response } from 'express';
import { equipos, Equipo } from '../models/equipo.model';
import { ambientes } from '../models/ambiente.model';

export class EquipoController {
  // POST /equipos
  public static createEquipo = (req: Request, res: Response): void => {
    const { nombre, serial, ambienteId } = req.body;

    if (!nombre || !serial || !ambienteId) {
      res.status(400).json({ success: false, message: 'nombre, serial y ambienteId son obligatorios' });
      return;
    }

    // El equipo debe quedar vinculado a un ambiente que exista
    if (!ambientes.some(a => a.id === Number(ambienteId))) {
      res.status(404).json({ success: false, message: 'El ambiente indicado no existe' });
      return;
    }

    const nuevo: Equipo = { id: equipos.length + 1, nombre, serial, ambienteId: Number(ambienteId), estado: 'operativo' };
    equipos.push(nuevo);
    res.status(201).json(nuevo);
  };

  // GET /equipos  o  GET /equipos?ambienteId=1
  public static getEquipos = (req: Request, res: Response): void => {
    const { ambienteId } = req.query;

    if (ambienteId) {
      res.status(200).json(equipos.filter(e => e.ambienteId === Number(ambienteId)));
      return;
    }
    res.status(200).json(equipos);
  };

  // PATCH /equipos/:id  -> solo estado técnico o ubicación (ambienteId)
  public static updateEquipo = (req: Request<{ id: string }>, res: Response): void => {
    const equipo = equipos.find(e => e.id === Number(req.params.id));

    if (!equipo) {
      res.status(404).json({ success: false, message: 'Equipo no encontrado' });
      return;
    }

    const { estado, ambienteId } = req.body;
    if (estado !== undefined) equipo.estado = estado;
    if (ambienteId !== undefined) equipo.ambienteId = Number(ambienteId);

    res.status(200).json(equipo);
  };
}