"use client"

import { CalendarMonth, ChevronLeft, Info, KeyboardArrowDown, LocationOn, Person, QrCode, Refresh, Search, Sort } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Collapse, Container, Divider, Drawer, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { Fragment, useState } from "react"
import {differenceInYears, format} from "date-fns"


function CollapseButton(props){
    const [open, setOpen] = useState(false)

    const { label, date, photo, name} = props;
    return (
        <Box key={`${label}-${name}`}>
            <Button fullWidth sx={{textTransform: 'none', display: 'flex', justifyContent: 'flex-start', '.MuiButton-endIcon': {ml: 'auto'}}} variant="outlined" startIcon={<CalendarMonth/>} endIcon={<KeyboardArrowDown sx={{transition: '.3s transform ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} />} onClick={() => {setOpen(!open)}}>
                {label}
            </Button>
            <Collapse in={open} timeout="auto" sx={{transition: '250ms all ease', bgcolor: 'background.main', height: open ? 'auto' : '0px', overflow: 'hidden'}}>
                <Box p={2}>
                    <Stack direction={'row'} alignItems={'flex-start'} gap={1} flex={1}>
                        <Avatar src={photo ? photo : 'Photo'} sx={{width: 42, height: 42}}></Avatar>
                        <Typography my="auto" variant="body1" fontWeight={800} component={'span'} flex={1}>{name ? name : "No name found"}</Typography>
                    </Stack>
                    <Divider sx={{borderColor: "primary.main", my: 2}}/>
                    <Box sx={{py: 1, px: 2, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', flexDirection: 'column', gap: .5}}>
                        <Typography color="white" variant="h6" component={'span'}>{label ? label + ' on' : 'Not found'}</Typography>
                        <Typography color="white" variant="body2" component={'span'}>{date ? format(date, "MMMM dd, yyyy") + ' at ' +  format(date, "hh:mm a") : 'Not found'}</Typography>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    )
}

function ListRow(props){
    const { name, gender, dob, address, uploaded_via, last_updated, status, stamps, qr, } = props?.data;

    console.log(props)

    const [open, setOpen] = useState(false)


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
                <TableCell sx={{bgcolor: 'white'}}>{last_updated ? format(last_updated?.stamp, "MMMM dd, yyyy") : 'No update found'}</TableCell>
                <TableCell sx={{bgcolor: 'white'}}>
                    {status ? <Chip variant='filled' sx={{bgcolor: `${status === 'Pending' ? 'secondary.main' : 'primary.main'}`, color: "#fff"}} label={status}></Chip> : <Typography variant="body1" component={'span'}>Unidentified</Typography>}
                </TableCell>
                <TableCell sx={{
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    bgcolor: 'white'
                }}>
                    <IconButton>
                        <QrCode></QrCode>
                    </IconButton>
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
                            }}></Avatar>
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
                        <Button fullWidth variant='contained' color="secondary" sx={{color: "#fff"}}>Verify</Button>
                        <Button fullWidth variant='outlined' color="secondary">Print QR</Button>
                    </Stack>
                </Box>
            </Drawer>
        </Fragment>
    )
};

export default function DashboardLayout() {

    const data = [
        {
            name: 'Juan Dela Cruz',
            gender: 'Female',
            dob: new Date('1/30/2000'),
            address: 'Sta. Teresa, Jordan, Guimaras',
            uploaded_via: 'manipesto.ph',
            status: 'Verified',
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
            qr: 'asf1234'
        }
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
                            <Typography color='white' fontWeight={800} variant="h2" component={'span'}>1,000</Typography>
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
                                        { id: 0, value: 10, label: 'series A', color: '#9f55f5' },
                                        { id: 1, value: 15, label: 'series B', color: '#f58a55' },
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
                                        { id: 0, value: 10, label: 'series A', color: '#9f55f5' },
                                        { id: 1, value: 15, label: 'series B', color: '#f58a55' },
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
                                <Box sx={{
                                    textWrap: "nowrap"
                                }}>
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
                                <Paper sx={{
                                    borderRadius: 3,
                                    p: 3,
                                    flex: 1,
                                    whiteSpace: 'nowrap'
                                }}>
                                    <Typography mb={1} variant="h6" component={'h2'}>
                                            Barangay 1
                                        </Typography>
                                    <Typography fontWeight={800} variant="h4" component={'span'}>1,100</Typography>
                                </Paper>
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
                                <Box sx={{
                                    textWrap: "nowrap"
                                }}>
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