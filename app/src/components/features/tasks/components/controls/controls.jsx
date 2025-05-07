import { Flex } from "@chakra-ui/react";
import { useControls } from "./hooks/use-controls";
import { StatusFilter } from "../status-filter/status-filter";
import TaskDialog from "../task-dialog/task-dialog";

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

        <TaskDialog
          isOpen={models.isOpenModal}
          onOpen={operations.handleOpenModal}
          onClose={operations.handleCloseModal}
          onAddTask={onAddTask}
          statuses={statuses}
          isSmallBtn
        />
      </Flex>
    </>
  );
}
