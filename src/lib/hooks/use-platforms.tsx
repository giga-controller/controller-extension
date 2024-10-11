import { getAllWhitelistedUrls } from "@/database/supabase";
import { Platform, platformEnum } from "@/types/platform";
import { useQuery } from "@tanstack/react-query";

interface UsePlatformsOptions {
  whitelistedUrls: Record<Platform, string[]>;
}

export default function usePlatforms(): UsePlatformsOptions {
  const { data, error, isLoading } = useQuery<Record<Platform, string[]>>({
    queryKey: ["getWhitelistedUrls"],
    queryFn: getAllWhitelistedUrls,
    refetchOnWindowFocus: false,
  });

  const baseCase = Object.fromEntries(
    Object.values(platformEnum).map((platform) => [platform, []])
  ); 
  return { whitelistedUrls: data ?? baseCase };
}
