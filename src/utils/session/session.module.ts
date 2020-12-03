import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SessionSchema } from './session.schema';
import { SessionController } from './session.controller';
import { SessionConverter } from './session.converter';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  controllers: [SessionController],
  providers: [SessionConverter, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
