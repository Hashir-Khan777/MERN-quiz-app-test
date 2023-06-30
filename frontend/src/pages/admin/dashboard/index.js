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
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineBars, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AddSubject, ViewSubject } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "../../../store/actions";

const AdminDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const viewSunbjectClosure = useDisclosure();
  const { subjects } = useSelector((state) => state.SubjectReducer);

  const addSubjectClosure = useDisclosure();

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
        <Flex alignItems="center">
          <Icon
            as={AiOutlineBars}
            fontSize={35}
            cursor="pointer"
            onClick={onOpen}
          />
          <Text fontSize={30} ml={{ base: 5, md: 20 }} fontWeight="semibold">
            Subjects
          </Text>
        </Flex>
        <Box>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={addSubjectClosure.onOpen}
          >
            <Icon as={AiOutlinePlus} fontSize={18} mr={2} />
            <Text>Create</Text>
          </Button>
        </Box>
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
        <AddSubject {...addSubjectClosure} />
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Subject Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subjects.map((subject) => (
              <Tr key={subject._id}>
                <Td>{subject.name}</Td>
                <Td>
                  <Icon
                    as={AiOutlineEye}
                    fontSize={20}
                    cursor="pointer"
                    onClick={() => {
                      viewSunbjectClosure.onOpen();
                      setSelectedSubject(subject);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <ViewSubject {...viewSunbjectClosure} subject={selectedSubject} />
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;
