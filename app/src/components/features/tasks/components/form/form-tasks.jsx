import {
  Field,
  Input,
  Textarea,
  Portal,
  Select,
  Button,
  FieldRequiredIndicator,
  Box,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useFormTasks } from "./hooks/use-form-tasks";

const TaskForm = ({
  isEditTask,
  taskId,
  onAddTask,
  statuses,
  onCloseModal,
  name,
  description,
  code,
  activeStatus,
  onEditTask,
}) => {
  const { models, operations } = useFormTasks({
    taskId,
    isEditTask,
    onAddTask,
    onCloseModal,
    name,
    description,
    code,
    activeStatus,
    onEditTask,
  });

  return (
    <form onSubmit={operations.handleSubmit} position="relative">
      <Field.Root invalid={!!models.errors.taskName}>
        <Field.Label>
          Назва завдання <FieldRequiredIndicator></FieldRequiredIndicator>{" "}
        </Field.Label>
        <Input
          {...operations.register("taskName")}
          variant="outline"
          size="sm"
        />
        <Field.ErrorText>{models.errors.taskName?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root mt={4} invalid={!!models.errors.taskDescription}>
        <Field.Label>
          Опис <Box color="gray.500"> (Необовязково)</Box>
        </Field.Label>
        <Textarea
          {...operations.register("taskDescription")}
          autoresize
          variant="outline"
          size="sm"
        />
        <Field.ErrorText>
          {models.errors.taskDescription?.message}
        </Field.ErrorText>
      </Field.Root>

      <Field.Root mt={4} invalid={!!models.errors.taskCode}>
        <Field.Label>
          Приклад коду <Box color="gray.500"> (Необовязково)</Box>
        </Field.Label>
        <Textarea
          {...operations.register("taskCode")}
          autoresize
          variant="outline"
          size="sm"
        />
        <Field.ErrorText>{models.errors.taskCode?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!models.errors.status} mt={4} position="relative">
        <Field.Label>Етап завдання</Field.Label>
        <Controller
          control={models.control}
          name="status"
          render={({ field }) => (
            <Select.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={statuses}
              zIndex="99999"
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner zIndex="9999!important">
                  <Select.Content>
                    {statuses.items.map((status) => (
                      <Select.Item item={status} key={status.value}>
                        {status.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          )}
        />
        <Field.ErrorText>{models.errors.status?.message}</Field.ErrorText>
      </Field.Root>

      <Button type="submit" variant="subtle" mt={4} loading={models.isLoading}>
        {isEditTask ? "Редагувати" : "Створити завдання"}
      </Button>
    </form>
  );
};

export default TaskForm;
