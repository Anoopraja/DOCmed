
import { useState } from "react";
import {
  Search,
  Star,
  Clock,
  MapPin,
  CalendarDays,
  X,
  CreditCard,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialization: "Cardiologist",
    experience: "12 Years",
    fee: 700,
    rating: 4.9,
    reviews: 124,
    location: "Patna, Bihar",
    available: "Available Today",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    specialization: "Dermatologist",
    experience: "8 Years",
    fee: 500,
    rating: 4.8,
    reviews: 98,
    location: "Samastipur, Bihar",
    available: "Available Today",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
  },
  {
    id: 3,
    name: "Dr. Amit Kumar",
    specialization: "General Physician",
    experience: "10 Years",
    fee: 400,
    rating: 4.7,
    reviews: 86,
    location: "Darbhanga, Bihar",
    available: "Available Tomorrow",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
  },
  {
    id: 4,
    name: "Dr. Neha Verma",
    specialization: "Pediatrician",
    experience: "7 Years",
    fee: 600,
    rating: 4.9,
    reviews: 112,
    location: "Patna, Bihar",
    available: "Available Today",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
  },
  {
    id: 5,
    name: "Dr. Vikash Kumar",
    specialization: "Neurologist",
    experience: "15 Years",
    fee: 900,
    rating: 4.9,
    reviews: 156,
    location: "Patna, Bihar",
    available: "Available Today",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
  },
  {
    id: 6,
    name: "Dr. Anjali Gupta",
    specialization: "Gynecologist",
    experience: "9 Years",
    fee: 650,
    rating: 4.8,
    reviews: 105,
    location: "Darbhanga, Bihar",
    available: "Available Tomorrow",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
  },
];

const Doctor = () => {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialization}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const closeModal = () => {
    setSelectedDoctor(null);
    setAppointmentDate("");
    setAppointmentTime("");
  };

  const handlePayment = () => {
    if (!appointmentDate || !appointmentTime) {
      alert("Please select appointment date and time");
      return;
    }

    // Integrate Razorpay backend here.
    alert("Razorpay payment integration is pending.");
  };

  return (
    <div className="min-h-screen bg-[#0B0F0E] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-400">
            <Stethoscope size={18} />
            DOCmed Healthcare
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Consult with Expert{" "}
            <span className="text-green-500">Doctors</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Find experienced doctors, book appointments, and get
            professional healthcare consultations from anywhere.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex max-w-xl items-center gap-3 rounded-xl border border-[#26332D] bg-[#151C19] px-4 py-3 transition focus-within:border-green-500">
          <Search size={20} className="text-green-500" />

          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Section Heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">
              Available Doctors
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a doctor for your consultation
            </p>
          </div>

          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
            {filteredDoctors.length} Doctors Found
          </span>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group overflow-hidden rounded-2xl border border-[#26332D] bg-[#151C19] transition duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/5"
            >
              {/* Doctor Image */}
              <div className="relative flex justify-center bg-[#19251E] pt-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-36 w-36 rounded-full border-4 border-[#26332D] object-cover transition duration-300 group-hover:border-green-500/50"
                />

                <span className="absolute right-4 top-4 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  Verified
                </span>
              </div>

              {/* Doctor Information */}
              <div className="p-5">

                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    {doctor.specialization}
                  </span>

                  <span className="flex items-center gap-1 text-sm font-semibold text-orange-400">
                    <Star size={15} fill="currentColor" />
                    {doctor.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {doctor.name}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {doctor.experience} Experience
                </p>

                <div className="my-4 space-y-3 text-sm text-gray-400">

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-green-500" />
                    {doctor.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-green-500" />
                    {doctor.available}
                  </p>

                  <p className="flex items-center gap-2">
                    <Star size={16} className="text-orange-400" />
                    {doctor.reviews} Patient Reviews
                  </p>
                </div>

                {/* Fee and Booking */}
                <div className="flex items-center justify-between border-t border-[#26332D] pt-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Consultation Fee
                    </p>

                    <p className="mt-1 text-xl font-bold text-green-400">
                      ₹{doctor.fee}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="rounded-2xl border border-[#26332D] bg-[#151C19] py-16 text-center">
            <Stethoscope
              size={40}
              className="mx-auto mb-4 text-gray-600"
            />

            <h3 className="text-lg font-semibold text-white">
              No Doctors Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with another name or specialization.
            </p>
          </div>
        )}

        {/* Booking Modal */}
        {selectedDoctor && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="relative my-auto w-full max-w-md rounded-2xl border border-[#26332D] bg-[#151C19] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-5 top-5 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-white">
                Book Consultation
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Schedule your appointment with the doctor.
              </p>

              {/* Selected Doctor */}
              <div className="my-6 flex items-center gap-4 rounded-xl border border-green-500/20 bg-[#19251E] p-4">

                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="h-16 w-16 rounded-full border-2 border-green-500/30 object-cover"
                />

                <div className="min-w-0">
                  <h3 className="truncate font-bold text-white">
                    {selectedDoctor.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {selectedDoctor.specialization}
                  </p>

                  <p className="mt-1 font-semibold text-green-400">
                    ₹{selectedDoctor.fee}
                  </p>
                </div>
              </div>

              {/* Appointment Date */}
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <CalendarDays
                  size={17}
                  className="mr-2 inline text-green-500"
                />
                Appointment Date
              </label>

              <input
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="mb-5 w-full rounded-xl border border-[#26332D] bg-[#0B0F0E] p-3 text-white outline-none focus:border-green-500 [color-scheme:dark]"
              />

              {/* Appointment Time */}
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <Clock
                  size={17}
                  className="mr-2 inline text-green-500"
                />
                Appointment Time
              </label>

              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="mb-5 w-full rounded-xl border border-[#26332D] bg-[#0B0F0E] p-3 text-white outline-none focus:border-green-500 [color-scheme:dark]"
              />

              {/* Payment Details */}
              <div className="mb-5 rounded-xl border border-[#26332D] bg-[#0B0F0E] p-4">

                <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
                  <span>Consultation Fee</span>
                  <span>₹{selectedDoctor.fee}</span>
                </div>

                <div className="flex items-center justify-between border-t border-[#26332D] pt-3">
                  <span className="font-semibold text-white">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-green-400">
                    ₹{selectedDoctor.fee}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
              >
                <CreditCard size={19} />
                Pay ₹{selectedDoctor.fee} & Book
              </button>

              {/* Secure Payment */}
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={15} className="text-green-500" />
                Secure payment powered by Razorpay
              </p>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
