export function useHeading({ searchTerm, tasksList }) {
  const isListVisible = tasksList.length > 0;
  const isEmptyList = searchTerm.length === 0 && tasksList.length === 0;
  const isEmptyListSearch = searchTerm.length > 0 && tasksList.length === 0;

  return {
    models: {
      isListVisible,
      isEmptyList,
      isEmptyListSearch,
    },
  };
}
