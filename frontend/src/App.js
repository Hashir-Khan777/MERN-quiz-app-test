import { ChakraProvider, useToast } from "@chakra-ui/react";
import AppRouter from "./router";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "./store/reducers/toast.reducer";
import { useEffect } from "react";
import { Auth } from "./store/actions";

const App = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const { type, message } = useSelector((store) => store.ToastReducer);

  useEffect(() => {
    if (type && message) {
      toast({
        description: message,
        status: type,
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      dispatch(
        showToast({
          type: null,
          message: null,
        })
      );
    }
  }, [type, message, dispatch, toast]);

  useEffect(() => {
    dispatch(Auth.verifyUser());
  }, [dispatch]);

  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
};

export default App;
