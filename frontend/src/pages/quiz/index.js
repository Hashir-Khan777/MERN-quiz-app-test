import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result, Subject } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "../../helpers";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [marks, setMarks] = useState(0);

  const { subjectId } = useParams();

  const { user } = useSelector((state) => state.AuthReducer);
  const { subject } = useSelector((state) => state.SubjectReducer);

  const navigate = useNavigate();

  const threshold = 170;

  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  const devToolsIsOpen =
    !(heightThreshold && widthThreshold) &&
    ((window.Firebug &&
      window.Firebug.chrome &&
      window.Firebug.chrome.isInitialized) ||
      widthThreshold ||
      heightThreshold);

  const changeQuestion = (answer) => {
    if (!isEmpty(subject)) {
      if (
        answer?.toLowerCase() ===
        subject?.questions[currentQuestion]?.correctAnswer?.toLowerCase()
      ) {
        setMarks((prev) => prev + subject?.questions[currentQuestion].marks);
      }
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Subject.getOneSubjects({ _id: subjectId }));
  }, [dispatch]);

  useEffect(() => {
    if (currentQuestion === subject?.questions?.length) {
      dispatch(
        Result.addResult({
          data: {
            student: user._id,
            subject: subjectId,
            marks,
          },
          navigate: navigate,
        })
      );
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (devToolsIsOpen) {
      navigate("/quiz", { replace: true });
    }
  }, []);

  document.onfullscreenchange = () => {
    if (!document.fullscreenElement) {
      navigate("/quiz", { replace: true });
    }
  };

  window.onload = () => {
    if (!document.fullscreenElement) {
      navigate("/quiz", { replace: true });
    }
  };

  window.onblur = () => {
    navigate("/quiz", { replace: true });
  };

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="#fff"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.05)"
        padding="30px 20px"
      >
        <Box>
          <Text fontSize={30} fontWeight="semibold">
            {subject?.name}
          </Text>
        </Box>
        <Flex alignItems="center">
          <Avatar size="lg" mr={2} name={user?.name} src={user?.image} />
          <Text fontWeight="semibold" fontSize={20}>
            {user?.name}
          </Text>
        </Flex>
      </Flex>
      {!isEmpty(subject) ? (
        <Flex
          flexDirection="column"
          alignItems="center"
          mt={20}
          justifyContent="center"
        >
          <Heading size="lg" mb={5}>
            {subject?.questions[currentQuestion]?.question}
          </Heading>
          {subject?.questions[currentQuestion]?.options.map((option) => (
            <Button
              key={option._id}
              colorScheme="blue"
              variant="outline"
              width="300px"
              mb={3}
              onClick={() => changeQuestion(option)}
            >
              {option}
            </Button>
          ))}
        </Flex>
      ) : null}
    </Box>
  );
};

export default Quiz;
