import { createListCollection } from "@chakra-ui/react";
import { getTasks } from "../../services/task-api";
import { useEffect, useMemo, useState } from "react";

export function useTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isErrorTasks, setIsErrorTasks] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [sortType, setSortType] = useState("date");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoadingTasks(true);
        const tasks = await getTasks();

        const sortedTasks = tasks.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setAllTasks(sortedTasks);
      } catch (error) {
        setIsErrorTasks(error.message);
      } finally {
        setIsLoadingTasks(false);
      }
    }
    fetchTasks();
  }, []);

  const statusMap = {
    new: { label: "Нове", color: "blue" },
    in_progress: { label: "У роботі", color: "yellow" },
    duggling: { label: "Призупинено", color: "purple" },
    done: { label: "Виконано", color: "green" },
    cancel: { label: "Відміна", color: "red" },
  };

  const tasksStatuses = createListCollection({
    items: [
      { label: "Нове", value: "new" },
      { label: "У роботі", value: "in_progress" },
      { label: "Призупинено", value: "duggling" },
      { label: "Виконано", value: "done" },
      { label: "Відміна", value: "cancel" },
    ],
  });

  const filteredTasks = useMemo(() => {
    const filtered = allTasks.filter((task) => {
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus
        ? task.status === selectedStatus
        : true;
      return matchesSearch && matchesStatus;
    });

    const sorted = [...filtered];

    if (sortType === "date_newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === "date_oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === "status") {
      const order = ["new", "in_progress", "duggling", "done", "cancel"];
      sorted.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
    }

    return sorted;
  }, [allTasks, searchTerm, selectedStatus, sortType]);

  const usedTasksStatuses = useMemo(() => {
    const usedStatusSet = new Set(allTasks.map((task) => task.status));
    return tasksStatuses.items.filter((status) =>
      usedStatusSet.has(status.value)
    );
  }, [allTasks, tasksStatuses]);

  const handleCreateTask = async (newTask) => {
    setAllTasks((prev) => [newTask, ...prev]);
    return Promise.resolve();
  };

  const handleRemoveTask = (taskId) => {
    setAllTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);

      if (updatedTasks.length === 0) {
        setSearchTerm("");
      }

      const hasSelectedStatusTasks = updatedTasks.some(
        (task) => task.status === selectedStatus
      );

      if (!hasSelectedStatusTasks) {
        setSelectedStatus(null);
      }

      return updatedTasks;
    });
  };

  const handleEditTask = (updatedTask) => {
    setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );

      const hasSelectedStatusTasks = updatedTasks.some(
        (task) => task.status === selectedStatus
      );

      if (!hasSelectedStatusTasks) {
        setSelectedStatus(null);
      }

      return updatedTasks;
    });
  };
  const handleSearchTasks = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
  };

  const handleSortType = (type) => {
    setSortType(type);
  };

  return {
    models: {
      allTasks,
      tasksList: filteredTasks,
      isLoading: isLoadingTasks,
      isError: isErrorTasks,
      tasksStatuses,
      searchTerm,
      selectedStatus,
      statusMap,
      usedTasksStatuses,
    },
    operations: {
      handleCreateTask,
      handleRemoveTask,
      handleSearchTasks,
      handleStatusFilter,
      handleEditTask,
      handleSortType,
    },
  };
}
