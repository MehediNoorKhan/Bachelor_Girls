import About from "@/components/About";
import Hero from "@/components/Hero";
import SelectDateAndTime from "./_components/SelectDateAndTime";

export default function BookAppointment() {
  return (
    <main>
      <Hero title="Book an Appointment" />
      <About />
      <SelectDateAndTime />
    </main>
  );
}
