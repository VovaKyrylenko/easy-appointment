import { useQuery } from "@apollo/client";
import { Apartment } from "~/graphql/generated/graphql";
import { GET_APARTMENTS } from "~/graphql/queries/get-apartments";

interface UseApartmentsResult {
  apartments: Apartment[];
  loading: boolean;
  error: Error | undefined;
}

export const useGetApartments = (): UseApartmentsResult => {
  const { data, loading, error } = useQuery(GET_APARTMENTS);

  const apartments = data?.apartments || [];

  return { apartments, loading, error };
};
