import {
  Box,
  Flex,
  Icon,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Result } from "../../../store/actions";

const AdminResults = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { results } = useSelector((state) => state.ResultReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Result.getResults());
  }, [dispatch]);

  return (
    <Box backgroundColor="#f9f9f9" height="100vh">
      <Flex
        alignItems="center"
        backgroundColor="#fff"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.05)"
        padding="30px 20px"
      >
        <Icon
          as={AiOutlineBars}
          fontSize={35}
          cursor="pointer"
          onClick={onOpen}
        />
        <Text fontSize={30} ml={20} fontWeight="semibold">
          Results
        </Text>
        <Drawer isOpen={isOpen} placement="left" closeOnEsc onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody mt={10}>
              <Box>
                <Link to="/admin/dashboard">
                  <Button
                    width="100%"
                    borderRadius={0}
                    background="transparent"
                    justifyContent="flex-start"
                    fontSize={20}
                  >
                    Subjects
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link to="/admin/results">
                  <Button
                    width="100%"
                    borderRadius={0}
                    background="transparent"
                    justifyContent="flex-start"
                    fontSize={20}
                  >
                    Results
                  </Button>
                </Link>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Subjaect Name</Th>
              <Th>Student Name</Th>
              <Th>Obtained Marks</Th>
              <Th>Total Marks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {results?.map((result) => {
              const totalMarks = result?.subject?.questions?.reduce(
                (acc, curr) => {
                  acc += curr?.marks;
                  return acc;
                },
                0
              );
              return (
                <Tr key={result?._id}>
                  <Td>{result?.subject?.name}</Td>
                  <Td>{result?.student?.name}</Td>
                  <Td>{result?.marks}</Td>
                  <Td>{totalMarks}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminResults;
