import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        active: true,
      });
      toast.success(`Booking ${data.id} has successfully checked out`);
      navigate("/");
    },
    onError: (err) => toast.error(`Something went wrong when check out`),
  });

  return { isCheckingOut, checkout };
}
