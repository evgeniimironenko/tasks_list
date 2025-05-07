import {
  Badge,
  Box,
  Code,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";
import { useTask } from "./hooks/use-task";
import TaskDialog from "../task-dialog/task-dialog";

export function Task({ task, onDeleteTask, statusMap, statuses, onEditTask }) {
  const { models, operations } = useTask(onDeleteTask);

  return (
    <Box
      p={{ base: "3", sm: "5" }}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={{ base: "white", _hover: "gray.50" }}
      cursor="pointer"
      onClick={operations.handleOpenModal}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="md" flex="1">
          {task.name}
        </Heading>
        <Badge ml="2" colorPalette={statusMap[task.status]?.color || "gray"}>
          {statusMap[task.status]?.label || "Невідомо"}
        </Badge>
      </Flex>
      {task.description && (
        <Text fontSize="md" mb={2} color="gray.600">
          {task.description}
        </Text>
      )}
      {task.code && (
        <Code
          mb={2}
          size="lg"
          p="2"
          variant="surface"
          colorPalette="gray"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {task.code}
        </Code>
      )}
      <Flex justify="flex-end">
        <TaskDialog
          isOpen={models.isOpenModal}
          onOpen={operations.handleOpenModal}
          onClose={operations.handleCloseModal}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={operations.handleDeleteTask}
          statuses={statuses}
          isDeleteLoading={models.isDeleteLoading}
        />
        <IconButton
          aria-label="Видалити задачу"
          title="Видалити задачу"
          size="sm"
          colorPalette="red"
          bg={{ base: "white", _hover: "red" }}
          color={{ base: "red.500", _hover: "white" }}
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            operations.handleDeleteTask(task.id);
          }}
          isLoading={models.isDeleteLoading === task.id}
          isDisabled={
            models.isDeleteLoading !== null &&
            models.isDeleteLoading !== task.id
          }
        >
          <Icon as={LuTrash} boxSize={4} />
        </IconButton>
      </Flex>
    </Box>
  );
}
