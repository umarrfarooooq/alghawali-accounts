import React, { useState } from "react";
import ConfirmationModal from "../ui/Modal";
import { useRouter } from "next/navigation";

const Logout = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirmLogout = () => {
    setLoading(true);
    localStorage.removeItem("accountToken");
    setIsModalOpen(false);
    router.push("/login");
  };
  return (
    <>
      <p className={className} onClick={handleLogoutClick}>
        Logout
      </p>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        loading={loading}
        confirmClass="bg-red-500 hover:bg-red-600"
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Yes, Log out"
        cancelText="Cancel"
      />
    </>
  );
};

export default Logout;
