import { Stack, Typography, Button, TextField } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Activate_Council({close, register}) {
    return (
        <Stack gap={2} pt={3} sx={{
            position: 'relative',
            zIndex: 10
        }}>
            <Stack px={4} direction={'row'} gap={3} justifyContent={'space-between'}>
                <Button disableFocusRipple disableRipple disableTouchRipple color='secondary' size='large' onClick={() => close()} startIcon={<ChevronLeftIcon/>}>Back</Button>
            </Stack>
            <Stack px={4}  gap={1}>
                <Typography variant='h4' fontWeight={'bold'} color='black' component={'h1'} textAlign={'center'}>
                Activate <Typography color='secondary' variant='h4' component={'span'}>Council Account</Typography>
                </Typography>
            </Stack>
            <Stack direction={'column'} p={4} gap={2}>
                <TextField variant="standard" color="secondary" label="Activation Code"></TextField>
                <TextField
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
                />
                <Stack direction={'column'} mt={4}>
                    <Button variant="contained" color="secondary" sx={{color: "#fff"}}>Activate Council Account</Button>
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'ceneter'} my={1} gap={2}>
                        <Typography onClick={()=> register()} variant='body2' textAlign={'center'} sx={{opacity: .5, cursor: 'pointer'}}>Don't have an account?</Typography>
                        <Typography component={'p'} variant='body2' textAlign={'center'} sx={{opacity: .5}}>Forgot PIN?</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}