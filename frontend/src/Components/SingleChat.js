import { Input } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./Miscellaneous/ProfileModal";





import { ChatState } from "../Context/ChatProvider";
import UpdateGroupChatModal from "./Miscellaneous/UpdateGroupChatModal";


const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat, setSelectedChat, user } =
    ChatState();

  

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            
              {!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal user = {getSenderFull(user, selectedChat.users)}/>
                </>
              ):( 
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal 
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}/>
                </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            

            <FormControl
              
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
               
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;