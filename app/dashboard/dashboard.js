"use client"

import { CalendarMonth, ChevronLeft, Info, KeyboardArrowDown, LocationOn, Person, QrCode, Refresh, Search, Sort } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Collapse, Container, Divider, Drawer, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { Fragment, useEffect, useRef, useState } from "react"
import {differenceInYears, format} from "date-fns"
import Image from "next/image";
import { domToBlob } from "modern-screenshot";


function CollapseButton(props){
    const [open, setOpen] = useState(false)

    const { label, date, photo, name} = props;
    return (
        <Box key={`${label}-${name}`}>
            <Button fullWidth sx={{textTransform: 'none', display: 'flex', justifyContent: 'flex-start', '.MuiButton-endIcon': {ml: 'auto'}}} variant="outlined" startIcon={<CalendarMonth/>} endIcon={<KeyboardArrowDown sx={{transition: '.3s transform ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} />} onClick={() => {setOpen(!open)}}>
                {label}
            </Button>
            <Collapse in={open} timeout="auto" sx={{transition: '250ms all ease', bgcolor: 'background.main', height: open ? 'auto' : '0px', overflow: 'hidden'}}>
                <Box>
                    <Stack p={2} sx={{bgcolor: 'primary.main', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}} direction={'row'} alignItems={'flex-start'} gap={1} flex={1}>
                        <Avatar src={photo ? photo : 'Photo'} sx={{width: 42, height: 42}}></Avatar>
                        <Stack direction={'column'} gap={0}>
                            <Typography color="white" my="auto" variant="body1" fontWeight={800} component={'span'} flex={1}>{name ? name : "No name found"}</Typography>
                            <Typography color="white" variant="body2" component={'span'}>{date ? format(date, "MMMM dd, yyyy") + ' at ' +  format(date, "hh:mm a") : 'Not found'}</Typography>
                        </Stack>
                    </Stack>
                    {/* <Box sx={{py: 1, px: 2, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', flexDirection: 'column', gap: .5, mt: 1}}>
                        <Typography color="white" variant="h6" component={'span'}>{label ? label + ' on' : 'Not found'}</Typography>
                        <Typography color="white" variant="body2" component={'span'}>{date ? format(date, "MMMM dd, yyyy") + ' at ' +  format(date, "hh:mm a") : 'Not found'}</Typography>
                    </Box> */}
                </Box>
            </Collapse>
        </Box>
    )
}

function ListRow(props){
    const { name, gender, dob, address, uploaded_via, last_updated, status, stamps, qr, photo } = props?.data;
    const [open, setOpen] = useState(false);
    const [qrPrinting, setQrPrinting] = useState(false);

    
    const ref = useRef(null);

    function download(){
        if(!ref.current) return;
        domToBlob(ref.current, {quality: 1, scale: 1}).then(async (dataUrl_wbkt)=> {
            console.log(dataUrl_wbkt)
            var data = new Blob([dataUrl_wbkt], {type: 'image/png'});
            var csvURL = window.URL.createObjectURL(data);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', `${name}.png`);
            tempLink.click();
            setQrPrinting(false)
        })
    }


    function qrCreate(){
        if(qrPrinting) return;
        setQrPrinting(true);
    }

    useEffect(() => {
        if(qrPrinting){
            download();
        }
    }, [qrPrinting])


    return (
        <Fragment key={`${last_updated}-${name}-${qr}`}>
            <TableRow>
                <TableCell sx={{
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                    bgcolor: 'white'
                }}>
                    <IconButton onClick={()=> setOpen(!open)}>
                        <KeyboardArrowDown sx={{
                            transition: '.3s transform ease',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}></KeyboardArrowDown>
                    </IconButton>
                </TableCell>
                <TableCell sx={{bgcolor: 'white'}}>{name ? name : 'No Name found'}</TableCell>
                <TableCell sx={{bgcolor: 'white'}}>{gender ? gender : 'No Gender found'}</TableCell>
                <TableCell sx={{bgcolor: 'white'}}>{dob ? format(dob, "MM/dd/yyyy") : 'No Date of birth found'} <br/> ({differenceInYears(new Date(), new Date(dob))}yrs old)</TableCell>
                <TableCell sx={{bgcolor: 'white'}}>{address ? address : 'No Address found'}</TableCell>
                <TableCell sx={{bgcolor: 'white'}}>
                    {uploaded_via ? <Chip variant='filled' sx={{bgcolor: 'primary.main', color: "#fff"}} label={uploaded_via}></Chip> : <Typography variant="body1" component={'span'}>Unidentified</Typography>}
                </TableCell>
                <TableCell sx={{bgcolor: 'white'}}>{stamps[0]?.stamp ? format(stamps[0]?.stamp, "MMMM dd, yyyy") : 'No update found'}</TableCell>
                <TableCell sx={{bgcolor: 'white'}}>
                    {status ? <Chip variant='filled' sx={{bgcolor: `${status === 'Pending' ? 'secondary.main' : 'primary.main'}`, color: "#fff"}} label={status}></Chip> : <Typography variant="body1" component={'span'}>Unidentified</Typography>}
                </TableCell>
                <TableCell sx={{
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    bgcolor: 'white'
                }}>
                    <IconButton onClick={()=>{qrCreate()}}>
                        <QrCode></QrCode>
                    </IconButton>
                    {qrPrinting === true && 
                    <Box sx={{opacity: 0, position: 'fixed', zIndex: '-1000'}}>
                        <QrPrintTemp ref={ref} name={name} barangay={address} date={stamps[2]?.stamp}></QrPrintTemp>
                    </Box>}
                </TableCell>
            </TableRow>
            <Drawer className="drawer_dashboard" open={open} onClose={() => {setOpen(false)}} anchor="right" slotProps={{
                paper: {
                    sx: {
                        width: '100%',
                        maxWidth: '400px',
                        '&::-webkit-scrollbar':{
                            display: 'none'
                        },
                    }
                }
            }}>
                <Box sx={{
                    width: '100vw',
                    maxWidth: '400px',
                    background: "#fff"
                }}>
                    <Stack px={4} py={5} direction={'column'} alignItems={'center'} gap={2}>
                        <Button onClick={()=> setOpen(false)} variant="contained" sx={{mr: 'auto', color: "#fff"}} color="secondary" startIcon={<ChevronLeft></ChevronLeft>}>Back</Button>
                        <Stack width={'100%'} direction={'column'} mb={3} gap={1} alignItems={'center'}>
                            <Avatar sx={{
                                width: 120,
                                height: 120,
                                mx: 'auto',
                            }} src={photo ? photo : ''}></Avatar>
                            <Typography mx="auto" variant="h5" component={'div'}>{name ? name : 'No Name Found'}</Typography>
                            {status ? <Chip sx={{bgcolor: `${status === 'Pending' ? 'secondary.main' : 'primary.main'}`, color: "#fff", px: 3, fontWeight: 600, width: 'max-content', textTransform: 'uppercase'}} variant="filled" label={status} size="large"></Chip> : <Typography variant="body1" component={'span'}>Unidentified</Typography>}
                        </Stack>
                        <Stack direction='column' gap={4} overflow={'auto'} flex={1}>
                            <Stack direction={'row'} flexWrap={'nowrap'} width={'100%'} gap={3}>
                                <Stack direction={'row'} alignItems={'center'} gap={1} flex={1}>
                                    <CalendarMonth sx={{mt: '0px'}}></CalendarMonth>
                                    <Typography variant="body1" fontWeight={800} component={'span'} flex={1}>Date of Birth:</Typography>
                                </Stack>
                                <Box flex={1}>
                                    <Typography display={'block'} variant="body1" component={'span'}>{dob ? format(dob, "MM/dd/yyyy") : 'No Date of birth found'}</Typography>
                                    <Typography variant="body2" component={'span'}>{dob ? `${differenceInYears(new Date(), new Date(dob))}yrs old` : 'No Date of birth found'}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction={'row'} flexWrap={'nowrap'} width={'100%'} gap={3}>
                                <Stack direction={'row'} alignItems={'center'} gap={1} flex={1}>
                                    <Person sx={{mt: '0px'}}></Person>
                                    <Typography variant="body1" fontWeight={800} component={'span'} flex={1}>Sex:</Typography>
                                </Stack>
                                <Box flex={1}>
                                    {gender ? <Chip sx={{bgcolor: "primary.main", color: "#fff", px: 3, fontWeight: 600}} variant="filled" label={gender}></Chip> : <Typography variant="body1" component={'span'}>Unidentified</Typography>}
                                </Box>
                            </Stack>
                            <Stack direction={'row'} flexWrap={'nowrap'} width={'100%'} gap={3}>
                                <Stack direction={'row'} alignItems={'center'} gap={1} flex={1}>
                                    <LocationOn sx={{mt: '0px'}}></LocationOn>
                                    <Typography variant="body1" fontWeight={800} component={'span'} flex={1}>Address:</Typography>
                                </Stack>
                                <Box flex={1}>
                                    <Typography display={'block'} variant="body1" component={'span'}>{address ? address : 'No Address found'}</Typography>
                                </Box>
                            </Stack>
                            <Stack gap={2} direction={'column'} mb={3}>
                                {stamps ? stamps.map((a, i) => (
                                    <CollapseButton key={i} name={a?.user?.name} label={a?.label} date={a?.stamp} photo={a?.user?.photo} ></CollapseButton>
                                )) : null}
                            </Stack>
                        </Stack>
                        {status !== 'Verified' && <Button fullWidth variant='contained' color="secondary" sx={{color: "#fff"}}>Verify</Button>}
                        <Button onClick={()=> {qrCreate()}} sx={{color: status === 'Verified' ? 'white' : 'secondary'}} fullWidth variant={status === 'Verified' ? 'contained' : 'outlined'} color="secondary">Print QR</Button>
                    </Stack>
                </Box>
                
            </Drawer>
        </Fragment>
    )
};

function QrPrintTemp(props){

    const {name, barangay, date, ref} = props;
    return (
        <Box ref={ref} className="print_container">
            <Box className="print_grid">
                {Array.from({length: 12}, (_, i) => (
                    <Stack key={i} direction={'column'} className="id_container">
                        <Box className="QR_Container">
                            <Image src="/images/testqr.jpg" fill alt="QR"></Image>
                        </Box>
                        <Stack p={1} direction={'column'} justifyContent={'center'}>
                            <Typography whiteSpace={'wrap'} variant="h6" fontSize={'1rem'} fontFamily={'sans-serif'} component={'div'} fontWeight={800} textAlign={'center'}>{name ? name : 'No name'}</Typography>
                            <Typography whiteSpace={'wrap'} variant="body2" fontSize={'.5rem'} component={'div'} textAlign={'center'}>Owner</Typography>
                            <Divider flexItem sx={{width: "80%", mx: 'auto', my: 0.5}}/>
                            <Typography whiteSpace={'wrap'} variant="body1" fontSize={'.5rem'} component={'div'} textAlign={'center'}>Barangay</Typography>
                            <Typography whiteSpace={'wrap'} variant="body1" fontSize={'.5rem'} component={'div'} textAlign={'center'} mb={2}>Printed on {date ? format(date, "MMM dd, yyyy") + ' at ' +  format(date, "hh:mm a") : 'Not found'}</Typography>
                            <Typography whiteSpace={'wrap'} variant="body2" fontSize={'.5rem'} component={'div'} textAlign={'center'}>This QR ID serves as your record in the passengers manifest. Please present this before boarding the fiber boat vessel.</Typography>
                        </Stack>
                        <Image src="/images/qr_wave1.png" alt="QRWAVE" className="qr_wave1" width={"300"} height="300" />
                        <Image src="/images/qr_wave2.png" alt="QRWAVE" className="qr_wave2" width={"300"} height="300" />
                    </Stack>
                ))}
            </Box>
        </Box>
    )
}

export default function DashboardLayout() {

    const data = [
        {
            name: 'Juan Dela Cruz',
            gender: 'Male',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            uploaded_via: 'manipesto.ph',
            status: 'Verified',
            photo: 'https://i.pinimg.com/736x/54/1a/2e/541a2ef55b87a5f602c3d5d5429b7469.jpg',
            stamps: [
                {
                    label: 'Last updated',
                    stamp: new Date('1/30/2025'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
                {
                    label: 'Created',
                    stamp: new Date('1/30/2025'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
                {
                    label: 'Uploaded',
                    stamp: new Date('1/30/2025'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
                {
                    label: 'Verified',
                    stamp: new Date('1/30/2025'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
            ],
            qr: 'asf123417'
        },
        {
            name: "Julee Gallentes Gabat",
            gender: "Male",
            dob: new Date("06/13/1990"),
            address: "Poblacion, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Pending",
            photo: "https://i.pinimg.com/736x/8a/91/bf/8a91bf7cede4e87ad9d4fac6ffec4baa.jpg",
            stamps: [
                {
                    label: 'Last updated',
                    stamp: new Date('2025-04-04T15:15:10+00:00'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
                {
                    label: 'Created',
                    stamp: new Date('2025-04-04T15:15:10+00:00'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
                {
                    label: 'Uploaded',
                    stamp: new Date('2025-04-04T15:15:10+00:00'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
                {
                    label: 'Verified',
                    stamp: new Date('2025-04-11T15:15:10+00:00'),
                    user: {
                        name: "Juanita Dela Cruzita",
                        photo: ''
                    }
                },
            ],
            qr: 'asf123416'
        },
        {
            name: "George Gerona Jastia",
            gender: "Male",
            dob: "10/15/1988",
            address: "Hoskyn, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Verified",
            photo: "https://i.pinimg.com/736x/f6/c1/02/f6c10243e8422856f53e2deff4bc3bda.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf123415'
        },
        {
            name: "Arcel Moreno",
            gender: "Female",
            dob: new Date("10/15/1988"),
            address: "Hoskyn, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Verified",
            photo: "https://i.pinimg.com/736x/7e/6a/f3/7e6af3330209b8b36f5834411bfba5d5.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf123414'
        },
        {
            name: "Leoniel Cadavos Novis",
            gender: "Female",
            dob: new Date("02/13/1986"),
            address: "Rizal, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Verified",
            photo: "https://i.pinimg.com/736x/88/9f/d1/889fd1f50f79e55cda2a28037c6c7774.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf123413'
        },
        {
            name: "Ferly Estrangero Jardeleza",
            gender: "Female",
            dob: new Date("02/13/1986"),
            address: "Rizal, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Pending",
            photo: "https://i.pinimg.com/1200x/a5/f9/eb/a5f9ebc89551c1d9c8c571a148ec5ec0.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf123412'
        },
        {
            name: "Mario Jalando-on Jardeleza",
            gender: "Male",
            dob: new Date("08/23/1965"),
            address: "Alaguisoc, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Pending",
            photo: "https://i.pinimg.com/736x/2b/e3/99/2be399dc5eb8b1b94564ec69c5d8ce38.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12349'
        },
        {
            name: "Jules Romay Zaldivar",
            gender: "Male",
            dob: new Date("08/23/1965"),
            address: "Poblacion, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "manipesto.ph",
            status: "Pending",
            photo: "https://i.pinimg.com/1200x/05/6d/28/056d2826596ff6f4d10cfd1074d4d0f2.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12348'
        },
        {
            name: "Ruffa Mae Tababa Magno",
            gender: "Female",
            dob: new Date("05/01/1997"),
            address: "Poblacion, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Pending",
            photo: "https://i.pinimg.com/736x/bc/6e/76/bc6e76ebe34499441b7f2baaedfdded5.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12347'
        },
        {
            name: "Lourdes Ngo Magno",
            gender: "Male",
            dob: new Date("08/11/1953"),
            address: "Poblacion, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Verified",
            photo: "https://i.pinimg.com/1200x/5c/f4/38/5cf43886f34d41bebd260ae73d01671d.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12346'
        },
        {
            name: "Rodrigo Pillora Jr",
            gender: "Male",
            dob: new Date("08/19/1953"),
            address: "San Miguel, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Verified",
            photo: "https://i.pinimg.com/736x/8a/91/bf/8a91bf7cede4e87ad9d4fac6ffec4baa.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12345'
        },   
        {
            name: "Honey June Artuz Gabiota",
            gender: "Female",
            dob: new Date("06/10/2000"),
            address: "Alaguisoc, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Verified",
            photo: "https://i.pinimg.com/1200x/84/d4/ef/84d4efd9e8e1fb03275c84e6d45058e5.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12344'
        },   
        {
            name: "Arnel Jordan Jetorino",
            gender: "Male",
            dob: new Date("10/30/1974"),
            address: "Alaguisoc, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Verified",
            photo: "https://i.pinimg.com/736x/3e/57/6b/3e576bcd6dd6b09161f1c63037939515.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12343'
        },   
        {
            name: "Pearl Ivy Bacio Eslabon",
            gender: "Female",
            dob: new Date("06/11/1993"),
            address: "Balcon Maravilla, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Pending",
            photo: "https://i.pinimg.com/1200x/b6/a1/54/b6a15459718548fee93f3aaf498c3a29.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12342'
        },   
        {
            name: "Julienne Anne Gravo",
            gender: "Female",
            dob: new Date("10/06/2003"),
            address: "Balcon Maravilla, Jordan, Guimaras, Region VI (Western Visayas)",
            uploaded_via: "On-Site Reg.",
            status: "Pending",
            photo: "https://i.pinimg.com/1200x/b6/a1/54/b6a15459718548fee93f3aaf498c3a29.jpg",
            stamps: [
            {
                label: 'Last updated',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Created',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Uploaded',
                stamp: new Date('2025-04-04T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            {
                label: 'Verified',
                stamp: new Date('2025-04-11T15:15:10+00:00'),
                user: {
                    name: "Juanita Dela Cruzita",
                    photo: ''
                }
            },
            ],
            qr: 'asf12341'
        },
    ]

    const brgy_data = [
        {label: "Alaguisoc", count: '1,421'},
        {label: "Balcon Melliza", count: '1,334'},
        {label: "Bugnay", count: '1,200'},
        {label: "Buluangan", count: '1,052'},
        {label: "Balcon Maravilla", count: '1,163'},
    ]

    return (
        <Box px={{xs: 0, md: 2}} py={5} width={'100%'} className="dashboard_container">
            <Container>
                <Stack direction={'row'} flexWrap={'wrap'} gap={2} mb={5}>
                    <Stack direction={'column'} flex={1} gap={2}>
                        <Box sx={{
                            bgcolor: 'secondary.main',
                            borderRadius: 3,
                            p: 3,
                            flex: 4,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography color='white' variant="h6" component={'h2'} mb={2}>
                                Total No. of Records
                            </Typography>
                            <Typography color='white' fontWeight={800} variant="h2" component={'span'}>40,000</Typography>
                            <Typography color='white' variant="subtitle2" component={'span'}>*Includes all verified and unverified profile records from all the data sources.</Typography>
                        </Box>
                        <Paper sx={{
                            borderRadius: 3,
                            p: 3,
                            flex: 1
                        }}>
                            <Stack direction={'row'} justifyContent={'space-between'} gap={2} mb={0}>
                                <Typography variant="h6" component={'h2'}>
                                    Updated as of
                                </Typography>
                                <IconButton sx={{
                                    marginTop: '-5px',
                                }}>
                                    <Refresh></Refresh>
                                </IconButton>
                            </Stack>
                            <Typography fontWeight={800} variant="body1" component={'span'}>Jan 1, 2018 at 12:60AM</Typography>
                        </Paper>
                    </Stack>
                    <Paper sx={{
                        borderRadius: 3,
                        p: 3,
                        flex: 1
                    }}>
                        <Typography mb={3} variant="h6" component={'h2'} fontWeight={'bold'}>
                            Sex Group
                        </Typography>
                        <PieChart                   
                            slotProps={{
                                legend: {
                                    direction: 'horizontal',
                                    position: {
                                        vertical: 'bottom',
                                        horizontal: 'center'
                                    },
                                    toggleVisibilityOnClick: true,
                                    sx: {
                                        overflowX: 'auto',
                                        flexWrap: 'nowrap',
                                        width: '100%',
                                        justifyContent: 'center'
                                    },
                                }
                            }}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Male', color: '#9f55f5' },
                                        { id: 1, value: 15, label: 'Female', color: '#f58a55' },
                                    ],
                                    innerRadius: 50,
                                    outerRadius: 100,
                                    paddingAngle: 2,
                                    cornerRadius: 3,
                                },
                            ]}
                            
                            width={200}
                            height={200}
                        />
                    </Paper>
                    <Paper sx={{
                        borderRadius: 3,
                        p: 3,
                        flex: 1,
                    }}>
                        <Typography mb={3} variant="h6" component={'h2'} fontWeight={'bold'}>
                            Verification
                        </Typography>
                        <PieChart
                            slotProps={{
                                legend: {
                                    direction: 'horizontal',
                                    position: {
                                        vertical: 'bottom',
                                        horizontal: 'center'
                                    },
                                    toggleVisibilityOnClick: true,
                                    sx: {
                                        overflowX: 'auto',
                                        flexWrap: 'nowrap',
                                        width: '100%',
                                        justifyContent: 'center'
                                    },
                                }
                            }}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 40, label: 'Verified', color: '#9f55f5' },
                                        { id: 1, value: 25, label: 'Pending', color: '#f58a55' },
                                    ],
                                    innerRadius: 50,
                                    outerRadius: 100,
                                    paddingAngle: 2,
                                    cornerRadius: 3,
                                },
                            ]}
                            
                            width={200}
                            height={200}
                        />
                    </Paper>
                </Stack>
                <Box>
                    <Stack gap={4}>
                        <Box sx={{
                            borderRadius: 4,
                            py: 5,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Box width={"100%"} sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                mb: 2
                            }}>
                                <Box sx={{whiteSpace: {xs: 'wrap', md: 'nowrap'}}}>
                                    <Typography variant='h3' component={"h2"} color="secondary">Barangay Records</Typography>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    height: "3px",
                                    bgcolor: 'secondary.main',
                                    ml: 3
                                }}></Box>
                            </Box>
                            <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
                                {brgy_data && brgy_data.map((a, i) => (
                                    <Paper key={a?.label} sx={{
                                    borderRadius: 3,
                                    p: 3,
                                    flex: 1,
                                    whiteSpace: 'nowrap'
                                }}>
                                    <Typography mb={1} variant="h6" component={'h2'}>
                                            {a?.label}
                                        </Typography>
                                    <Typography fontWeight={800} variant="h4" component={'span'}>{a?.count}</Typography>
                                </Paper>
                                ))}
                            </Stack>
                            <Button sx={{ml: 'auto', mt: 2}} variant="text">See More</Button>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Stack gap={4}>
                        <Box sx={{
                            borderRadius: 4,
                            py: 5,
                            width: '100%',
                        }}>
                            <Box width={"100%"} sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                mb: 2
                            }}>
                                <Box sx={{whiteSpace: {xs: 'wrap', md: 'nowrap'}}}>
                                <Typography variant='h3' component={"h2"} color="secondary">Profile Records</Typography>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    height: "3px",
                                    bgcolor: 'secondary.main',
                                    ml: 3
                                }}></Box>
                            </Box>
                            <Stack width={'100%'} my={1} direction={'row'} gap={1}>
                                <TextField fullWidth hiddenLabel placeholder="Search..." size="small" sx={{
                                    minWidth: 300,
                                    bgcolor: "white"
                                }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}></TextField>
                                    <IconButton sx={{bgcolor: 'primary.main', color: "white", borderRadius: 2}}>
                                        <Sort></Sort>
                                    </IconButton>
                            </Stack>
                            <TableContainer sx={{
                                borderRadius: 4,
                                py: 3,
                                width: '100%',
                                whiteSpace: 'nowrap',
                                overflow: 'auto',
                                maxHeight: 600
                            }}>
                                <Table sx={{
                                    minWidth: 1200,
                                    borderSpacing: '0 20px',
                                    borderCollapse: 'separate',
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{
                                                borderTopLeftRadius: 50,
                                                borderBottomLeftRadius: 50,
                                                bgcolor: 'white'
                                            }}></TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Name</TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Gender</TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Date of Birth</TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Address</TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Uploaded via</TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Last updated</TableCell>
                                            <TableCell sx={{bgcolor: 'white'}}>Status</TableCell>
                                            <TableCell sx={{
                                                borderTopRightRadius: 50,
                                                borderBottomRightRadius: 50,
                                                bgcolor: 'white'
                                            }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data ? data.map((a, i) => {
                                            return (
                                                <ListRow data={a} key={a?.qr}></ListRow>
                                            )
                                        }) : <div></div>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}