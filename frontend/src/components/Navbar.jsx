import { Button, Container, Flex, HStack, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { formatDate } from "../utils/date";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
  } from '@chakra-ui/react'
  import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useAuthStore } from "../store/authStore";
const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>

				 	
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Blogger</Link>
				</Text>

				<HStack spacing={5} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
						<FaRobot />
						</Button>
					</Link>
					<Link to={"/create-norm"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Avatar name={user.name[0]} ref={btnRef} colorScheme='teal' onClick={onOpen} className="hover:cursor-pointer"/>

      				<Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Profile</DrawerHeader>
		  <DrawerBody>
			<p>Name:{user.name}</p>
			<p>Last Login:{formatDate(user.lastLogin)}</p>
			<br/>
			<Link to={"/create"} className='text-blue-400 hover:underline'>
						Create a Blog with AI
					</Link>
					<br/>
					<Link to={"/create-norm"} className='text-blue-400 hover:underline'>
						Create a Blog
					</Link>
					<br/>
		  <Link to={`/view/${user.name}`} className='text-blue-400 hover:underline'>
						View all the blogs you created
					</Link>
					<br/>
					<br/>
					<hr/>
			<Text onClick={handleLogout} className="font-bold text-lg hover:text-blue-800 hover:cursor-pointer">Logout</Text>
			

		  </DrawerBody>
        </DrawerContent>
     			</Drawer>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
