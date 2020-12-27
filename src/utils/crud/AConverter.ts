/* eslint-disable @typescript-eslint/no-unused-vars */
import { IConverter } from './IConverter';

/**************************************************
 *             OVERAID toDto, toSchema            *
 **************************************************/

export abstract class AConverter<Schema, Dto>
  implements IConverter<Schema, Dto> {
  async toDto(schema: Schema): Promise<Dto> {
    throw new Error('Method not implemented.');
  }

  async toSchema(dto: Dto): Promise<Schema> {
    throw new Error('Method not implemented.');
  }

  async toSchemaList(dtoList: Dto[]): Promise<Schema[]> {
    const tmp: Schema[] = [];
    for (const dto of dtoList) {
      tmp.push(await this.toSchema(dto));
    }
    return tmp;
  }

  async toDtoList(schemaList: Schema[]): Promise<Dto[]> {
    const tmp: Dto[] = [];
    for (const schema of schemaList) {
      tmp.push(await this.toDto(schema));
    }
    return tmp;
  }
}
