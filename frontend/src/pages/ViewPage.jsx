import { Container, SimpleGrid, Text, VStack,Box,useColorModeValue,Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/authStore";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const ViewPage = () => {
    const { user } = useAuthStore();

	
	const { fetchProducts, products } = useProductStore();
    const name=user.name;

	useEffect(() => {
		fetchProducts(user.name);
	}, [fetchProducts,user.name]);
	console.log("products", products);
    console.log(name);

  return (
    <div>
      <Box minH={"100vh"} bg={"gray.900"}>

<Navbar />
<Container maxW='container.xl' py={12}>
    <VStack spacing={8}>
        <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            >
            Current Blogs 🚀
        </Text>
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
                ))}

        {products.length === 0 && (
            <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                No Blogs found 😢{" "}
                <Link to={"/create"}>
                    <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                        Create a Blog
                    </Text>
                </Link>
            </Text>
        )}
    </VStack>
</Container>

</Box>


    </div>
  )
}

export default ViewPage
