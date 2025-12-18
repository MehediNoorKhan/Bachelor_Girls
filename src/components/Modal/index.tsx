import ConfirmationBooking from "@/pages/BookAppointment/_components/ConfirmationBooking";
import CustomRequestForm from "@/pages/Duelist/_components/CustomRequestForm";
import RequestFullPayment from "@/pages/Duelist/_components/RequestFullPayment";
import ConfirmCancel from "@/pages/MyBookings/_components/ConfirmCancel";
import PayConfirmationModal from "@/pages/MyProfile/_components/PayConfirmationModal";
import RescheduleBookingForm from "@/pages/RescheduleAppoinment/_components/RescheduleBookingForm";
import Authentication from "../Header/_components/Authentication";
import OtpVerificationForm from "../Header/_components/OtpVerificationForm";
import SellerAuthentication from "../Header/_components/SellerAuthentication";
import useModal from "./useModal";

export default function Modals() {
  const { Modal } = useModal();
  return (
    <>
      <Modal
        modalId="modal"
        openId="authentication"
        closeModals={["tab", "redirect"]}
        className="sm:w-[45dvw]"
      >
        <Authentication />
      </Modal>

      <Modal
        modalId="modal"
        openId="seller-authentication"
        closeModals={["tab", "redirect"]}
        className="sm:w-[45dvw]"
      >
        <SellerAuthentication />
      </Modal>

      <Modal
        modalId="modal"
        openId="verify-otp"
        closeModals={["tab", "redirect", "email", "action"]}
        className="sm:w-[45dvw]"
      >
        <OtpVerificationForm />
      </Modal>

      <Modal
        modalId="modal"
        openId="booking-confirmation"
        closeModals={["date", "time"]}
        className="sm:w-[95dvw]"
      >
        <ConfirmationBooking />
      </Modal>

      <Modal
        modalId="modal"
        openId="cancel-booking"
        closeModals={["bookingId"]}
        className="sm:w-[20dvw]"
      >
        <ConfirmCancel />
      </Modal>

      <Modal
        modalId="modal"
        openId="reschedule-booking-confirmation"
        closeModals={["bookingId"]}
        className="sm:w-[20dvw]"
      >
        <RescheduleBookingForm />
      </Modal>

      <Modal
        modalId="modal"
        openId="pay-confirmation"
        closeModals={["amount", "due_id", "type"]}
        className="sm:w-[15dvw]"
      >
        <PayConfirmationModal />
      </Modal>

      <Modal
        modalId="modal"
        openId="reschedule-booking-confirmation"
        closeModals={["bookingId"]}
        className="sm:w-[20dvw]"
      >
        <RescheduleBookingForm />
      </Modal>

      <Modal
        modalId="modal"
        openId="request-payment"
        closeModals={["id"]}
        className="sm:w-[15dvw]"
      >
        <CustomRequestForm />
      </Modal>

      <Modal
        modalId="modal"
        openId="custom-request"
        closeModals={["id"]}
        className="sm:w-[15dvw]"
      >
        <RequestFullPayment />
      </Modal>
    </>
  );
}
