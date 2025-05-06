import { useState } from "react";
import { deleteTask } from "../../../../../services/task-api";
import { toaster } from "../../../../../ui/toaster";

export function useTask(onDeleteTask) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(null);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const handleDeleteTask = async (taskId) => {
    const deletePromise = deleteTask(taskId);

    toaster.promise(deletePromise, {
      success: {
        title: "Задачу успішно видалено",
        description: "Вітаємо!",
      },
      error: {
        title: "Виникла помилка при видаленні задачі",
        description: "Cпробуйте перезавантажити сторінку.",
      },
      loading: { title: "Видалення...", description: "Зачекайте" },
    });

    try {
      setIsDeleteLoading(taskId);
      await deletePromise;
      onDeleteTask(taskId);
    } catch (error) {
      setIsDeleteError(error.message);
    } finally {
      setIsDeleteLoading(null);
    }
  };

  return {
    models: {
      isDeleteLoading,
      isDeleteError,
      isOpenModal,
    },
    operations: {
      handleDeleteTask,
      handleOpenModal,
      handleCloseModal,
    },
  };
}
