
import { useState } from "react";
import {
  Ambulance,
  Phone,
  MapPin,
  HeartPulse,
  ShieldAlert,
  Clock,
  Navigation,
  UserRound,
  AlertTriangle,
  CheckCircle,
  LoaderCircle,
  Copy,
} from "lucide-react";

const Emergency = () => {
  const [location, setLocation] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [patient, setPatient] = useState({
    name: "",
    phone: "",
    emergencyType: "Medical Emergency",
    details: "",
  });

  const [copied, setCopied] = useState(false);

  // Get patient's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(`${latitude}, ${longitude}`);
        setLocationLoading(false);
      },
      () => {
        setLocationError(
          "Unable to access location. Please allow location permission."
        );
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  // Copy emergency information
  const copyEmergencyDetails = async () => {
    const details = `
DOCmed Emergency Information

Patient Name: ${patient.name || "Not provided"}
Phone: ${patient.phone || "Not provided"}
Emergency Type: ${patient.emergencyType}
Details: ${patient.details || "Not provided"}
Location: ${location || "Not available"}
    `;

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setLocationError("Unable to copy information.");
    }
  };

  const emergencyTypes = [
    "Medical Emergency",
    "Accident / Injury",
    "Heart Problem",
    "Breathing Problem",
    "Severe Bleeding",
    "Other Emergency",
  ];

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-[#101713] text-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#291b17] via-[#171d19] to-[#101713] px-5 py-16 sm:px-8 lg:px-12">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Emergency Assistance
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Need Medical Help?
            <span className="block text-[#b5f36d]">
              We're Here for You.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            In a medical emergency, every second matters.
            Contact emergency services or call an ambulance immediately.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <a
              href="tel:112"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-500 px-7 py-4 font-bold text-white transition hover:bg-red-600"
            >
              <Phone size={21} />
              Call Emergency 112
            </a>

            <a
              href="tel:108"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#b5f36d] px-7 py-4 font-bold text-[#152019] transition hover:bg-orange-400"
            >
              <Ambulance size={22} />
              Call Ambulance 108
            </a>

          </div>

          <p className="mt-4 text-xs text-gray-500">
            Emergency numbers may have different service availability by location.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">

        {/* EMERGENCY CONTACT CARDS */}
        <section className="grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl border border-red-500/20 bg-[#1b211e] p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-500/10 p-4 text-red-400">
                <ShieldAlert size={28} />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  National Emergency Number
                </p>
                <h2 className="text-3xl font-bold">112</h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Call 112 for urgent police, fire and medical emergency assistance.
            </p>

            <a
              href="tel:112"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold transition hover:bg-red-600"
            >
              <Phone size={18} />
              Call 112
            </a>
          </div>

          <div className="rounded-2xl border border-[#b5f36d]/20 bg-[#1b211e] p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[#b5f36d]/10 p-4 text-[#b5f36d]">
                <Ambulance size={28} />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Ambulance Helpline
                </p>
                <h2 className="text-3xl font-bold">108</h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Call 108 to contact ambulance services where this service is available.
            </p>

            <a
              href="tel:108"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#b5f36d] py-3 font-bold text-[#152019] transition hover:bg-orange-400"
            >
              <Phone size={18} />
              Call 108
            </a>
          </div>

        </section>

        {/* PATIENT INFORMATION */}
        <section className="mt-14 grid gap-8 lg:grid-cols-5">

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#b5f36d]">
                Emergency Details
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Patient Information
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Fill in the details to prepare emergency information for responders.
                This form does not dispatch an ambulance.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1b211e] p-6 sm:p-8">

              <div className="grid gap-5 sm:grid-cols-2">

                {/* PATIENT NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Patient Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="text"
                      name="name"
                      value={patient.name}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full rounded-xl border border-white/10 bg-[#101713] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b5f36d]"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Contact Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={patient.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-white/10 bg-[#101713] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b5f36d]"
                    />
                  </div>
                </div>

                {/* EMERGENCY TYPE */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Emergency Type
                  </label>

                  <select
                    name="emergencyType"
                    value={patient.emergencyType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-white outline-none focus:border-[#b5f36d]"
                  >
                    {emergencyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DETAILS */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Additional Information
                  </label>

                  <textarea
                    name="details"
                    value={patient.details}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the emergency briefly..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-[#b5f36d]"
                  />
                </div>

              </div>

              {/* LOCATION */}
              <div className="mt-6 rounded-xl border border-white/10 bg-[#101713] p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold">Patient Location</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Share your current GPS coordinates
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#b5f36d]/30 px-4 py-3 text-sm font-semibold text-[#b5f36d] transition hover:bg-[#b5f36d]/10 disabled:opacity-50"
                  >
                    {locationLoading ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Navigation size={17} />
                    )}

                    {locationLoading ? "Getting Location..." : "Get Location"}
                  </button>

                </div>

                {location && (
                  <div className="mt-4 break-all rounded-lg bg-[#b5f36d]/10 p-3 text-sm text-[#b5f36d]">
                    <CheckCircle size={16} className="mr-2 inline" />
                    {location}

                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 underline"
                    >
                      View Map
                    </a>
                  </div>
                )}

                {locationError && (
                  <p className="mt-3 text-sm text-red-400">
                    {locationError}
                  </p>
                )}

              </div>

              {/* COPY DETAILS */}
              <button
                type="button"
                onClick={copyEmergencyDetails}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b5f36d] py-4 font-bold text-[#152019] transition hover:bg-orange-400"
              >
                {copied ? (
                  <>
                    <CheckCircle size={19} />
                    Details Copied
                  </>
                ) : (
                  <>
                    <Copy size={19} />
                    Copy Emergency Details
                  </>
                )}
              </button>

            </div>
          </div>

          {/* EMERGENCY GUIDANCE */}
          <aside className="lg:col-span-2">

            <div className="rounded-2xl border border-orange-400/20 bg-[#1b211e] p-6">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
                  <AlertTriangle size={23} />
                </div>

                <h2 className="text-xl font-bold">
                  Emergency Guidelines
                </h2>
              </div>

              <div className="mt-6 space-y-6">

                <div className="flex gap-3">
                  <Phone className="mt-1 shrink-0 text-[#b5f36d]" size={19} />
                  <div>
                    <h3 className="font-semibold">Call for Help</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Contact emergency services immediately. Give your exact location.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <HeartPulse className="mt-1 shrink-0 text-red-400" size={19} />
                  <div>
                    <h3 className="font-semibold">Stay With the Patient</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Keep the patient safe and follow the emergency operator's instructions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-orange-400" size={19} />
                  <div>
                    <h3 className="font-semibold">Share Your Location</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Provide a clear address, nearby landmark and GPS location.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="mt-1 shrink-0 text-blue-400" size={19} />
                  <div>
                    <h3 className="font-semibold">Don't Delay</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Do not wait for a website response before calling emergency services.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* IMPORTANT NOTICE */}
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="flex items-center gap-2 font-bold text-red-400">
                <AlertTriangle size={19} />
                Important Notice
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                DOCmed is not a substitute for emergency medical services.
                In a life-threatening situation, call 112 or your local ambulance
                service immediately. Do not wait for online assistance.
              </p>
            </div>

          </aside>

        </section>

        {/* BOTTOM CTA */}
        <section className="mt-14 rounded-3xl border border-[#b5f36d]/20 bg-gradient-to-r from-[#1b2c20] to-[#1b211e] p-8 text-center sm:p-12">

          <Ambulance className="mx-auto text-[#b5f36d]" size={48} />

          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
            Every Second Matters.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
            If someone needs urgent medical attention, contact emergency
            services now.
          </p>

          <a
            href="tel:112"
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-red-500 px-8 py-4 font-bold text-white transition hover:bg-red-600"
          >
            <Phone size={20} />
            Call Emergency Services
          </a>

        </section>

      </div>
    </main>
  );
};

export default Emergency;
