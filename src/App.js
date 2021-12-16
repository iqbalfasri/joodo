import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, VStack } from "@chakra-ui/react";
import { getTodos } from "./redux/todo/action";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const dispatch = useDispatch();
  const {
    todo: { todos, isLoading },
  } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <VStack pt={12} pb={64} spacing={6}>
      <Text
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        {"Todo App"}
      </Text>

      <TodoList todos={todos} isLoading={isLoading} />
      <AddTodo />
    </VStack>
  );
}

export default App;
