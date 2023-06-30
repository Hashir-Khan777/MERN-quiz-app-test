import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = () => {
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

  //   console.log(subject);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Subject.getOneSubjects({ _id: subjectId }));
  }, [dispatch]);

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
    </Box>
  );
};

export default Quiz;
