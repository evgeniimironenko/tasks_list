import { Button, Menu, Portal } from "@chakra-ui/react";
import { HiSortAscending } from "react-icons/hi";
import { useSorting } from "./hooks/use-sorting";

export function Sorting({ onHandleSortType, selectedStatus }) {
  const { models, operations } = useSorting({
    onHandleSortType,
    selectedStatus,
  });

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button ml="2" mt="2" variant="outline" size="sm" title="Сортувати">
          <HiSortAscending />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={models.value}
              onValueChange={(e) => operations.setValue(e.value)}
            >
              {models.items.map((item) => (
                <Menu.RadioItem key={item.value} value={item.value}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
