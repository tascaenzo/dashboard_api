import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AService } from '@/utils/crud/AService';
import { SessionDocument } from './session.schema';
import { SessionDto } from './session.dto';
import { SessionConverter } from './session.converter';
import { Model } from 'mongoose';

@Injectable()
export class SessionService extends AService<SessionDocument, SessionDto> {
  constructor(
    @InjectModel('Session')
    protected readonly repository: Model<SessionDocument>,
    protected readonly converter: SessionConverter,
  ) {
    super(repository, converter);
  }
}
