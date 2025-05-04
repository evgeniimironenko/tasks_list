import { useState } from "react";

export function useControls() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return {
    models: {
      isOpenModal,
    },
    operations: {
      handleOpenModal,
      handleCloseModal,
    },
  };
}
