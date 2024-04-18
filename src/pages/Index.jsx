import React from "react";
import { ChakraProvider, Box, VStack, Input, Button, Text, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

// Custom theme to extend Chakra UI
const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const PageOne = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("userInput", inputValue);
    navigate("/page-two");
  };

  return (
    <VStack spacing={4}>
      <Input placeholder="Enter something..." value={inputValue} onChange={handleInputChange} />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit and Go to Page Two
      </Button>
    </VStack>
  );
};

const PageTwo = () => {
  const userInput = localStorage.getItem("userInput");

  return (
    <VStack spacing={4}>
      <Text fontSize="xl">Value from Page One:</Text>
      <Text fontSize="lg">{userInput}</Text>
      <Link to="/">
        <Button colorScheme="teal">Go Back to Page One</Button>
      </Link>
    </VStack>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box p={5}>
          <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/page-two" element={<PageTwo />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
