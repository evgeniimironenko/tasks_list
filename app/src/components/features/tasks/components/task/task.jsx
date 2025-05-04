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

export function Task({ task, onDeleteTask, statusMap }) {
  const { models, operations } = useTask(onDeleteTask);

  return (
    <Box
      p={{ base: "3", sm: "5" }}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
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
        <Text fontSize="sm" mb={2} color="gray.600">
          {task.description}
        </Text>
      )}
      {task.code && (
        <Code mb={2} size="md" p="2">
          {task.code}
        </Code>
      )}
      <Flex justify="flex-end">
        <IconButton
          aria-label="Видалити задачу"
          title="Видалити задачу"
          size={{ base: "xs", sm: "sm" }}
          colorPalette="red"
          variant="outline"
          onClick={() => operations.handleDeleteTask(task.id)}
          isLoading={models.isDeleteLoading === task.id}
          isDisabled={
            models.isDeleteLoading !== null &&
            models.isDeleteLoading !== task.id
          }
        >
          <Icon as={LuTrash} boxSize={4} color="red.500" />
        </IconButton>
      </Flex>
    </Box>
  );
}
