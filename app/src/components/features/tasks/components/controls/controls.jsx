import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Icon,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import TaskForm from "../form/form-tasks";
import { useControls } from "./hooks/use-controls";
import { RiAddCircleLine } from "react-icons/ri";
import { StatusFilter } from "../status-filter/status-filter";

export function Controls({
  allTasks,
  onAddTask,
  statuses,
  usedTasksStatuses,
  statusMap,
  onChangeStatus,
  selectedStatus,
}) {
  const { models, operations } = useControls(allTasks);

  return (
    <>
      <Flex
        width={models.isShowFilter ? { base: "100%", md: "auto" } : null}
        justifyContent="flex-end"
      >
        {models.isShowFilter ? (
          <StatusFilter
            allTasks={allTasks}
            usedTasksStatuses={usedTasksStatuses}
            statusMap={statusMap}
            onChangeStatus={onChangeStatus}
            selectedStatus={selectedStatus}
          />
        ) : null}

        <Dialog.Root
          size="lg"
          open={models.isOpenModal}
          onEscapeKeyDown={operations.handleCloseModal}
          placement="center"
          motionPreset="slide-in-bottom"
          closeOnInteractOutside={false}
        >
          <Dialog.Trigger asChild>
            <Button
              size="sm"
              mt="2"
              aria-label="Додати завдання"
              title="Додати завдання"
              onClick={operations.handleOpenModal}
            >
              <RiAddCircleLine />
              <Text display={{ base: "none", sm: "inline" }}>
                Додати завдання
              </Text>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner p="2">
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Додати завдання</Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton
                      size="sm"
                      onClick={operations.handleCloseModal}
                    />
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
      </Flex>
    </>
  );
}
