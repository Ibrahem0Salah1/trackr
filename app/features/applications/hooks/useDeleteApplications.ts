import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplications } from "../api/client";
import type { PaginatedApplications } from "../types";

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) => deleteApplications(ids),

    //canceling any in-flight fetching so it doesn't break the quieresState
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });
      // Snapshot every cached page before we touch anything
      const previousQueries = queryClient.getQueriesData<PaginatedApplications>(
        {
          queryKey: ["applications"],
        },
      );
      // Set of ids to delete — O(1) lookup instead of O(n) for each row
      const deletedSet = new Set(ids);
      // Update every cached page simultaneously
      queryClient.setQueriesData<PaginatedApplications>(
        { queryKey: ["applications"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((app) => !deletedSet.has(app.id)),
            meta: {
              ...old.meta,
              total: old.meta.total - ids.length,
              pageCount: Math.ceil(
                (old.meta.total - ids.length) / old.meta.perPage,
              ),
            },
          };
        },
      );
      return { previousQueries };
    },
    onError: (_err, _ids, context) => {
      // Something went wrong — restore everything to what it was
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      // Whether success or failure — sync with server truth
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
