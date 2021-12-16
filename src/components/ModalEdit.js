import React, { useEffect, memo, useCallback, useMemo, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  FormLabel,
  FormControl,
  Switch,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { EDIT_TODO } from "../redux/todo/types";

const ModalEdit = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const [modalValue, setModalValue] = useState({});

  useEffect(() => {
    if (data) {
      setModalValue(data);
    }
  }, [isOpen, data]);

  const handleEditInputChange = useCallback(
    (e, id) => {
      setModalValue({ ...modalValue, title: e.target.value });
    },
    [modalValue]
  );

  const handleEditDescriptionChange = useCallback(
    (e, id) => {
      setModalValue({ ...modalValue, description: e.target.value });
    },
    [modalValue]
  );

  const handleEditStatusChange = useCallback(
    (e) => {
      setModalValue({
        ...modalValue,
        status: e.target.checked === true ? 1 : 0,
      });
    },
    [modalValue]
  );

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: EDIT_TODO,
        payload: {
          id: modalValue.id,
          value: modalValue,
        },
      });

      onClose();
    },
    [dispatch, modalValue, onClose]
  );

  return useMemo(() => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Todo</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleEditSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor={`${modalValue.id}-${modalValue.title}`}>
                  Title
                </FormLabel>
                <Input
                  id={`${modalValue.id}-${modalValue.title}`}
                  value={modalValue.title}
                  key={modalValue.id}
                  variant="outline"
                  type="text"
                  placeholder="Update your todo..."
                  onChange={handleEditInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  value={modalValue.description}
                  onChange={handleEditDescriptionChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="done-todo" mb="0">
                  Done todo?
                </FormLabel>
                <Switch
                  id="done-todo"
                  colorScheme="teal"
                  value={modalValue.status}
                  defaultChecked={modalValue.status === 1 ? true : false}
                  onChange={handleEditStatusChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="teal" mr={3}>
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }, [
    handleEditDescriptionChange,
    handleEditInputChange,
    handleEditStatusChange,
    handleEditSubmit,
    isOpen,
    modalValue.description,
    modalValue.id,
    modalValue.status,
    modalValue.title,
    onClose,
  ]);
};

export default memo(ModalEdit);
