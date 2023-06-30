import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

const ViewSubject = ({ isOpen, onClose, subject }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{subject?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Heading size="md" mb={3}>
              Questions
            </Heading>
            {subject?.questions?.map((question) => (
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
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewSubject;
