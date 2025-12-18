import About from "@/components/About";
import Hero from "@/components/Hero";
import RescheduleDateTime from "./_components/RescheduleDateTime";

export default function RescheduleAppointment() {
  return (
    <main>
      <Hero title="Reschedule Your Appointment" />
      <About />
      <RescheduleDateTime />
    </main>
  );
}
