// app/features/applications/hooks/useCreateApplication.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "../api/client";
import { CreateApplicationInput, PaginatedApplications } from "../types";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationInput) => createApplication(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
