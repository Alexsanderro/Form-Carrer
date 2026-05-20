import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { insertRegistro, listRegistros } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  registros: router({
    salvar: publicProcedure
      .input(z.object({
        curso: z.string().min(1),
        periodo: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        await insertRegistro({ curso: input.curso, periodo: input.periodo });
        return { success: true };
      }),

    listar: adminProcedure
      .query(async () => {
        return listRegistros();
      }),

    exportarCsv: adminProcedure
      .query(async () => {
        const rows = await listRegistros();
        const header = "ID,Curso,Período,Data/Hora\n";
        const body = rows.map(r =>
          `${r.id},"${r.curso}","${r.periodo}","${new Date(r.createdAt).toLocaleString('pt-BR')}"`
        ).join("\n");
        return { csv: header + body };
      }),
  }),
});

export type AppRouter = typeof appRouter;
