import { Flex } from "@chakra-ui/react";
import { Search } from "../search/search";
import { Sorting } from "../sorting/sorting";

export default function Toolbar({
  onHandleSearch,
  searchTerm,
  tasksList,
  onHandleSortType,
  selectedStatus,
}) {
  return (
    <Flex>
      <Search
        onSearch={onHandleSearch}
        searchTerm={searchTerm}
        tasksList={tasksList}
        selectedStatus={selectedStatus}
      />
      {tasksList.length > 2 ? (
        <Sorting
          onHandleSortType={onHandleSortType}
          selectedStatus={selectedStatus}
        />
      ) : null}
    </Flex>
  );
}
