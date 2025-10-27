import React, { useState, useEffect } from "react";
import { FaUserEdit, FaAddressCard, FaPlus, FaTrash, FaEdit, FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";

function Profile() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const userInfo = useSelector((state) => state.product.userInfo);
  const userId = userInfo?._id;

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Fetch user profile data
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/user/profile/${userId}`);
      
      if (response.data.status === "success") {
        const userData = response.data.data;
        setProfile({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          image: userData.image || "",
        });
        setAddresses(userData.addresses || []);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async () => {
    try {
      setSaving(true);
      const response = await axios.put(`${BaseUrl}/user/profile/${userId}`, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        image: profile.image,
      });

      if (response.data.status === "success") {
        toast.success("Profile updated successfully!");
        setShowProfileModal(false);
        fetchUserProfile(); // Refresh data
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAddressSave = async () => {
    try {
      setSaving(true);
      
      if (editingAddress) {
        // Update existing address
        const response = await axios.put(
          `${BaseUrl}/user/${userId}/addresses/${editingAddress._id}`,
          address
        );
        
        if (response.data.status === "success") {
          toast.success("Address updated successfully!");
          setAddresses(response.data.data);
        }
      } else {
        // Add new address
        const response = await axios.post(`${BaseUrl}/user/${userId}/addresses`, address);
        
        if (response.data.status === "success") {
          toast.success("Address added successfully!");
          setAddresses(response.data.data);
        }
      }
      
      setShowAddressModal(false);
      setEditingAddress(null);
      resetAddressForm();
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    try {
      const response = await axios.delete(`${BaseUrl}/user/${userId}/addresses/${addressId}`);
      
      if (response.data.status === "success") {
        toast.success("Address deleted successfully!");
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const response = await axios.put(`${BaseUrl}/user/${userId}/addresses/${addressId}/default`);
      
      if (response.data.status === "success") {
        toast.success("Default address updated!");
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to set default address");
    }
  };

  const resetAddressForm = () => {
    setAddress({
      firstName: "",
      lastName: "",
      company: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    });
  };

  const openAddressModal = (addressToEdit = null) => {
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setAddress({
        firstName: addressToEdit.firstName,
        lastName: addressToEdit.lastName,
        company: addressToEdit.company,
        addressLine1: addressToEdit.addressLine1,
        addressLine2: addressToEdit.addressLine2,
        city: addressToEdit.city,
        state: addressToEdit.state,
        zipCode: addressToEdit.zipCode,
        country: addressToEdit.country,
        phone: addressToEdit.phone,
      });
    } else {
      setEditingAddress(null);
      resetAddressForm();
    }
    setShowAddressModal(true);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setEditingAddress(null);
    resetAddressForm();
  };

  if (loading) {
    return (
      <div className="bg-[#f7f3ef] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a980] mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="bg-[#f7f3ef] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

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
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName} ${profile.lastName}` 
                    : userInfo?.username || "Not set"}
                </p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 uppercase">Email</h4>
                <p className="text-[#c5a980] font-semibold text-base">
                  {profile.email || userInfo?.email || "Not set"}
                </p>
              </div>
              {profile.phone && (
                <div>
                  <h4 className="text-sm text-gray-500 uppercase">Phone</h4>
                  <p className="text-[#c5a980] font-semibold text-base">
                    {profile.phone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Address Info */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center border-b pb-4 mb-5">
              <h3 className="text-xl font-medium text-gray-700 flex items-center gap-2">
                <FaAddressCard className="text-[#c5a980]" /> Addresses
              </h3>
              <button
                onClick={() => openAddressModal()}
                className="text-sm text-[#c5a980] hover:underline flex items-center gap-1"
              >
                <FaPlus size={12} /> Add
              </button>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((addr, index) => (
                  <div key={addr._id || index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">
                          {addr.firstName} {addr.lastName}
                        </h4>
                        {addr.isDefault && (
                          <FaStar className="text-yellow-500" size={12} title="Default Address" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openAddressModal(addr)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {addr.company && <p>{addr.company}</p>}
                      <p>{addr.addressLine1}</p>
                      {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                      <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p>{addr.country}</p>
                      <p className="font-medium">{addr.phone}</p>
                    </div>
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(addr._id)}
                        className="mt-2 text-xs text-[#c5a980] hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No addresses added yet.</p>
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
                disabled
              />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                placeholder="Phone number"
                className="w-full border rounded-md p-2"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  disabled={saving}
                  className="bg-[#c5a980] text-white px-4 py-2 rounded-md hover:bg-[#b99765] disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-xl p-6 w-[95%] md:w-[600px] shadow-xl relative animate-[fadeIn_0.3s_ease]">
            <button
              onClick={closeAddressModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-5 text-gray-700">
              {editingAddress ? "Edit Address" : "Add New Address"}
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
                required
              />
              <input
                type="text"
                placeholder="First name"
                value={address.firstName}
                onChange={(e) =>
                  setAddress({ ...address, firstName: e.target.value })
                }
                className="border rounded-md p-2"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={address.lastName}
                onChange={(e) =>
                  setAddress({ ...address, lastName: e.target.value })
                }
                className="border rounded-md p-2"
                required
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
                value={address.addressLine1}
                onChange={(e) =>
                  setAddress({ ...address, addressLine1: e.target.value })
                }
                className="border rounded-md p-2 col-span-2"
                required
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                value={address.addressLine2}
                onChange={(e) =>
                  setAddress({ ...address, addressLine2: e.target.value })
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
                required
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="border rounded-md p-2"
                required
              />
              <input
                type="text"
                placeholder="Postal code"
                value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value })
                }
                className="border rounded-md p-2"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="border rounded-md p-2"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeAddressModal}
                className="text-gray-500"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleAddressSave}
                disabled={saving}
                className="bg-[#c5a980] text-white px-4 py-2 rounded-md hover:bg-[#b99765] disabled:opacity-50"
              >
                {saving ? "Saving..." : editingAddress ? "Update" : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
