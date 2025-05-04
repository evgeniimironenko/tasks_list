import { createListCollection } from "@chakra-ui/react";
import { getTasks } from "../../services/task-api";
import { useEffect, useState } from "react";

export function useTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isErrorTasks, setIsErrorTasks] = useState(false);

  const handleCreateTask = async (newTask) => {
    setAllTasks((prev) => [...prev, newTask]);
    return Promise.resolve();
  };

  const handleRemoveTask = (taskId) => {
    setAllTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);
      if (updatedTasks.length === 0) {
        setSearchTerm("");
      }
      return updatedTasks;
    });
  };

  const handleSearchTasks = (term) => {
    setSearchTerm(term);
  };

  const filteredTasks = allTasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tasksStatuses = createListCollection({
    items: [
      { label: "Нове", value: "new" },
      { label: "У роботі", value: "in_progress" },
      { label: "На розгляді", value: "duggling" },
      { label: "Відміна", value: "cancel" },
    ],
  });

  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoadingTasks(true);
        const tasks = await getTasks();
        setAllTasks(tasks);
      } catch (error) {
        setIsErrorTasks(error.message);
      } finally {
        setIsLoadingTasks(false);
      }
    }
    fetchTasks();
  }, []);

  return {
    models: {
      allTasks,
      tasksList: filteredTasks,
      isLoading: isLoadingTasks,
      isError: isErrorTasks,
      tasksStatuses,
      searchTerm,
    },
    operations: {
      handleCreateTask,
      handleRemoveTask,
      handleSearchTasks,
    },
  };
}
