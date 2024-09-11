import { useMutation } from "@apollo/client";
import { MutationCreateApartmentArgs } from "~/graphql/generated/graphql";
import { CREATE_APARTMENT_MUTATION } from "~/graphql/queries/create-apartment";

export function useCreateApartment() {
  const [createApartment, { data, loading, error }] = useMutation(
    CREATE_APARTMENT_MUTATION
  );

  const create = async (variables: MutationCreateApartmentArgs) => {
    try {
      const response = await createApartment({ variables });
      return response.data?.createApartment;
    } catch (err) {
      console.error("Error creating apartment:", err);
      throw err;
    }
  };

  return {
    create,
    data,
    loading,
    error,
  };
}
