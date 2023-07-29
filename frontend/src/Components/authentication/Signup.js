import React, {useState} from 'react'
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input"
import {VStack} from "@chakra-ui/layout"
import {InputGroup,InputRightElement,Button} from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from "react-router-dom";





const Signup = () => {
    const [show,setShow] = useState(false);
    const [name,setName] =useState();
    const [email,setEmail] =useState();
    const [password,setPassword] =useState();
    const [confirmpassword,setConfirmpassword] =useState(); 
    const [pic,setPic] =useState();
    const [loading,setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();



    const handleClick =()=>setShow(!show);

    

    // const postDetails =(pics)=>{
        
    //     setLoading(true);


    //     if(pic===undefined){
    //         toast({
    //             title: 'Please select a picture',
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottum",
    //           });
    //           return;
    //     }

        

    //     if(pic.type ==="image/jpeg" || pic.type ==="image/png" || pic.type ==="image/jpg"){
    //         const data = new FormData();
    //         data.append('file',pics);
    //         data.append('upload_preset', "chat-app");
    //         data.append('cloud_name','dps9hqpwg');
    //         axios.post("https://api.cloudinary.com/v1_1/dps9hqpwg/image/upload",data)
    //         .then((response) => {
    //             console.log("Cloudinary response:", response);
    //             setPic(response.data.url.toString());
    //             setLoading(false);
    //             toast({
    //                 title: "Image uploaded successfully!",
    //                 status: "success",
    //                 duration: 5000,
    //                 isClosable: true,
    //                 position: "bottom",
    //               });
    //         })
    //         .catch((error) => {
    //             console.log("Cloudinary error:", error);
    //             setLoading(false);
    //           });
    //     }else{
    //         toast({
    //             title: 'Please select a picture',
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottum",
    //         });
    //         setLoading(false);
    //         return;
    //     }
    //  };

    const submitHandle =async()=>{
        setLoading(true);
        
       
        if (!name || !email || !password || !confirmpassword){
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
            if(password!== confirmpassword){
                toast({
                    title: 'Passwords do not match',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: "bottum",
                });
                return
            }

            try{
                const config = {
                    headers:{
                        'Content-Type':'application/json'
                    },
                };
                axios.interceptors.response.use(undefined, error=>{
                    console.log(error.response)
                });
                const {data} = await axios.post("http://localhost:8000/api/user",{name,email,password,pic},config)
                .then(resp=>{
                    return resp ? resp : {}});

                   
                toast({
                    title: "Register Success",
                    status: "success",
                    duration: 5000,
                    isClosable: true, 
                    position: "bottom",
                });
                
                localStorage.setItem('userInfo',JSON.stringify(data));
                setLoading(false);
                navigate('/chats');
            } catch(err){
                console.log(err);
                        
                toast({
                    title: "Register Failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
            }
                 
    };

  return (
    <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}/>
        </FormControl>
        <FormControl id="signInEmail" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        
         <FormControl id="signInPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">

            <Input type={show?"text":"password"} placeholder="Enter Your password" onChange={(e)=>setPassword(e.target.value)}/>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show?"Hide":"show"}
                </Button>
            
            </InputRightElement>

            </InputGroup>
        </FormControl>

         <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">

            <Input type={show?"text":"password"} placeholder="Confirm password" onChange={(e)=>setConfirmpassword(e.target.value)}/>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show?"Hide":"show"}
                </Button>
            
            </InputRightElement>

            </InputGroup>
        </FormControl>
        <FormControl id="pic" isRequired>
            <FormLabel>Upload your Picture</FormLabel>
            <Input type="file" p={1.5} accept='image/*' onChange={(e)=>postDetails(e.target.files[0])}/>
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandle} >
            SignUp

        </Button>
    </VStack>
  )
}

export default Signup