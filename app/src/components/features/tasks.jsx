import Form from "./tasks/components/form/form-tasks";
import { List } from "./tasks/components/list/list";
import { useTasks } from "./hooks/use-tasks";
import { HeadingBox } from "./tasks/components/heading/heading";
import {
  AbsoluteCenter,
  Alert,
  Box,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Search } from "./tasks/components/search/search";

export function Tasks() {
  const { models, operations } = useTasks();

  return (
    <>
      {models.isLoading && (
        <Box position="relative" h="100vh">
          <AbsoluteCenter axis="both">
            <VStack colorPalette="gray" mt="4">
              <Spinner color="colorPalette.600" />
              <Text color="colorPalette.600">Завантаження...</Text>
            </VStack>
          </AbsoluteCenter>
        </Box>
      )}

      {models.isError && (
        <Alert.Root status="error" mt="4">
          <Alert.Indicator />
          <Alert.Title>{models.isError}</Alert.Title>
        </Alert.Root>
      )}

      {!models.isLoading && !models.isError ? (
        <HeadingBox
          searchTerm={models.searchTerm}
          tasksList={models.tasksList}
          onAddTask={operations.handleCreateTask}
          statuses={models.tasksStatuses}
        />
      ) : null}

      {models.allTasks.length > 0 && (
        <Search
          onSearch={operations.handleSearchTasks}
          searchTerm={models.searchTerm}
          tasksList={models.tasksList}
        />
      )}

      {models.tasksList.length > 0 && !models.isLoading && !models.isError ? (
        <List
          tasksList={models.tasksList}
          onDeleteTask={operations.handleRemoveTask}
          statusMap={models.statusMap}
        />
      ) : null}
    </>
  );
}
