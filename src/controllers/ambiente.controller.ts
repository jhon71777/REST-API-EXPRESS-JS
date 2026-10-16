import { Request, Response } from 'express';
import { ambientes, Ambiente } from '../models/ambiente.model';

export class AmbienteController {
  // GET /ambientes
  public static getAmbientes = (req: Request, res: Response): void => {
    res.status(200).json(ambientes);
  };

  // POST /ambientes
  public static createAmbiente = (req: Request, res: Response): void => {
    const { nombre, ubicacion, capacidad } = req.body;

    if (!nombre || !ubicacion || !capacidad) {
      res.status(400).json({ success: false, message: 'nombre, ubicacion y capacidad son obligatorios' });
      return;
    }

    const nuevo: Ambiente = { id: ambientes.length + 1, nombre, ubicacion, capacidad, estado: 'operativo' };
    ambientes.push(nuevo);
    res.status(201).json(nuevo);
  };

  // PATCH /ambientes/:id  -> solo capacidad, estado o ubicación
  public static updateAmbiente = (req: Request<{ id: string }>, res: Response): void => {
    const ambiente = ambientes.find(a => a.id === Number(req.params.id));

    if (!ambiente) {
      res.status(404).json({ success: false, message: 'Ambiente no encontrado' });
      return;
    }

    const { capacidad, estado, ubicacion } = req.body;
    if (capacidad !== undefined) ambiente.capacidad = capacidad;
    if (estado !== undefined) ambiente.estado = estado;
    if (ubicacion !== undefined) ambiente.ubicacion = ubicacion;

    res.status(200).json(ambiente);
  };
}