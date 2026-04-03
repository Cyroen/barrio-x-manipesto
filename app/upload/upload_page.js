import { CheckCircle, Close, Create, Delete, Refresh } from "@mui/icons-material";
import { Box, Button, Container, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {useDropzone} from 'react-dropzone';

import Papa from 'papaparse'
import { format } from "date-fns";

function RecordResult({name, birthday, sex, index, key_index}){

    const [progress, setProg] = useState(0)

    useEffect(() => {

        if(progress !== 100){
            if(typeof window !== 'undefined'){
                setInterval(() => {
                    setProg(prev => Math.min(prev + 10, 100))
                }, 1000)
            }
        }
    }, [])

    return (
        <Box position={'relative'} sx={{
            '&::before': {
                content: "''",
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'success.main',
                height: 10,
                borderRadius: 10,
                width: `${progress}%`,
                display: progress === 100 ? 'none' : 'block'
            },
            border: '1px solid #a8a8a8',
            borderRadius: 4,
            overflow: 'hidden',
            minHeight: 'min-content'
        }}>
            <Stack key={`${index}-${key_index}`} direction={'column'} py={2} minHeight={'min-content'}>
                <Stack px={2} direction={'row'} alignItems={'center'}>
                    <Stack direction={'column'} flex={2}>
                        <Typography variant="h6" component={'span'} fontWeight={800}>
                            {name ? name : 'No name found'}
                        </Typography>
                        <Typography variant="body2" component={'p'} sx={{opacity: .5}}>
                            {sex ? sex : 'No sex found'} • {birthday ? format(new Date(birthday), 'MMMM dd, yyyy') : 'No birthday found'}
                        </Typography>
                    </Stack>
                    <Button variant="text" sx={{textTransform: 'none'}} endIcon={progress !== 100 ? <Close/> : <CheckCircle color="success"/>}><Typography variant="body1" sx={{opacity: 0.5}}>{progress !== 100 ? 'Validating...' : 'Success'}</Typography></Button>
                </Stack>
                {/* <Divider flexItem sx={{my: 1}}></Divider>
                <Stack px={2} direction={'row'} alignItems={'center'} flex={1}>
                    <Typography variant="body2" component={'p'} sx={{opacity: .5}}>
                        Actions for this record:
                    </Typography>
                    <Stack ml="auto" direction={'row'} gap={1}>
                        <Button endIcon={<Refresh></Refresh>} sx={{textTransform: 'none'}}>Use this record</Button>
                        <Divider orientation="vertical" flexItem />
                        <Stack gap={1} direction={'row'}>
                            <IconButton>
                                <Create></Create>
                            </IconButton>
                            <IconButton>
                                <Delete></Delete>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack> */}
            </Stack>
        </Box>
    )
}


export default function UploadPage() {
    const onDrop = useCallback((acceptedFiles) => {
        Papa.parse(acceptedFiles[0], {
            header: true, // Converts rows into objects using the first row as keys
            skipEmptyLines: true,
            complete: (results) => {
                setJsonData(results.data); // This is your JSON array
                console.log(results.data);
            },
        });
        console.log(acceptedFiles)
    }, []);

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop
    });

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        console.log('changed data')
    }, [jsonData])

    return (
        <Box px={{xs: 0, md: 2}} py={5} width={'100%'} className="dashboard_container">
            <Container>
                <Box width={"100%"} sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    mb: 2
                }}>
                    <Box sx={{
                        textWrap: "nowrap"
                    }}>
                    <Typography variant='h3' component={"h1"} color="secondary">Upload Record</Typography>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        height: "3px",
                        bgcolor: 'secondary.main',
                        ml: 3
                    }}></Box>
                </Box>
                <Stack direction={'row'} gap={2}>
                    <Stack flex={1} direction={'row'} {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        {/* <input type="file" required={true} style ={{opacity: 0, width: 0}} ref={hiddenInputRef}/> */}
                        <Stack justifyContent={'center'} alignItems={'center'} sx={{
                            width: '100%',
                            height: '100%',
                            border: '7px dashed #fff',
                            backgroundColor: isDragActive ? "#a055f55e" : 'transparent',
                            borderColor: 'primary.main',
                            borderRadius: 3,
                            height: 'calc(100% - 24px * 2)',
                            minHeight: 500,
                            cursor: 'pointer'
                        }}>
                            <Box sx={{
                                position: 'relative',
                                width: '200px',
                                height: '200px'
                            }}>
                                <Image loading="eager" src="/images/upload.webp" fill alt="Upload" style={{objectFit: 'contain'}}></Image>
                            </Box>
                            <Typography variant="h5">Drop or select file here</Typography>
                            <Typography variant="body1" maxWidth={'50%'} textAlign={'center'} mt={2}>Only CSV or XLS(X) files are supported for upload.
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack flex={1} direction={'row'}>
                        <Paper sx={{width: 'calc(100% - 40px * 2)', height: 'calc(100% - 24px * 2)', borderRadius: 4, py: 3, px: 2, display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="h4" component={'div'} mx={2}>Results</Typography>
                            <Stack direction={'column'} gap={2} flex={1} overflow={'auto'} maxHeight={500} mt={2}>
                                {jsonData ? jsonData.map((a, i) => {
                                    console.log(i);
                                    return (
                                        <RecordResult key={`${a?.First} ${a?.Middle} ${a?.Last} ${a?.Suffix} ${i}`} name={`${a?.First} ${a?.Middle} ${a?.Last} ${a?.Suffix}`} birthday={a?.Birthdate} sex={a?.Sex}></RecordResult>
                                    )
                                }) : <Typography component={'div'} variant="body1" m="auto">
                                    No files have been uploaded yet.
                                </Typography>}                             
                            </Stack>
                        </Paper>
                    </Stack>
                </Stack>
                <Box mt={8}>
                    <Typography variant="h5" component={'div'} color="primary.main">Notes in using this feature:</Typography>
                    <ul>
                        <Typography variant="body1" component={'li'} mb={3}>
                            Using the system’s batch upload feature is going to process multiple profile records at once and will take time. Make sure to have a stable internet connection before proceeding with this task to avoid interruptions in the uploading process.
                        </Typography>
                        <Typography variant="body1" component={'li'} mb={3}>
                            To properly align the fields to their respective values, the system strictly adheres to a column structure which you can download via this CSV template. Proceed by using the template before uploading the file.
                        </Typography>
                        <Typography variant="body1" component={'li'} mb={3}>
                            Each record in the file will be validated against the system’s existing data for de-deduplication. Once identified as a duplicate, you will be able to choose which profile record to use or update, and which to dispose of.
                            <ul>
                                <Typography variant="body1" component={'li'}>
                                    The system’s de-duplication process is categorized into two (2). The exact match refers to records with the same name to address; misspelling encapsulates the records with one to two different characters in their name, and; the different address which refers to records with exact matches from their name to their date of birth but with another specified barangay address.
                                </Typography>
                            </ul>
                        </Typography>
                    </ul>
                </Box>
            </Container>
        </Box>
    );
}