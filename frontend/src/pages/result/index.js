import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "../../store/actions";
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "../../helpers";

const UserResult = () => {
  const [totalMarks, setTotalMarks] = useState(0);

  const { subject, student } = useParams();

  const { user } = useSelector((state) => state.AuthReducer);
  const { result } = useSelector((state) => state.ResultReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(result)) {
      dispatch(Result.getOneResult({ subject, student }));
    }
  }, [dispatch, result]);

  console.log(result);

  useEffect(() => {
    if (!isEmpty(result)) {
      const totalMarks = result?.subject?.questions?.reduce((acc, curr) => {
        acc += curr?.marks;
        return acc;
      }, 0);
      setTotalMarks(totalMarks);
    }
  }, [result]);

  return (
    <Flex flexDirection="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="#fff"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.05)"
        padding="30px 20px"
      >
        <Box>
          <Text fontSize={30} fontWeight="semibold">
            Result
          </Text>
        </Box>
        <Flex alignItems="center">
          <Avatar size="lg" mr={2} name={user?.name} src={user?.image} />
          <Text fontWeight="semibold" fontSize={20}>
            {user?.name}
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#fff"
        width="500px"
        maxWidth="90%"
        alignSelf="center"
        mt={20}
        padding="70px 50px"
        borderRadius="10px"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.05)"
      >
        <Flex alignItems="center">
          <Text fontWeight="semibold" fontSize={17}>
            Subject:
          </Text>
          <Text ml={1}>{result?.subject?.name}</Text>
        </Flex>
        <Flex alignItems="center" mt={3}>
          <Text fontWeight="semibold" fontSize={17}>
            Obtained Marks:
          </Text>
          <Text ml={1}>{result?.marks}</Text>
        </Flex>
        <Flex alignItems="center" mt={3}>
          <Text fontWeight="semibold" fontSize={17}>
            Total Marks:
          </Text>
          <Text ml={1}>{totalMarks}</Text>
        </Flex>
        <Link to="/quiz">
          <Button colorScheme="blue" mt={3}>
            Continue to quizes
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default UserResult;
