import { Heading, Input, Text } from "@chakra-ui/react";

export function Search({ onSearch, searchTerm, tasksList }) {
  return (
    <>
      <Input
        placeholder="Пошук"
        mt="2"
        size="sm"
        onChange={(e) => onSearch(e.target.value)}
      />

      {searchTerm.length > 0 && tasksList.length === 0 ? (
        <>
          <Text mt={4}>
            По заданому пошуку "{searchTerm}" нема результатів.
          </Text>
        </>
      ) : null}
    </>
  );
}
