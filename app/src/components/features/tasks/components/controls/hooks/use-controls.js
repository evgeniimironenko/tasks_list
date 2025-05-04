import { useMemo, useState } from "react";

export function useControls(allTasks) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const isShowFilter = useMemo(() => {
    const uniqueStatuses = new Set(allTasks.map((task) => task.status));
    return uniqueStatuses.size > 2;
  }, [allTasks]);

  return {
    models: {
      isOpenModal,
      isShowFilter,
    },
    operations: {
      handleOpenModal,
      handleCloseModal,
    },
  };
}
