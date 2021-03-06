import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { COLLECTION_NAME, MediaDocument } from './media.schema';
import { MediaDto } from './media.dto';
import { MediaConverter } from './media.converter';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import stream = require('stream');
import * as util from 'util';
import { UPLOAD_DIR } from '@/utils/env.json';
import { AService } from '../crud/AService';

@Injectable()
export class MediaService extends AService<MediaDocument, MediaDto> {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    @InjectModel(COLLECTION_NAME)
    protected readonly repository: Model<MediaDocument>,
    protected readonly converter: MediaConverter,
  ) {
    super(repository, converter);
  }

  async uploadFile(req: any) {
    if (!req.isMultipart) {
      //validate error
      throw new Error();
    }

    try {
      await req.multipart(this.handler, onEnd);
    } catch (e) {
      this.logger.error(e);
    }

    async function onEnd(err: any) {
      if (err) {
        return;
      }
      return { 'Data uploaded successfully': 'ok' };
    }
  }
  //Save files in directory
  async handler(field: string, file: any, filename: string): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(`${UPLOAD_DIR}/${filename}`); //File path
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      this.logger.error('Pipeline failed', err);
    }
  }
}
