import { createTask, editTask } from "../../../../../services/task-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toaster } from "../../../../../ui/toaster";

export function useFormTasks({
  isEditTask,
  taskId,
  onAddTask,
  onCloseModal,
  name,
  description,
  code,
  activeStatus,
  onEditTask,
}) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const formSchema = z.object({
    taskName: z
      .string({ message: "Вкажи назву завдання" })
      .min(1, { message: "Вкажи назву завдання" })
      .max(50, { message: "Назва завдання не може бути більше 50 символів" }),
    status: z.string({ required_error: "Обери статус завдання" }).array(),
    taskDescription: z
      .string()
      .max(1000, { message: "Опис не може бути більше 1000 символів" })
      .optional(),
    taskCode: z
      .string()
      .max(1000, { message: "Приклад коду не може бути більше 1000 символів" })
      .optional(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: name ?? "",
      taskDescription: description ?? "",
      taskCode: code ?? "",
      status: activeStatus ? [activeStatus] : ["new"],
    },
  });

  const onSubmit = async (data) => {
    const taskData = {
      id: data.id,
      name: data.taskName,
      description: data.taskDescription,
      status: data.status[0],
      code: data.taskCode,
    };

    if (isEditTask) {
      const editTaskPromise = editTask(taskId, taskData);

      toaster.promise(editTaskPromise, {
        success: {
          title: "Задачу успішно відредаговано",
          description: "Вітаємо!",
        },
        error: {
          title: "Виникла помилка при редагуванні задачі",
          description: "Спробуйте перезавантажити сторінку.",
        },
        loading: { title: "Редагуємо задачу...", description: "Зачекайте" },
      });

      try {
        setLoading(true);
        const editTask = await editTaskPromise;
        onEditTask(editTask);
        reset();
        onCloseModal();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      const createTaskPromise = createTask(taskData);

      toaster.promise(createTaskPromise, {
        success: {
          title: "Задачу успішно створено",
          description: "Вітаємо!",
        },
        error: {
          title: "Виникла помилка при додаванні задачі",
          description: "Спробуйте перезавантажити сторінку.",
        },
        loading: { title: "Додаємо задачу...", description: "Зачекайте" },
      });

      try {
        setLoading(true);
        const createdTask = await createTaskPromise;
        onAddTask(createdTask);
        reset();
        onCloseModal();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    models: {
      control,
      errors,
      isLoading,
      isError,
    },
    operations: {
      handleSubmit: handleSubmit(onSubmit),
      register,
    },
  };
}
