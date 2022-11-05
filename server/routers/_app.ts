/**
 * This file contains the root router of your tRPC-backend
 */
import { privateProcedure, publicProcedure, router } from "../trpc";
import { classroomRouter } from "./classroom";
import { healthRouter } from "./health";
import { postRouter } from "./post";

export const appRouter = router({
  post: postRouter,
  health: healthRouter,
  whoami: publicProcedure.query(({ ctx }) => ctx.user),
  secret: privateProcedure.query(() => "cow level"),
  classroom: classroomRouter
});

export type AppRouter = typeof appRouter;
