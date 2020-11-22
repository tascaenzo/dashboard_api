/* eslint-disable @typescript-eslint/no-unused-vars */
import { IConverter } from './IConverter';

/**************************************************
 *             OVERAID toDto, toSchema            *
 **************************************************/

export abstract class AConverter<Schema, Dto>
  implements IConverter<Schema, Dto> {
  toDto(schema: Schema): Dto {
    throw new Error('Method not implemented.');
  }

  toSchema(dto: Dto): Schema {
    throw new Error('Method not implemented.');
  }

  toSchemaList(dtoList: Dto[]): Schema[] {
    const tmp: Schema[] = [];
    for (const dto of dtoList) {
      tmp.push(this.toSchema(dto));
    }
    return tmp;
  }

  toDtoList(schemaList: Schema[]): Dto[] {
    const tmp: Dto[] = [];
    for (const schema of schemaList) {
      tmp.push(this.toDto(schema));
    }
    return tmp;
  }
}
