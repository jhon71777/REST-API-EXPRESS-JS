import { Request, Response } from 'express';
import { usuarios, Usuario } from '../models/user.model';

export class UserController {
  // GET /users
  public static getUsers = (req: Request, res: Response): void => {
    res.status(200).json(usuarios.filter(u => u.activo));
  };

  // POST /users
  public static createUser = (req: Request, res: Response): void => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      res.status(400).json({ success: false, message: 'nombre, email, password y rol son obligatorios' });
      return;
    }

    const nuevo: Usuario = { id: usuarios.length + 1, nombre, email, password, rol, activo: true };
    usuarios.push(nuevo);
    res.status(201).json(nuevo);
  };

  // GET /users/:id
  public static getUserById = (req: Request<{ id: string }>, res: Response): void => {
    const usuario = usuarios.find(u => u.id === Number(req.params.id) && u.activo);

    if (!usuario) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json(usuario);
  };

  // PATCH /users/:id  -> solo rol, estado de cuenta o contraseña
  public static updateUser = (req: Request<{ id: string }>, res: Response): void => {
    const usuario = usuarios.find(u => u.id === Number(req.params.id) && u.activo);

    if (!usuario) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }

    const { rol, activo, password } = req.body;
    if (rol !== undefined) usuario.rol = rol;
    if (activo !== undefined) usuario.activo = activo;
    if (password !== undefined) usuario.password = password;

    res.status(200).json(usuario);
  };

  // DELETE /users/:id  -> eliminación lógica
  public static deleteUser = (req: Request<{ id: string }>, res: Response): void => {
    const usuario = usuarios.find(u => u.id === Number(req.params.id) && u.activo);

    if (!usuario) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }

    usuario.activo = false;
    res.status(200).json({ success: true, message: 'Usuario desactivado' });
  };
}