import {
  Button,
  CloseButton,
  Dialog,
  Icon,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { RiAddCircleLine } from "react-icons/ri";
import TaskForm from "../form/form-tasks";
import { LuPencil } from "react-icons/lu";

const TaskDialog = ({
  isOpen,
  onClose,
  onOpen,
  task,
  onAddTask,
  onEditTask,
  statuses,
  isSmallBtn,
}) => {
  const isEditMode = Boolean(task);

  return (
    <Dialog.Root
      size="lg"
      open={isOpen}
      onEscapeKeyDown={onClose}
      placement="center"
      motionPreset="slide-in-bottom"
      onInteractOutside={onClose}
      trapFocus={true}
    >
      <Dialog.Trigger asChild>
        {isEditMode ? (
          <IconButton
            aria-label="Редагувати завдання"
            title="Редагувати завдання"
            size="sm"
            bg={{ base: "white", _hover: "gray.focusRing" }}
            color={{ base: "gray.500", _hover: "white" }}
            variant="outline"
            mr="2"
            onClick={onOpen}
          >
            <Icon as={LuPencil} boxSize={4} />
          </IconButton>
        ) : (
          <Button
            mt={isSmallBtn ? "2" : "3"}
            size={isSmallBtn ? "sm" : "xl"}
            onClick={onOpen}
            aria-label="Додати завдання"
            title="Додати завдання"
          >
            <RiAddCircleLine />
            <Text display={isSmallBtn ? { base: "none", sm: "inline" } : null}>
              Додати завдання
            </Text>
          </Button>
        )}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p="2">
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {isEditMode ? "Редагувати завдання" : "Додати завдання"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={onClose} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <TaskForm
                isEditTask={isEditMode}
                taskId={task?.id}
                onCloseModal={onClose}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                statuses={statuses}
                name={task?.name}
                description={task?.description}
                code={task?.code}
                activeStatus={task?.status}
                date={task?.date}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default TaskDialog;
