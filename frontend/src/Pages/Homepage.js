import React from 'react'
import { Box,  Container, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/authentication/Login'
import Signup from '../Components/authentication/Signup'

const Homepage = () => {
  return (
    <Container>
      <Box 
      d="flex"
      justifyContent="Center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 15px 0"
      borderRadius={"lg"}
      borderWidth={"1px"}
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black" >Chatties</Text>

      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
<Tabs variant='soft-rounded' >
  <TabList mb={"1em"}>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />

    </TabPanel>
    <TabPanel>
     <Signup />
     
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default Homepage