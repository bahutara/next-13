import { z } from "zod";
import { prisma } from "../prisma";
import { privateProcedure, /*publicProcedure,*/ router } from "../trpc";

export const classroomRouter = router({
  getClassroom: privateProcedure
    .input(z.object({ classroomId: z.string() }))
    .query(async ({ input }) => {
      const classroom = await prisma.classroom.findUnique({
        where: {
          id: input.classroomId,
        },
      });
      return classroom;
    }),
});
