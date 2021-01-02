export interface IController<Dto> {
  create(dto: Dto): Promise<Dto>;
  findAll(): Promise<Dto[]>;
  findOne(id: string): Promise<Dto>;
  remove(
    id: string,
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }>;
  update(id: string, dto: Dto): Promise<Dto>;
}
