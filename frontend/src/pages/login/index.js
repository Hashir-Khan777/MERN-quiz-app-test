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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isFormValid } from "../../helpers";
import { Auth } from "../../store/actions";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [form, setForm] = useState({
    data: {
      phone: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { loading } = useSelector((store) => store.AuthReducer);

  const login = () => {
    if (!isFormValid(form.data, setForm).includes(false)) {
      setForm({ ...form, errors: {} });
      dispatch(Auth.login(form.data));
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
        <Heading mb="10px">Sign In</Heading>
        <Text mb="20px">Signin your account</Text>
        <FormControl isInvalid={form?.errors?.phone}>
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
          onClick={login}
          isDisabled={loading}
        >
          {loading ? <Spinner /> : "Login"}
        </Button>
        <Flex mt="40px" justifyContent="center" alignItems="center">
          <Text mr="5px">Don't Have An Account?</Text>
          <Link to="/register">
            <Text color="blue.500" fontWeight="semibold" cursor="pointer">
              Sign Up
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
