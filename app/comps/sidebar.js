'use client'

import { AppBar, Avatar, Box, Button, Chip, Container, IconButton, Menu, Stack, Tooltip } from "@mui/material";
import "@/app/styles/dashboard.scss"

import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useEffect, useRef, useState } from "react";
import { CloudUpload, Home, LocationOn, Logout } from "@mui/icons-material";
import Image from "next/image";
import {format} from "date-fns"


function Sidebar(props) {
    const [open, setOpen] = useState(true);

    const [date, setDate] = useState(new Date())
    const timeRef = useRef(null);
    const dateRef = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const openAcc = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

        if(typeof window !== 'undefined'){
            setInterval(() => {

            const dateObject = new Date();
            if(timeRef.current !== null && dateRef.current !== null){
                timeRef.current.innerText = format(dateObject, "hh:mm a");
                dateRef.current.innerText = format(dateObject, "cccc, MMMM d, yyyy");
            }
            }, 1000)
        }

    }, [])

    return (
        <main className="main_" style={{minHeight: '100vh'}}>
            <Drawer slotProps={{
                paper: {
                    elevation: 3,
                    sx: {
                        overflow: 'hidden auto'
                    }
                }
            }} variant="permanent" className={`${open ? 'expand' : 'collapsed'} sidebar`} open={open}>
                <Stack className="avatar_container" direction={'column'} gap={1} p={2} justifyContent={'center'} alignItems={'center'}>
                    <Avatar className="avatar" sx={{
                        width: open ? 120 : 40,
                        height: open ? 120 : 40
                    }} onClick={()=>setOpen(!open)}>
                    </Avatar>
                    <Typography className="name" variant="h5" component={'p'}>Name here</Typography>
                    <Chip className="designation" label="Designation"></Chip>
                    <Box sx={{
                        width: '100%',
                        borderRadius: 50,
                        bgcolor: 'primary.main',
                        p: 1,
                        textAlign: 'center'
                    }} className="barangay"><Typography variant="h6" component={'span'} color="#fff" textAlign={'center'} width={'100%'}>Barangay</Typography></Box>
                </Stack>
                <Divider />
                <Stack className="located_on" mx="auto" direction={'row'} p={2} justifyContent={'center'} alignItems={'center'}>
                    <Tooltip title="Sta. Teresa, Jordan, Guimaras">
                        <LocationOn></LocationOn>
                    </Tooltip>
                    <Typography variant="body1" component={'p'}>Sta. Teresa, Jordan, Guimaras</Typography>
                </Stack>
                <Divider />
                <Stack py={3} gap={0}>
                    <Stack className="sidebar_link">
                        <Home></Home>
                        <Typography variant="h6" component={'div'}>Home</Typography>
                    </Stack>
                    <Stack className="sidebar_link">
                        <CloudUpload></CloudUpload>
                        <Typography variant="h6" component={'div'}>Batch Upload</Typography>
                    </Stack>
                </Stack>
                <Stack flex={1} py={2} px={open ? 2 : 0} className="clock_outer_container">
                    <Stack direction={'column'} position={'relative'} mt="auto">
                        <Box className="clock_image" height={100} position={'relative'} overflow={'hidden'}>
                            <Image width={250} height={100} alt="Juan Looking at you menacingly" src="/images/juan_lookingatyou_menacingly.webp" style={{objectFit: "contain", transform: 'scale(2) translate(0px, -25px)', width: '250px', height: '100px'}}></Image>
                        </Box>
                        <Box className="clock_outer_container" sx={{
                            // height: 150,
                            borderRadius: open ? 3 : 0,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            px: open ? 3 : 0,
                            py: 2,
                            bgcolor: 'primary.main'
                        }}>
                            <Box className="clock_container" sx={{
                                position: 'relative',
                                zIndex: 100,
                                m: 'auto',
                                opacity: open ? 1 : 0
                            }}>
                                <Typography sx={{whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} variant='h5' component={"p"} color='white'>
                                    It is currently
                                    <Typography ref={timeRef} sx={{whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} variant="h5" fontWeight={'bold'} color="white" component={'span'} display={'block'}>
                                        {date && format(date, "hh:mm a")}
                                    </Typography>
                                </Typography>
                                <Typography ref={dateRef} sx={{whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} variant='body1' component={"p"} color='white'>
                                    {date && format(date, "cccc, MMMM d, yyyy")}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Button sx={{mt: 2, minHeight: 'min-content'}} className="logout_button" variant="outlined" startIcon={<Logout className="logout_icon"/>}><Typography className="logout_text" variant="button" color="primary">Logout</Typography></Button>
                </Stack>
            </Drawer>
            <AppBar position="fixed" sx={{bgcolor: 'primary.main'}} className="appbar">
                <Container>
                    <Stack my={1} direction={'row'} alignItems={'center'}>
                        <Stack>
                            <Typography ref={dateRef} variant="h6" color="#fff">{date && format(date, "cccc, MMMM d, yyyy")}</Typography>
                            <Typography ref={timeRef} variant="subtitle1" color="#fff">{date && format(date, "hh:mm a")}</Typography>
                        </Stack>
                        <Box ml="auto">
                            <Tooltip sx={{ml: 'auto'}} title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 36, height: 36 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={openAcc}
                                onClose={handleClose}
                                slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Stack px={2} py={1} gap={2}>
                                    <Stack direction={'column'} gap={1}>
                                        <Typography textAlign={'center'} variant="h5" >Name</Typography>
                                        <Chip sx={{color: "#fff", bgcolor: 'primary.main'}} className="designation" variant="body1" label="Designation"></Chip>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                                        <LocationOn/>
                                        <Typography textAlign={'right'} variant="body1">Sta Teresa, Jordan, Guimaras</Typography>
                                    </Stack>
                                    <Divider/>
                                    <Button variant="text" startIcon={<Logout></Logout>}>Logout</Button>
                                </Stack>
                            </Menu>
                        </Box>
                    </Stack>
                </Container>
            </AppBar>
        </main>
    );
}

export default Sidebar;