import { ITask } from "../entities/task-entity";

export interface ITaskRepository {
  create(data: ITask): Promise<ITask>;
  list(): Promise<ITask[]>;
  findById(id: number): Promise<ITask | null>;
  update(data: Partial<ITask>): Promise<ITask | null>;
  delete(id: number): Promise<ITask | null>;
}
