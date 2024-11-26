import { Box, Button, calc, Container, Heading, Input, useColorModeValue, useToast, VStack,Textarea} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
const CreatePage = () => {
	const { user }=useAuthStore();
	const [newProduct, setNewProduct] = useState({
		title: "",
		authour:user.name,
		body: "",
	});
	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
        console.log(newProduct);
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
		setNewProduct({ title: "", authour: "", body: "" });
	};

	return (
		<div>
		<Box minH={"100vh"}  bg={"gray.900"}>
		<Navbar />

			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} >
					Write down your ideas
				</Heading>

				<Box minW={"full"} minH={"100vh"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Title'
							name='title'
							fontWeight={"bold"}
							bg={"gray.600"}
							value={newProduct.title}
							onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
							/>
						<Textarea
							placeholder='Body...'
							name='body'
							bg={"gray.600"}
							variant={"subtle"}
							height={"80vh"}
							fontWeight={"medium"}
							value={newProduct.body}
							onChange={(e) => setNewProduct({ ...newProduct, body: e.target.value })}
							/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Blog
						</Button>
					</VStack>
				</Box>
			</VStack>

		</Box>
	</div>
	);
};
export default CreatePage;
