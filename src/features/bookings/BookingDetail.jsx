import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking, error } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName={`booking ${bookingId}`}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: () => navigate(-1) });
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <CheckoutButton bookingId={bookingId}>Check out</CheckoutButton>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
