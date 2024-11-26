import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Heading,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = "gray.200";
	const bg = "gray.800";

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			maxW='full'
			w='100%'
		>

			<Box p={4} w='full'>
				<Heading as='h3' size='md' mb={2}>
					<Center>
					{product.title}
					</Center>
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4} >
					<Center>
					{product.authour}

					</Center>
				</Text>
				<Text  fontSize='lg' color={textColor} mb={4} whiteSpace="pre-line" className="font-serif">
					<Center>
					{product.body}
					</Center>
				</Text>

				<HStack spacing={1123}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Title'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
							/>
							<Input
								placeholder='Authour'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, authour: e.target.value })}
							/>
							<Input
								placeholder='Body'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, body: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ProductCard;
