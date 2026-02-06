import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findById(id);

      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updatedUser = await this.userService.update(id, req.body);

      if (!updatedUser)
        return res.status(404).json({ message: "Usuário não encontrado" });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const success = await this.userService.delete(id);

      if (!success)
        return res.status(404).json({ message: "Usuário não encontrado" });

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  };
}
