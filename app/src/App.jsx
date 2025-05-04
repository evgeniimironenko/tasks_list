import { Container } from "@chakra-ui/react";
import { Tasks } from "./components/features/tasks";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Container mb="4" mt="4">
      <Tasks />
      <Toaster />
    </Container>
  );
}

export default App;
