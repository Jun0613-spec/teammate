import { useQuery } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface useGetUrlProps {
  storageId: Id<"_storage">;
}

export const useGetUrl = ({ storageId }: useGetUrlProps) => {
  const data = useQuery(api.upload.getUrl, { storageId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
