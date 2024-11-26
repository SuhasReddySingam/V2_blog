import { Box, Button,  Container, Heading, Input,  useToast, VStack,Text,Textarea,HStack,Stack,Skeleton,SkeletonCircle,SkeletonText} from "@chakra-ui/react";
import React,{ useState,Component} from "react";
import { useProductStore } from "../store/product";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import {HfInference} from '@huggingface/inference';
const CreatePage = () => {
    const inference=new HfInference(import.meta.env.VITE_API_KEY);
    const model="meta-llama/Llama-3.2-3B-Instruct";
    const { user }=useAuthStore();
    const [newPrompt,setNewPrompt]=useState("");
	const[style,setStyle]=useState("Professional");
	const [userReq,setUserReq]=useState("");
	const [summary,setSummary]=useState("");
	const [output,setOutput]=useState();
	const toast = useToast();
	const [isLoading,setIsLoading]=useState(false);
	const textColor = "gray.200";
	const bg = "gray.900";
	const [blog,setBlog]=useState({
		title:"Made with blogger",
		authour:user.name,
		body:""
	})

	const { createProduct } = useProductStore();

	const handleStyle=(event)=>{
		setStyle(event.target.value);
	}

	const makeBlog = async () => {
		setOutput("");
		setIsLoading(true);
		let currentOutput = "";
	  
		for await (const output of inference.textGenerationStream({
		  model: model,
		  inputs: newPrompt+" in a "+style+" style.",
		  parameters: { max_new_tokens: 800, return_full_text: false }
		})) {
			if(output.generated_text!=null){
				setIsLoading(false);
				currentOutput += output.generated_text;
				setOutput(currentOutput);
			}
		}
	  
		
		console.log(output);
		console.log(user.name);
		console.log(newPrompt);
	  };
	const generateSummary=async()=>{
		const result=await inference.summarization({
			model: 'facebook/bart-large-cnn',
			inputs:
			  [userReq+"answer please enter an input if no string is recived"],
			parameters: {
			  max_length: 100
			}
		  })
		  setSummary(result.summary_text);
		  setUserReq("");
	}
	const saveBlog= async () =>{
		setBlog({...blog,body:output});
		const { success, message } = await createProduct(blog)
				if (!success) {
					toast({
						title: "Error",
						description: message,
						status: "error",
						isClosable: true,
					});
				} else {
					toast({
						title: "Success",
						description: message,
						status: "success",
						isClosable: true,
					});
				}
        setNewPrompt("");

	}
    

	return (
		<div>
		<Box minH={"100vh"} bg={"gray.900"} minW={"100vh"}>
		<Navbar />
		<Box
			shadow='lg'
			overflow='hidden'
			bg={bg}
			maxW='full'
			w='100%'
			rounded={"4px"}
			p="4"
			borderStyle={"groove"}
			
		>
		<VStack>
		<Container maxW={"container.lg"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}
				bgGradient={"linear(to-r, cyan.400, blue.500)"}
				bgClip={"text"}>
				Hi there <span className="bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text">{user.name}</span> enter your prompt to begin your AI Blog generation journey
				</Heading>
				<h1>{style}</h1>

				<Box w={"full"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>

                        <Input
							placeholder='Prompt'
							name='prompt'
							value={newPrompt}
							onChange={(e) => setNewPrompt(e.target.value)}
							/>
				<br/>
				<br/>
				<h1 className="font-bold text-2xl">Select a writing style</h1>
				<br/>
				<HStack>

			<div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
    			<input id="bordered-radio-1" type="radio" value="Professional"  class="w-4 h-3 bg-gray-100 border-gray-300" checked={style==="Professional"} onChange={handleStyle} />
    			<label for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">🧳 Professional</label>
			</div>
				
			<div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
    			<input id="bordered-radio-1" type="radio" value="Casual"  class="w-4 h-3  bg-gray-100 border-gray-300ing-blue-600" checked={style==="Casual"} onChange={handleStyle} />
    			<label for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">🙍‍♂️ Casual</label>
			</div>
				</HStack>
				<br/>
						<Button colorScheme='blue' onClick={makeBlog} w='full' isDisabled={newPrompt.length===0}>
							Generate
						</Button>


				</Box>
			</VStack>
		</Container>
		
		<Box w={"full"}  p={6} rounded={"lg"} shadow={"md"} borderStyle={"groove"} bg={bg}>

						{output !== undefined && (
							<VStack spacing={9}>
					<Text fontWeight='semi-bold' fontSize='lg' color={textColor} mb={4} whiteSpace="pre-line" >
						{output}

						<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={saveBlog}
						disabled={isLoading}
						hidden={isLoading}
						className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'>
							Save the Blog
						</motion.button>

					</Text>
						</VStack>
       						 )}
					{isLoading === true && (
						<Text>
							{isLoading === true &&(
								<HStack gap="5">
								  <Stack flex="1">
									<Skeleton height="5" />
									<Skeleton height="5" width="80%" />
									<SkeletonText noOfLines={5} gap={4} />
								  </Stack>
								</HStack>
							)}
            	</Text>
        					)}

				</Box>
		     </VStack>
				</Box>
			{/* <VStack spacing={4}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
						Summarize
				</Heading>

				<Box w={"120vh"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
					<Textarea
							placeholder='Enter your text'
							name='body'
							bg={"gray.600"}
							variant={"subtle"}
							height={"40vh"}
							fontWeight={"medium"}
							resize={"both"}
							 onChange={(e) => setUserReq(e.target.value)}
							/>
						<Button colorScheme='blue' onClick={generateSummary} w='full' isDisabled={userReq.length===0}>
							Generate Summary
						</Button>
					</VStack>
				</Box>
			</VStack>
			<Box w={"full"}  p={6} rounded={"lg"} shadow={"md"} >
					<VStack spacing={9}>

						{summary !== undefined && (
					<Text fontWeight='semi-bold' fontSize='lg' color={textColor} mb={4} whiteSpace="pre-line">
						{summary}
					</Text>
       						 )}
						</VStack>
					{summary === undefined && (
            	<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            	</Text>
        					)}

				</Box> */}
		</Box>
	</div>
	);
};
export default CreatePage;
