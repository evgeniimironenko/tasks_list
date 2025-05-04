import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import TaskForm from "../form/form-tasks";
import { useControls } from "./hooks/use-controls";
import { RiAddCircleLine } from "react-icons/ri";

export function Controls({ onAddTask, statuses }) {
  const { models, operations } = useControls();

  return (
    <Dialog.Root
      size="lg"
      open={models.isOpenModal}
      onEscapeKeyDown={operations.handleCloseModal}
      onInteractOutside={operations.handleCloseModal}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button size="xs" onClick={operations.handleOpenModal}>
          <RiAddCircleLine size="xs" />
          Додати завдання
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Додати завдання</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={operations.handleCloseModal} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <TaskForm
                onAddTask={onAddTask}
                onCloseModal={operations.handleCloseModal}
                statuses={statuses}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
