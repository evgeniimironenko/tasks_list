import {
  AbsoluteCenter,
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  Portal,
  Text,
} from "@chakra-ui/react";
import TaskForm from "../form/form-tasks";
import { Controls } from "../controls/controls";
import { useHeading } from "./hooks/use-heading";
import { RiAddCircleLine } from "react-icons/ri";

export function HeadingBox({
  allTasks,
  searchTerm,
  tasksList,
  onAddTask,
  statuses,
  usedTasksStatuses,
  statusMap,
  onChangeStatus,
  selectedStatus,
}) {
  const { models } = useHeading({ searchTerm, tasksList });

  return (
    <Box>
      {models.isListVisible || models.isEmptyListSearch ? (
        <>
          <Flex
            alignContent="center"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Heading as="h1" mr="2" mt="2">
              Список завдань
            </Heading>
            <Controls
              allTasks={allTasks}
              onAddTask={onAddTask}
              statuses={statuses}
              usedTasksStatuses={usedTasksStatuses}
              statusMap={statusMap}
              onChangeStatus={onChangeStatus}
              selectedStatus={selectedStatus}
            />
          </Flex>
        </>
      ) : null}

      {models.isEmptyList ? (
        <Box position="relative" h="100vh" w="100%">
          <AbsoluteCenter mt="4" flexDirection="column" axis="both" w="100%">
            <Heading as="h1">Список завдань</Heading>
            <Text textAlign="center" mt="2">
              Список завдань пустий, додайте нові завдання
            </Text>
            <Dialog.Root
              size="lg"
              placement="center"
              motionPreset="slide-in-bottom"
            >
              <Dialog.Trigger asChild>
                <Button mt="3" size="xl">
                  <RiAddCircleLine />
                  Додати завдання
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner p="2">
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Додати завдання</Dialog.Title>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Header>
                    <Dialog.Body>
                      <TaskForm onAddTask={onAddTask} statuses={statuses} />
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </AbsoluteCenter>
        </Box>
      ) : null}
    </Box>
  );
}
