import { Box, HStack, Portal, Select, Text } from "@chakra-ui/react";

export function StatusFilter({
  usedTasksStatuses,
  statusMap,
  onChangeStatus,
  selectedStatus,
  allTasks,
}) {
  const getTaskCount = (statusValue) => {
    return allTasks.filter((task) => task.status === statusValue).length;
  };

  const collection = {
    items: usedTasksStatuses.map((status) => ({
      label: status.label,
      value: status.value,
    })),
  };

  return (
    <Select.Root
      items={collection.items}
      onValueChange={(value) => {
        const newStatus = value.value[0] === "" ? null : value.value[0];
        onChangeStatus(newStatus);
      }}
      size="xs"
      mr="2"
      mt="2"
      width={{ base: "100%", sm: "150px" }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText>
            {selectedStatus
              ? usedTasksStatuses.find((s) => s.value === selectedStatus)?.label
              : "Усі"}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.Item item={{ value: "", label: "Усі" }} key="all">
              <HStack>
                <Box w="2" h="2" borderRadius="full" bg="gray.400" />
                <Text fontSize="sm">Усі</Text>
              </HStack>
            </Select.Item>

            {collection.items.map((status) => {
              const count = getTaskCount(status.value);
              const color = statusMap[status.value]?.color || "gray";
              const isSelected = selectedStatus === status.value;

              return (
                <Select.Item
                  item={status}
                  key={status.value}
                  bg={isSelected ? `${color}.200` : ""}
                >
                  <HStack justify="space-between" w="100%" borderRadius="md">
                    <HStack>
                      <Box
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg={`${color}.400`}
                      />
                      <Text fontSize="sm">{status.label}</Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      {count}
                    </Text>
                  </HStack>
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
