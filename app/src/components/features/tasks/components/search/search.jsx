import { Box, Input, Text } from "@chakra-ui/react";

export function Search({ onSearch, searchTerm, tasksList, selectedStatus }) {
  return (
    <Box flex="1" mt="2">
      <Input
        placeholder="Пошук"
        size="sm"
        onChange={(e) => onSearch(e.target.value)}
      />

      {searchTerm.length > 0 && tasksList.length === 0 ? (
        <>
          <Text mt={4}>
            По заданому пошуку "{searchTerm}" нема результатів
            {selectedStatus
              ? "у цьому статусі. Перемкніться на інший статус або спробуйте інший запит."
              : "."}
          </Text>
        </>
      ) : null}
    </Box>
  );
}
