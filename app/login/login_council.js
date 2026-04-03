import { Stack, Typography, Button, TextField, Box, Input, Modal, Paper } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useForm } from "react-hook-form";

export default function LoginCouncil({no_account, forgot_pin}) {

    const [scanQRModal, setScanQRModal] = useState(false)
    const [qr_scan_res, setQRScanRes] = useState('');
    useEffect(() => {
        let scanner = null;
        if(!scanQRModal) {
            if(scanner){
                scanner.pause();
                scanner.clear();
            }
            return;
        };
        scanner = new Html5QrcodeScanner('reader', {qrbox: {width: 300, height: 300}, fps: 10, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]});

        const success_qr = (res) => {
            scanner.clear()
            setValue("QR", res);
            setQRScanRes(res);
            console.log(res)
        }

        const error_qr = (res) => {
            console.error(res)
        }

        scanner.render(success_qr, error_qr);

    }, [scanQRModal])
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTimeout(() => {
                scanImage(file);
            }, 1000);
        }
    };

    const scanImage = async (file) => {
        try {
            const html5Qrcode = new Html5Qrcode("qr-code-reader-results", /* verbose= */ true);
            // Use scanFile method to decode the QR code from the local file
            const result = await html5Qrcode.scanFile(file, /* showImage= */ true)
            console.log(result)
            setValue("QR", result)
            setQRScanRes(result)
        } catch (err) {
            setQRScanRes('not_found')
            console.error(`Error scanning file: ${err}`);
        }
    };

    const form = useForm({
        defaultValues:{
            QR: "",
            PIN: "",
        }
    });
    
    const {register, handleSubmit, setValue, getValues, clearErrors, formState: {errors}, reset, control} = form;

    return (
        <Stack gap={2} pt={3} sx={{
            position: 'relative',
            zIndex: 10
        }}>
            {/* <Stack px={4} direction={'row'} gap={3} justifyContent={'space-between'}>
                <Button disableFocusRipple disableRipple disableTouchRipple color='secondary' size='large' onClick={() => close()} startIcon={<ChevronLeftIcon/>}>Back</Button>
            </Stack> */}
            <Stack mt={5} px={4}  gap={1}>
                {getValues("QR").length === 0 ? <Typography variant='h4' fontWeight={'normal'} color='black' component={'h1'} textAlign={'center'}>
                Sign in using your <Typography color='secondary' variant='h4' component={'span'} fontWeight={700}>QR-Code</Typography>
                </Typography> : <Typography variant='h4' fontWeight={'normal'} color='white' component={'h1'} textAlign={'center'}>
                Enter your <Typography color='secondary' variant='h4' component={'span'} fontWeight={700}>PIN</Typography>
                </Typography>}
            </Stack>
            <Stack direction={'column'} p={4} gap={2}>
                {getValues("QR").length === 0 ? <Stack direction={'column'}>
                <Stack direction={'column'}>
                    <Stack direction={'row'} position={'relative'}>
                        <Box className="qr_box_select" borderRadius={3}></Box>
                        <label className='label' htmlFor="qr_box"></label>
                        <Input id="qr_box" sx={{
                            display: 'none'
                        }} onChange={(e) => {
                            handleFileChange(e)
                        }} type="file" inputProps={{ accept: "image/png, image/webp, image/jpeg" }}></Input>
                        <div id="qr-code-reader-results"></div>
                        <Typography variant='body1' ml={2}>Select Council QR</Typography>
                    </Stack>
                    {qr_scan_res === 'not_found' && <Typography variant='body2' mt={1}>No QR was detected in the selected photo.</Typography>}
                </Stack>

                {/* <Typography my={2} component={'p'} variant='h4' textAlign={'center'}>OR</Typography> */}

                {/* <Button onClick={() => setScanQRModal(true)} variant="contained" color="secondary" sx={{color: "#fff"}}>Scan QR</Button> */}
                </Stack> : <TextField
                    label="4-Digit PIN"
                    type="password" // Use type="password" to mask the input visually
                    slotProps={{htmlInput: {
                        maxLength: 4, // Enforce max length
                        inputMode: 'numeric', // Hint mobile browsers to show a numeric keyboard
                        pattern: '[0-9]*', // Restrict characters to digits only
                        autoComplete: 'off', // Prevent autocomplete for sensitive info
                    }
                    }}
                    variant="standard"
                    color="secondary"
                />}
                <Stack direction={'column'} mt={4}>
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'ceneter'} my={1} gap={1}>
                        <Typography onClick={()=>no_account()} component={'p'} variant='body2' textAlign={'center'} sx={{opacity: .5, cursor: 'pointer'}}>Don't have an account?</Typography>
                        <Typography onClick={()=>forgot_pin()} component={'p'} variant='body2' textAlign={'center'} sx={{opacity: .5, cursor: 'pointer'}}>Forgot PIN?</Typography>
                    </Stack>
                </Stack>
            </Stack>
            {/* <Modal keepMounted onClose={() => {
                setScanQRModal(false)
            }} open={scanQRModal}>
                <Paper sx={{
                    maxWidth: 400,
                    maxHeight: 400,
                    p: 3,
                    m: 'auto',
                    inset: 0,
                    position: 'fixed'
                }}>
                    <div id="reader" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}></div>
                </Paper>
            </Modal> */}
        </Stack>
    );
}