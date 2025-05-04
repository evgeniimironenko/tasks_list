import { Box, Stack } from "@chakra-ui/react";
import { Task } from "../task/task";

export function List({ tasksList, onDeleteTask }) {
  return (
    <Box mt="4">
      <Stack spacing={4} mt={4}>
        {tasksList.map((task) => (
          <Task key={task.id} task={task} onDeleteTask={onDeleteTask} />
        ))}
      </Stack>
    </Box>
  );
}
