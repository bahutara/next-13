import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "~/client/trpcClient";
import { useSession } from "~/client/useSession";
import { Roles } from "../server/utils/constants";

export const useIsClassroomAdmin = (classroomId: string) => {
  const session = useSession();
  const router = useRouter();

  const classroomQuery = trpc.classroom.getClassroom.useQuery({ classroomId });

  useEffect(() => {
    if (!router) return;
    if (classroomQuery.isLoading) return;
    if (session.data === undefined) return;

    if (
      session.data?.user.role !== Roles.Teacher ||
      classroomQuery.data?.userId !== session.data.user.id
    ) {
      router.push("/");
    }
  }, [classroomQuery, router, session]);
};
