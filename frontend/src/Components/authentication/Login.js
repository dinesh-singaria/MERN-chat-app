import React,{useState} from 'react';
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input"
import {VStack} from "@chakra-ui/layout"
import {InputGroup,InputRightElement,Button} from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";




const Login = () => {
   const [show,setShow] = useState(false);
   const handleClick =()=>setShow(!show);
   
    const [email,setEmail] =useState();
    const [password,setPassword] =useState();
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { setUser } = ChatState();
   
    

   

    const submitHandle =async()=>{
        setLoading(true);
        
       
        if ( !email || !password ){
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottum",
            });
            setLoading(false);
            return;
        }

        try{
            const config = {
                headers:{
                    'Content-Type':'application/json'
                },
            }
        axios.interceptors.response.use(undefined, error=>{
            console.log(error.response)
        });
        
        const {data} = await axios.post('http://localhost:8000/api/user/login',{email,password},config)
        .then(resp=>{
            return resp ? resp : {}});
        toast({
            title: "Login Success",
            status: "success",
            duration: 5000,
            isClosable: true, 
            position: "bottom ",
        });
        setUser(data);

        localStorage.setItem('userInfo',JSON.stringify(data));
        setLoading(false);
        navigate('/chats');
            } catch(err){
                console.log(err);
                        
                toast({
                    title: "Login Failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
                setLoading(false);
            }
            
                 
    };
  return (
     <VStack spacing="5px">
        
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        
         <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">

            <Input type={show?"text":"password"} placeholder="Enter Your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show?"Hide":"show"}
                </Button>
            
            </InputRightElement>

            </InputGroup>
        </FormControl>


        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandle}>
            Login

        </Button>

        <Button variant="solid" colorScheme="red" width="100%" isLoading={loading}  onClick={()=>{
          setEmail("guest2example.com");
          setPassword("123456")
        }}>
            Get Guest User Credentials

        </Button>

    </VStack>
  )
}

export default Login