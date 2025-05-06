import {
  Badge,
  Box,
  CloseButton,
  Code,
  Dialog,
  Flex,
  Heading,
  Icon,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useTask } from "./hooks/use-task";
import TaskForm from "../form/form-tasks";

export function Task({ task, onDeleteTask, statusMap, statuses, onEditTask }) {
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
        <Dialog.Root
          size="lg"
          open={models.isOpenModal}
          onEscapeKeyDown={operations.handleCloseModal}
          placement="center"
          motionPreset="slide-in-bottom"
          closeOnInteractOutside={false}
        >
          <Dialog.Trigger asChild>
            <IconButton
              aria-label="Редагувати завдання"
              title="Редагувати завдання"
              size="sm"
              colorPalette="gray"
              variant="outline"
              mr="2"
              onClick={operations.handleOpenModal}
            >
              <Icon as={LuPencil} boxSize={4} color="gray.500" />
            </IconButton>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner p="2">
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Редагувати завдання</Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton
                      size="sm"
                      onClick={operations.handleCloseModal}
                    />
                  </Dialog.CloseTrigger>
                </Dialog.Header>
                <Dialog.Body>
                  <TaskForm
                    isEditTask
                    taskId={task.id}
                    onCloseModal={operations.handleCloseModal}
                    statuses={statuses}
                    name={task.name}
                    description={task.description}
                    code={task.code}
                    activeStatus={task.status}
                    onEditTask={onEditTask}
                  />
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <IconButton
          aria-label="Видалити задачу"
          title="Видалити задачу"
          size="sm"
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
