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
  Heading,
  Flex,
  useDisclosure,
  Text,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { isFormValid } from "../../helpers";
import { Subject } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AddQuestion } from "..";

const AddSubject = ({ isOpen, onClose }) => {
  const addQuestionClosure = useDisclosure();

  const [form, setForm] = useState({
    data: {
      name: "",
    },
  });

  const { questions } = useSelector((state) => state.QuestionReducer);
  const { loading } = useSelector((state) => state.SubjectReducer);

  const dispatch = useDispatch();

  const addSubject = () => {
    if (!isFormValid(form.data, setForm).includes(false)) {
      setForm({ ...form, errors: {} });
      dispatch(
        Subject.addSubject({
          data: {
            ...form.data,
            questions: questions.map((ques) => ques),
          },
          onClose,
        })
      );
      setForm({
        data: {
          name: "",
        },
      });
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
        <ModalHeader>Add Subject</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={6} isInvalid={form?.errors?.name}>
            <FormLabel>Subject Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Subject Name"
              value={form?.data?.name}
              onChange={(e) => changeValue("name", e.target.value)}
            />
            <FormErrorMessage>{form?.errors?.name}</FormErrorMessage>
          </FormControl>
          <Flex flexDirection="column">
            <Heading size="md" mb={3}>
              Questions
            </Heading>
            {questions?.map((question) => (
              <Box key={question._id}>
                <Flex alignItems="center">
                  <Text mr={2} fontWeight="semibold">
                    Question:{" "}
                  </Text>
                  <Text>{question.question}</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text mr={2} fontWeight="semibold">
                    Marks:{" "}
                  </Text>
                  <Text>{question.marks}</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text mr={2} fontWeight="semibold">
                    Options:{" "}
                  </Text>
                  <Text>{question.options.join(", ")}</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text mr={2} fontWeight="semibold">
                    correct Answer:{" "}
                  </Text>
                  <Text>{question.correctAnswer}</Text>
                </Flex>
              </Box>
            ))}
            <Button
              colorScheme="blue"
              fontSize={13}
              mr={3}
              onClick={addQuestionClosure.onOpen}
              alignSelf="flex-end"
            >
              Add Question
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Button
            colorScheme="blue"
            mr={3}
            onClick={addSubject}
            isDisabled={loading}
          >
            {loading ? <Spinner /> : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
      <AddQuestion {...addQuestionClosure} />
    </Modal>
  );
};

export default AddSubject;
