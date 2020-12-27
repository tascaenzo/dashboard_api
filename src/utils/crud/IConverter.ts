export interface IConverter<Schema, Dto> {
  toDto(schema: Schema): Promise<Dto>;
  toSchema(dto: Dto): Promise<Schema>;

  toSchemaList(dtoList: Dto[]): Promise<Schema[]>;
  toDtoList(schemaList: Schema[]): Promise<Dto[]>;
}
