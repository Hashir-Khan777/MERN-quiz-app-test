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
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdminResults = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    </Box>
  );
};

export default AdminResults;
