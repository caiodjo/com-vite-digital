import { Injectable } from '@nestjs/common';
import { Convidado, Evento } from 'core/dist';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class EventosPrisma {
  constructor(readonly prisma: PrismaProvider) {}

  salvar(evento: Evento) {
    return this.prisma.evento.create({
      data: {
        ...(evento as any),
        convidados: { create: evento.convidados },
      },
    });
  }

  salvarConvidado(evento: Evento, convidado: Convidado) {
    return this.prisma.convidado.create({
      data: {
        ...convidado,
        qtdeAcompanhantes: +(convidado.qtdeAcompanhantes ?? 0),
        evento: { connect: { id: evento.id } },
      },
    });
  }

  async buscarTodos(): Promise<Evento[]> {
    return this.prisma.evento.findMany() as any;
  }

  async buscarPorId(
    id: string,
    completo: boolean = false,
  ): Promise<Evento | null> {
    return this.prisma.evento.findUnique({
      where: { id },
      include: { convidados: completo },
    }) as any;
  }

  async buscarPorAlias(
    alias: string,
    completo: boolean = false,
  ): Promise<Evento | null> {
    return this.prisma.evento.findUnique({
      select: {
        id: true,
        nome: true,
        descricao: true,
        alias: true,
        data: true,
        imagem: true,
        imagemBackground: true,
        local: true,
        senha: completo,
        convidados: completo,
        publicoEsperado: completo,
      },
      where: { alias },
      // include: { convidados: completo },
    }) as any;
  }
}
