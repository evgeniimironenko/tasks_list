import { AbsoluteCenter, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Controls } from "../controls/controls";
import { useHeading } from "./hooks/use-heading";
import TaskDialog from "../task-dialog/task-dialog";

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
            <TaskDialog onAddTask={onAddTask} statuses={statuses} />
          </AbsoluteCenter>
        </Box>
      ) : null}
    </Box>
  );
}
