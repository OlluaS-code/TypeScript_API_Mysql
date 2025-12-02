import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';

export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  
  public getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userRepository.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users' });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userRepository.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedUser = await this.userRepository.update(id, req.body);
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await this.userRepository.delete(id);
      if (!success) return res.status(404).json({ message: 'User not found' });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  };
}
