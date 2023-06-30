import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { isFormValid } from "../../helpers";
import { Question } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const AddQuestion = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    data: {
      question: "",
      marks: "",
      correctAnswer: "",
      options: "",
    },
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.QuestionReducer);

  const addQuestion = () => {
    if (!isFormValid(form.data, setForm).includes(false)) {
      setForm({ ...form, errors: {} });
      dispatch(
        Question.addQueston({
          data: {
            ...form.data,
            options: form.data.options
              .split(",")
              .map((option) => option.trim()),
          },
          onClose,
        })
      );
    }
  };

  const changeValue = (key, value) =>
    setForm({
      ...form,
      data: {
        ...form.data,
        [key]: value,
      },
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={6} isInvalid={form?.errors?.question}>
            <FormLabel>Question</FormLabel>
            <Input
              type="text"
              placeholder="Enter Question"
              value={form?.data?.question}
              onChange={(e) => changeValue("question", e.target.value)}
            />
            <FormErrorMessage>{form?.errors?.question}</FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={form?.errors?.marks}>
            <FormLabel>Marks</FormLabel>
            <Input
              type="number"
              placeholder="Enter Marks"
              value={form?.data?.marks}
              onChange={(e) => changeValue("marks", e.target.value)}
            />
            <FormErrorMessage>{form?.errors?.marks}</FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={form?.errors?.correctAnswer}>
            <FormLabel>Correct Answer</FormLabel>
            <Input
              type="text"
              placeholder="Enter Correct Answer"
              value={form?.data?.correctAnswer}
              onChange={(e) => changeValue("correctAnswer", e.target.value)}
            />
            <FormErrorMessage>{form?.errors?.correctAnswer}</FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={form?.errors?.options}>
            <FormLabel>Options</FormLabel>
            <Input
              type="text"
              placeholder="Enter comma seprated options"
              value={form?.data?.options}
              onChange={(e) => changeValue("options", e.target.value)}
            />
            <FormErrorMessage>{form?.errors?.options}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Button
            colorScheme="blue"
            mr={3}
            onClick={addQuestion}
            isDisabled={loading}
          >
            {loading ? <Spinner /> : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuestion;
