import {
  Avatar,
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "../../store/actions";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const { subjects } = useSelector((state) => state.SubjectReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Subject.getSubjects());
  }, [dispatch]);

  return (
    <Box backgroundColor="#f9f9f9" height="100vh">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="#fff"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.05)"
        padding="30px 20px"
      >
        <Box>
          <Text fontSize={30} fontWeight="semibold">
            Subjects
          </Text>
        </Box>
        <Flex alignItems="center">
          <Avatar size="lg" mr={2} name={user?.name} src={user?.image} />
          <Text fontWeight="semibold" fontSize={20}>
            {user?.name}
          </Text>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Subject Name</Th>
              <Th>Total Questions</Th>
              <Th>Total Marks</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subjects?.map((subject) => {
              const totalMarks = subject?.questions?.reduce((acc, curr) => {
                acc += curr?.marks;
                return acc;
              }, 0);

              return (
                <Tr>
                  <Td>{subject?.name}</Td>
                  <Td>{subject?.questions?.length}</Td>
                  <Td>{totalMarks}</Td>
                  <Td>
                    <Link
                      to={`/quiz/${subject?.name}/${subject?._id}`}
                      onClick={() =>
                        document.documentElement.requestFullscreen()
                      }
                    >
                      <Button colorScheme="blue">Take Quiz</Button>
                    </Link>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
