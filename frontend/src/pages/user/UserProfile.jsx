
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  UserRound,
  Mail,
  Phone,
  ShoppingBag,
  Heart,
  LogOut,
  ArrowRight,
  Package,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  CalendarDays,
  Plus,
  Pencil,
  X,
  Save,
  MapPin,
  CheckCircle,
} from "lucide-react";

import api from "../../../api/api.js";

const initialFormData = {
  username: "",
  gmail: "",
  phone: "",
  profileImage: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const [addresses, setAddresses] = useState([]);
// const [saveAdress, setSaveAddress] = useState([])
const [showAddressModal, setShowAddressModal] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);
const [addressLoading, setAddressLoading] = useState(false);
const [addressForm, setAddressForm] = useState({
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  addressType: "Home",
});
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Initialize form data
  const initializeForm = (userData) => {
    setFormData({
      username: userData.username || "",
      gmail: userData.gmail || "",
      phone: userData.phone || "",
      profileImage: userData.profileImage || "",
      addresses: userData.addresses || [],
    });
  };

  const openAddAddress = () => {
  setEditingAddress(null);

  setAddressForm({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "Home",
  });

  setShowAddressModal(true);
};

const openEditAddress = (address) => {
  setEditingAddress(address);

  setAddressForm({
    fullName: address.fullName || "",
    phone: address.phone || "",
    addressLine: address.addressLine || "",
    city: address.city || "",
    state: address.state || "",
    pincode: address.pincode || "",
    landmark: address.landmark || "",
    addressType: address.addressType || "Home",
  });

  setShowAddressModal(true);
};
  // Fetch logged-in user profile
  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/user/me");

      if (data.success) {
        setUser(data.user);
        initializeForm(data.user);
      } else {
        setError(data.message || "Unable to load profile.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user profile
  const UpdateUser = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const { data } = await api.put(
        `/user/updateprofile/${user._id}`,
        formData
      );

      if (!data.success) {
        throw new Error(data.message || "Profile update failed.");
      }

      setUser(data.data);
      initializeForm(data.data);

      setIsEditing(false);
      setSuccess("Profile updated successfully!");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to update profile."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    initializeForm(user);
    setIsEditing(false);
    setError("");
  };

  // Logout user
  const handleLogout = async () => {
    try {
      await api.post("/user/logout");

      setUser(null);
      navigate("/user/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to logout. Please try again."
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#101713] flex flex-col items-center justify-center text-white">
        <LoaderCircle className="w-10 h-10 text-[#b5f36d] animate-spin" />
        <p className="mt-4 text-gray-400">Loading your profile...</p>
      </div>
    );
  }

  // Authentication error
  if (!user) {
    return (
      <div className="min-h-screen bg-[#101713] flex items-center justify-center px-5">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-[#18231c] p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-orange-400" />

          <h2 className="mt-4 text-2xl font-bold text-white">
            Profile unavailable
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            {error || "Please login to view your profile."}
          </p>

          <Link
            to="/user/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#b5f36d] px-6 py-3 font-bold text-[#152019] transition hover:bg-orange-400"
          >
            Login to continue
          </Link>
        </div>
      </div>
    );
  }

  const fullName = user.username || "DOCmed Buyer";
  const email = user.gmail || "Email not available";
  const phone = user.phone || "Not added yet";

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  // Quick navigation links
  const quickLinks = [
    {
      title: "My Orders",
      description: "Track and manage your orders",
      icon: Package,
      path: "/user/orders",
      color: "text-[#b5f36d]",
      bg: "bg-[#b5f36d]/10",
    },
    {
      title: "Wishlist",
      description: "Your saved medicines",
      icon: Heart,
      path: "/wishlist",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Shopping Cart",
      description: "View your selected products",
      icon: ShoppingBag,
      path: "/cart",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <main className="min-h-screen bg-[#101713] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b5f36d]">
            DOCmed / Account
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your personal information and healthcare activities.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
            <CheckCircle size={20} />
            <p className="text-sm">{success}</p>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            <AlertCircle size={20} />
            <p className="text-sm">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* PROFILE CARD */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#18231c]">

          {/* COVER */}
          <div className="h-36 bg-gradient-to-r from-[#263c2d] via-[#334a32] to-[#b5f36d]/30 sm:h-48" />

          <div className="px-6 pb-7 sm:px-9">

            {/* USER INFORMATION */}
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                {/* PROFILE IMAGE */}
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#18231c] bg-[#b5f36d] text-4xl font-bold text-[#152019] sm:h-28 sm:w-28">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    fullName.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold">
                    {fullName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {email}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#b5f36d]/20 bg-[#b5f36d]/10 px-3 py-1 text-xs font-semibold text-[#b5f36d]">
                    <ShieldCheck size={14} />
                    Buyer Account
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    initializeForm(user);
                    setIsEditing(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b5f36d] px-5 py-3 text-sm font-semibold text-[#152019] transition hover:bg-orange-400"
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <section className="mt-9">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Your registered account details.
            </p>
          </div>

          {isEditing ? (
            /* EDIT PROFILE FORM */
            <form
              onSubmit={UpdateUser}
              className="space-y-5 rounded-2xl border border-white/10 bg-[#18231c] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">

                {/* USERNAME */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-white outline-none transition focus:border-[#b5f36d]"
                  />
                </div>

                {/* GMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="gmail"
                    value={formData.gmail}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-white outline-none transition focus:border-[#b5f36d]"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-white outline-none transition focus:border-[#b5f36d]"
                  />
                </div>

                {/* PROFILE IMAGE */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Profile Image URL
                  </label>

                  <input
                    type="url"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-white outline-none transition focus:border-[#b5f36d]"
                  />
                </div>
              </div>

              {/* IMAGE PREVIEW */}
              {formData.profileImage && (
                <div className="flex items-center gap-4">
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                    className="h-16 w-16 rounded-xl border border-white/10 object-cover"
                  />
                  <p className="text-sm text-gray-400">
                    Profile image preview
                  </p>
                </div>
              )}

              {/* FORM ACTIONS */}
              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#b5f36d] px-6 py-3 font-bold text-[#152019] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}

                  {updating ? "Updating..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={updating}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* PROFILE DETAILS */
            <div className="grid gap-4 sm:grid-cols-2">

              {/* NAME */}
              <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#b5f36d]/10 p-3 text-[#b5f36d]">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Full Name
                    </p>
                    <p className="mt-1 font-semibold">
                      {fullName}
                    </p>
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
                    <Mail size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Email Address
                    </p>
                    <p className="mt-1 break-all font-semibold">
                      {email}
                    </p>
                  </div>
                </div>
              </div>

              {/* PHONE */}
              <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-400/10 p-3 text-blue-400">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Phone Number
                    </p>
                    <p className="mt-1 font-semibold">
                      {phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* JOINED DATE */}
              {/* <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-400/10 p-3 text-purple-400">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Member Since
                    </p>
                    <p className="mt-1 font-semibold">
                      {joinedDate}
                    </p>
                  </div>
                </div>
              </div> */}

            </div>
          )}
        </section>

        {/* ADDRESS SECTION */}
       
<section className="mt-10">

  {/* Header */}
  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-xl font-bold text-white">
        My Addresses
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        Manage your saved delivery addresses.
      </p>
    </div>

    <button
      onClick={openAddAddress}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b5f36d] px-5 py-3 text-sm font-bold text-[#152019] transition hover:bg-[#a5e45c]"
    >
      <Plus size={18} />
      Add Address
    </button>
  </div>

  {/* Address List */}
  {addresses.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-white/15 bg-[#18231c] px-5 py-12 text-center">

      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#b5f36d]/10 text-[#b5f36d]">
        <MapPin size={26} />
      </div>

      <h3 className="font-semibold text-white">
        No saved addresses
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Add your delivery address to make checkout easier.
      </p>

      <button
        onClick={openAddAddress}
        className="mt-5 rounded-xl bg-[#b5f36d] px-5 py-3 text-sm font-bold text-[#152019]"
      >
        Add Your First Address
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      {addresses.map((address) => (
        <article
          key={address._id}
          className="rounded-2xl border border-white/10 bg-[#18231c] p-5 transition hover:border-[#b5f36d]/40"
        >

          <div className="flex items-start justify-between gap-3">

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#b5f36d]/10 p-3 text-[#b5f36d]">
                <MapPin size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {address.addressType || "Home"}
                </h3>
                <p className="text-xs text-gray-400">
                  {address.fullName}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEditAddress(address)}
                className="rounded-lg border border-white/10 p-2 text-gray-300 transition hover:border-[#b5f36d] hover:text-[#b5f36d]"
                title="Edit address"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => deleteAddress(address._id)}
                className="rounded-lg border border-white/10 p-2 text-gray-300 transition hover:border-red-500 hover:text-red-400"
                title="Delete address"
              >
                <Trash2 size={16} />
              </button>
            </div>

          </div>

          <div className="mt-5 space-y-2 text-sm text-gray-300">
            <p>{address.addressLine}</p>

            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>

            {address.landmark && (
              <p className="text-gray-400">
                Landmark: {address.landmark}
              </p>
            )}

            <p className="pt-2 text-gray-400">
              Phone: {address.phone}
            </p>
          </div>

        </article>
      ))}

    </div>
  )}
</section>

{/* Floating Modal */}
{showAddressModal && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    onClick={() => setShowAddressModal(false)}
  >

    <div
      className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#18231c] p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Modal Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Enter your delivery details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddressModal(false)}
          className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={saveAddress} className="space-y-4">

        {/* Address Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Address Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            {["Home", "Work"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setAddressForm((prev) => ({
                    ...prev,
                    addressType: type,
                  }))
                }
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  addressForm.addressType === type
                    ? "border-[#b5f36d] bg-[#b5f36d]/10 text-[#b5f36d]"
                    : "border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Text Fields */}
        {[
          {
            name: "fullName",
            label: "Full Name",
            placeholder: "Enter full name",
          },
          {
            name: "phone",
            label: "Phone Number",
            placeholder: "Enter phone number",
          },
          {
            name: "addressLine",
            label: "House No. / Street / Area",
            placeholder: "Enter complete address",
          },
          {
            name: "landmark",
            label: "Landmark (Optional)",
            placeholder: "Nearby landmark",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              {field.label}
            </label>

            <input
              type="text"
              name={field.name}
              value={addressForm[field.name]}
              onChange={handleAddressChange}
              placeholder={field.placeholder}
              required={field.name !== "landmark"}
              className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#b5f36d]"
            />
          </div>
        ))}

        {/* City and State */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {["city", "state"].map((field) => (
            <div key={field}>
              <label className="mb-2 block text-sm font-medium capitalize text-gray-300">
                {field}
              </label>

              <input
                type="text"
                name={field}
                value={addressForm[field]}
                onChange={handleAddressChange}
                placeholder={`Enter ${field}`}
                required
                className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#b5f36d]"
              />
            </div>
          ))}
        </div>

        {/* Pincode */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={addressForm.pincode}
            onChange={handleAddressChange}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            pattern="[0-9]{6}"
            required
            className="w-full rounded-xl border border-white/10 bg-[#101713] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#b5f36d]"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => setShowAddressModal(false)}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={addressLoading}
            className="rounded-xl bg-[#b5f36d] px-6 py-3 text-sm font-bold text-[#152019] transition hover:bg-[#a5e45c] disabled:opacity-50"
          >
            {addressLoading
              ? "Saving..."
              : editingAddress
                ? "Update Address"
                : "Save Address"}
          </button>

        </div>

      </form>
    </div>
  </div>
)}


        {/* QUICK LINKS */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Your Activities
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Quickly access your DOCmed activities.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group rounded-2xl border border-white/10 bg-[#18231c] p-5 transition hover:-translate-y-1 hover:border-[#b5f36d]/40"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                      <Icon size={23} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#b5f36d]"
                    />
                  </div>

                  <h3 className="mt-5 font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#b5f36d]/20 bg-[#b5f36d]/5 p-6 sm:flex-row">
          <div>
            <h3 className="font-bold text-[#b5f36d]">
              Your Health, Our Priority
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Explore medicines and healthcare services with DOCmed.
            </p>
          </div>

          <Link
            to="/medicines"
            className="inline-flex items-center gap-2 rounded-xl bg-[#b5f36d] px-5 py-3 text-sm font-bold text-[#152019] transition hover:bg-orange-400"
          >
            Explore Medicines
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Profile;
