import React, { useState } from "react";
import { Stack, Input, Button, useToast, Textarea } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../redux/todo/types";

const AddTodo = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === "" || description === "") {
      toast({
        title: "Please enter the text.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const todo = {
      id: nanoid(),
      title: value,
      description: description,
      createdAt: new Date(),
    };

    dispatch({ type: ADD_TODO, payload: todo });
    setValue("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <Input
          mt={5}
          value={value}
          variant="outline"
          type="text"
          placeholder="Enter your todo..."
          onChange={(e) => setValue(e.target.value)}
        />

        <Textarea
          mt={5}
          value={description}
          variant="outline"
          type="text"
          placeholder="Enter your todo description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button colorScheme="teal" type="submit">
          Add Todo
        </Button>
      </Stack>
    </form>
  );
};

export default AddTodo;
