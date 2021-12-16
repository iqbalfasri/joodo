import React, { useState } from "react";
import { HStack, VStack, Text, Flex, Badge, Spinner } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import ModalEdit from "./ModalEdit";
import { useDispatch } from "react-redux";
import { DELETE_TODO } from "../redux/todo/types";

const TodoList = ({ todos, isLoading }) => {
  const dispatch = useDispatch();
  const [modalValue, setModalValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleEditClick = (todo) => {
    setIsOpen(true);
    setModalValue(todo);
  };

  return isLoading ? (
    <Flex direction="column" alignContent="center" justifyContent="center">
      <Spinner />
      <Text>Loading...</Text>
    </Flex>
  ) : !todos.length ? (
    <Badge colorScheme="purple" variant="outline" borderRadius="4" p="4" m="5">
      No todos for Today!!
    </Badge>
  ) : (
    <VStack>
      {todos.map((todo) => (
        <HStack key={todo.id} spacing="24px" w="320px">
          <Flex p={6} w="300px" h="50px" justifyContent="space-between">
            <Text
              {...(todo.status === 1
                ? {
                    sx: {
                      textDecoration: "line-through",
                    },
                  }
                : null)}
            >
              {todo.title}
            </Text>
            <Flex w="10px">
              {todo.status !== 1 ? (
                <DeleteIcon
                  color="red.500"
                  mr="2"
                  onClick={() =>
                    dispatch({ type: DELETE_TODO, payload: { id: todo.id } })
                  }
                  sx={{ cursor: "pointer" }}
                />
              ) : null}
              <EditIcon
                onClick={() => handleEditClick(todo)}
                sx={{ cursor: "pointer" }}
              />
            </Flex>

            {/* modal for editing a todo */}
            <ModalEdit isOpen={isOpen} onClose={onClose} data={modalValue} />
          </Flex>
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;
