import { useState, useRef } from "react";

export const useFilePreview = (initialPreview = null) => {
  const [filePreview, setFilePreview] = useState(initialPreview);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const clearPreview = () => {
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return {
    filePreview,
    handleFileChange,
    clearPreview,
    fileInputRef,
  };
};
