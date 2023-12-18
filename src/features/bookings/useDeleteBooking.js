import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success(`Booking has been deleted successfully`);
    },
    onError: (err) => {
      toast.error("Something went wrong when deleting booking");
    },
  });

  return { isDeleting, deleteBooking };
}
