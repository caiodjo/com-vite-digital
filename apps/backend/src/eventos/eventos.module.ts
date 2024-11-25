import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { DbModule } from 'src/db/db.module';
import { EventosPrisma } from './eventos.prisma';

@Module({
  imports:[DbModule],
  controllers: [EventosController],
  providers: [EventosPrisma],
})
export class EventosModule {}
