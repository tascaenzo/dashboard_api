export interface IConverter<Schema, Dto> {
  toDto(schema: Schema): Dto;
  toSchema(dto: Dto): Schema;

  toSchemaList(dtoList: Dto[]): Schema[];
  toDtoList(schemaList: Schema[]): Dto[];
}
