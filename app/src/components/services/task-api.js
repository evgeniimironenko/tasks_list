export const getTasks = async () => {
  const res = await fetch("https://67fbb3891f8b41c816849f2e.mockapi.io/tasks");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

export const createTask = async (task) => {
  const res = await fetch("https://67fbb3891f8b41c816849f2e.mockapi.io/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await res.json();
  return data;
};

export const deleteTask = async (taskId) => {
  const res = await fetch(
    `https://67fbb3891f8b41c816849f2e.mockapi.io/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};
