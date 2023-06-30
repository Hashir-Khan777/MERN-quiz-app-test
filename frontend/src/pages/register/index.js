import {
  Heading,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  Flex,
  InputGroup,
  InputRightAddon,
  Spinner,
  FormErrorMessage,
  Tooltip,
  Avatar,
  Circle,
  Center,
  Icon,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isFormValid } from "../../helpers";
import { Auth } from "../../store/actions";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Cookies from "universal-cookie";

const Register = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [form, setForm] = useState({
    data: {
      name: "",
      image: "",
      phone: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { loading, imageLoading } = useSelector((store) => store.AuthReducer);

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    dispatch(Auth.updateImage({ data: formData, func: changeValue }));
  };

  const register = () => {
    if (!isFormValid(form.data, setForm).includes(false)) {
      setForm({ ...form, errors: {} });
      dispatch(Auth.register(form.data));
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

  useEffect(() => {
    if (cookies.get("_user")) {
      navigate("/quiz", { replace: true });
    }
  }, [cookies.get("_user")]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      backgroundColor="#f9f9f9"
      height="100vh"
      width="100%"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#fff"
        width="500px"
        maxWidth="90%"
        padding="70px 50px"
        borderRadius="10px"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.05)"
      >
        <Heading mb="10px">Sign Up</Heading>
        <Text mb="20px">Signup your account</Text>
        <Box
          position="relative"
          cursor="pointer"
          onMouseOver={() => setShowOverlay(true)}
          onMouseOut={() => setShowOverlay(false)}
        >
          <Avatar
            cursor="pointer"
            size="xl"
            my={4}
            name={form?.data?.name}
            src={form?.data?.image}
          />
          <Input
            position="absolute"
            type="file"
            width="100%"
            height="100%"
            onChange={uploadImage}
            cursor="pointer"
            top={0}
            left={0}
            opacity={0}
            zIndex={999}
          />
          {showOverlay && (
            <Circle
              position="absolute"
              cursor="pointer"
              style={{
                backgroundColor: "rgb(0, 0, 0, 0.7)",
                transform: "translate(0, 18%)",
              }}
              size="24"
              top={0}
              left={0}
            >
              <Center flexDirection="column">
                {imageLoading ? (
                  <Spinner color="#fff" />
                ) : (
                  <>
                    <Icon color="#fff" fontSize={20} as={AiOutlinePlus} />
                    <Text color="#fff" fontSize={15}>
                      Upload
                    </Text>
                  </>
                )}
              </Center>
            </Circle>
          )}
        </Box>
        <FormControl isInvalid={form?.errors?.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Your Phone Number"
            value={form?.data?.name}
            onChange={(e) => changeValue("name", e.target.value)}
          />
          <FormErrorMessage>{form?.errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl mt="10px" isInvalid={form?.errors?.phone}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="number"
            placeholder="Enter Your Phone Number"
            value={form?.data?.phone}
            onChange={(e) => changeValue("phone", e.target.value)}
          />
          <FormErrorMessage>{form?.errors?.phone}</FormErrorMessage>
        </FormControl>
        <FormControl mt="10px" isInvalid={form?.errors?.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Tooltip
              label="Pasword shoud be 8 letters, including one capital letter, small letter, number and special character"
              placement="bottom-start"
              borderRadius="none"
            >
              <Input
                type={visiblePassword ? "text" : "password"}
                placeholder="Enter Your Password"
                borderEndRadius="none"
                value={form?.data?.password}
                onChange={(e) => changeValue("password", e.target.value)}
              />
            </Tooltip>
            <InputRightAddon
              cursor="pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
              children={
                visiblePassword ? (
                  <AiOutlineEyeInvisible fontSize={18} />
                ) : (
                  <AiOutlineEye fontSize={18} />
                )
              }
            />
          </InputGroup>
          <FormErrorMessage>{form?.errors?.password}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          mt="20px"
          rounded="none"
          width="100%"
          onClick={register}
          isDisabled={loading}
        >
          {loading ? <Spinner /> : "Sign Up"}
        </Button>
        <Flex mt="40px" justifyContent="center" alignItems="center">
          <Text mr="5px">Already Have An Account?</Text>
          <Link to="/">
            <Text color="blue.500" fontWeight="semibold" cursor="pointer">
              Sign In
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
