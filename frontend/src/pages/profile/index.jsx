import React, { useState } from "react";
import { FaUserEdit, FaAddressCard } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Profile() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "contact@gmail.com",
  });

  const [address, setAddress] = useState({
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    postal: "",
    phone: "",
  });

  const hasAddress = address.country !== "";

  const handleProfileSave = () => setShowProfileModal(false);
  const handleAddressSave = () => setShowAddressModal(false);

  return (
    <div className="bg-[#f7f3ef] min-h-screen md:p-10 p-5 overflow-hidden">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-[#454444]">
          Profile Overview
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Manage your personal information and saved addresses below.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
          {/* Profile Info */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center border-b pb-4 mb-5">
              <h3 className="text-xl font-medium text-gray-700 flex items-center gap-2">
                <FaUserEdit className="text-[#c5a980]" /> Personal Info
              </h3>
              <button
                onClick={() => setShowProfileModal(true)}
                className="text-sm text-[#c5a980] hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm text-gray-500 uppercase">Full Name</h4>
                <p className="text-[#c5a980] font-semibold text-base">
                  {profile.firstName} {profile.lastName}
                </p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 uppercase">Email</h4>
                <p className="text-[#c5a980] font-semibold text-base">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center border-b pb-4 mb-5">
              <h3 className="text-xl font-medium text-gray-700 flex items-center gap-2">
                <FaAddressCard className="text-[#c5a980]" /> Address
              </h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="text-sm text-[#c5a980] hover:underline"
              >
                {hasAddress ? "Edit" : "Add"}
              </button>
            </div>

            {hasAddress ? (
              <div className="space-y-2 text-gray-600">
                <p className="text-[#c5a980] font-semibold">
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.company}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.postal}
                </p>
                <p>{address.country}</p>
                <p className="font-medium">{address.phone}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No address added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[500px] shadow-xl relative animate-[fadeIn_0.3s_ease]">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-5 text-gray-700">
              Edit Profile
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                placeholder="First name"
                className="w-full border rounded-md p-2"
              />
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                placeholder="Last name"
                className="w-full border rounded-md p-2"
              />
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="Email"
                className="w-full border rounded-md p-2"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  className="bg-[#c5a980] text-white px-4 py-2 rounded-md hover:bg-[#b99765]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm  flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-xl p-6 w-[95%] md:w-[600px] shadow-xl relative animate-[fadeIn_0.3s_ease]">
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-5 text-gray-700">
              Edit Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Country/region"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                className="border rounded-md p-2 col-span-2"
              />
              <input
                type="text"
                placeholder="First name"
                value={address.firstName}
                onChange={(e) =>
                  setAddress({ ...address, firstName: e.target.value })
                }
                className="border rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Last name"
                value={address.lastName}
                onChange={(e) =>
                  setAddress({ ...address, lastName: e.target.value })
                }
                className="border rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Company"
                value={address.company}
                onChange={(e) =>
                  setAddress({ ...address, company: e.target.value })
                }
                className="border rounded-md p-2 col-span-2"
              />
              <input
                type="text"
                placeholder="Address"
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
                className="border rounded-md p-2 col-span-2"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                value={address.apartment}
                onChange={(e) =>
                  setAddress({ ...address, apartment: e.target.value })
                }
                className="border rounded-md p-2 col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="border rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Postal code"
                value={address.postal}
                onChange={(e) =>
                  setAddress({ ...address, postal: e.target.value })
                }
                className="border rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="border rounded-md p-2 col-span-2"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() =>
                  setAddress({
                    country: "",
                    firstName: "",
                    lastName: "",
                    company: "",
                    address: "",
                    apartment: "",
                    city: "",
                    postal: "",
                    phone: "",
                  })
                }
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddressSave}
                  className="bg-[#c5a980] text-white px-4 py-2 rounded-md hover:bg-[#b99765]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
