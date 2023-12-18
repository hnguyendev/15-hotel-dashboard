import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        `Account successfully created! 
        Please verrify account from user's email address`
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, signup };
}
