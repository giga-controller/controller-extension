import { getAllWhitelistedUrls } from "@/database/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UsePlatformsOptions {
  whitelistedUrls: string[];
}

export default function usePlatforms(): UsePlatformsOptions {
  const { data, error, isLoading } = useQuery<string[]>({
    queryKey: ["getWhitelistedUrls"],
    queryFn: getAllWhitelistedUrls,
    refetchOnWindowFocus: false,
  });

  return {
    whitelistedUrls: data ?? [""],
  };
}
