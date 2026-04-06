//useUpdateApplication.ts hook
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplication } from "../api/client";
import type {
  Application,
  UpdateApplicationInput,
  PaginatedApplications,
} from "../types";

function patchApplication(
  old: PaginatedApplications | undefined,
  updated: Partial<Application> & { id: number },
) {
  if (!old) return old;
  return {
    ...old,
    data: old.data.map((app) =>
      app.id === updated.id ? { ...app, ...updated } : app,
    ),
  };
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateApplicationInput }) =>
      updateApplication(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });

      const previousQueries = queryClient.getQueriesData<PaginatedApplications>(
        {
          queryKey: ["applications"],
        },
      );

      queryClient.setQueriesData<PaginatedApplications>(
        { queryKey: ["applications"] },
        (old) => patchApplication(old, { id, ...data }),
      );

      return { previousQueries };
    },

    onError: (_error, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
