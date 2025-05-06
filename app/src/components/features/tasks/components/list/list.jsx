import { Box, Stack } from "@chakra-ui/react";
import { Task } from "../task/task";

export function List({
  tasksList,
  onDeleteTask,
  statusMap,
  statuses,
  onEditTask,
}) {
  return (
    <Box mt="4">
      <Stack spacing={4} mt={4}>
        {tasksList.map((task) => (
          <Task
            key={task.id}
            statusMap={statusMap}
            task={task}
            onDeleteTask={onDeleteTask}
            statuses={statuses}
            onEditTask={onEditTask}
          />
        ))}
      </Stack>
    </Box>
  );
}
