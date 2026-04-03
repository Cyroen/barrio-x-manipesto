'use client'

import { Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Input, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import '@/app/styles/login.scss'

import React, { useRef, useEffect, useState } from 'react';

import RegisterForm from './register_form';
import Activate_Council from './activate_council';
import LoginCouncil from './login_council';
import VideoPlayer from './gif_controller';

function LoginLayout(props) {

    const [juanAnim1, setJuanAnim1] = useState(null);
    const [userState, setUserState] = useState(null);

    return (
        <Box sx={{overflow: 'hidden', position: 'relative'}}>
            <Container sx={{minHeight: '100vh', display: 'flex', bgcolor: 'Background'}}>
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(10deg,rgba(225, 154, 184, 1) 0%, rgba(159, 85, 245, 1) 80%)',
                    filter: 'blur(1px)',
                }} className={`wave-container ${userState !== 'register' ? 'wave_open' : 'wave_close'}`}>
                    <Image style={{objectFit: 'cover'}} alt="wave bg" src="/images/waves.webp" fill fetchPriority='high' quality={.8}></Image>
                </Box>
                <Stack className={`main-container ${userState !== 'register' ? 'main_open' : 'main_close'}`} direction={'column'} sx={{
                    margin: 'auto',
                    maxWidth: '900px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: '-1',
                        inset: 0,
                        bgcolor: 'background.main',
                        borderRadius: 4,
                    }}></Box>

                    <Box className="juan_popup1">
                        <VideoPlayer play={userState === 'activate_council'} src={'/images/jp1_f.webm'} rev_src={'/images/jp1_b.webm'}></VideoPlayer>
                    </Box>

                    <Stack gap={2} sx={{
                        position: 'relative',
                        zIndex: 10
                    }}>
                        {userState === 'login' || userState === 'register' ? <Stack direction={'column'}>
                            <Stack px={4} pt={4} className='apply-council' gap={1}>
                                <Typography sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }} variant='h3' fontWeight={'bold'} color='black' component={'h1'} textAlign={'center'}>
                                SIGN IN <Typography variant='h5' component={'span'} fontWeight={'bold'} color='primary.main'>manipesto<Typography fontWeight={'bold'} color='secondary' variant='h5' component={'span'}>.barrio</Typography></Typography>
                                </Typography>
                            </Stack>
                            <Stack direction={'column'} p={4}>
                                <Button onClick={()=>{
                                    setUserState('register');
                                }} sx={{borderRadius: 2, mb: 2}} size='medium' variant="contained">Apply for Council Account</Button>
                                <Button onClick={()=>{
                                    setUserState('activate_council');
                                }} sx={{borderRadius: 2}} size='medium' variant="contained">Activate Council Account</Button>


                                <Stack direction={'column'} mt={4}>
                                    <Typography mt={2} component={'p'} variant='body2' sx={{opacity: .5}}>*Login using Staff QR if you already applied for an account.</Typography>
                                    <Button onClick={()=>{
                                        setUserState(null);
                                    }} sx={{borderRadius: 2}} size='small' variant="outlined">Login using Staff QR</Button>
                                    <Typography mt={1} component={'p'} variant='body2' textAlign={'center'} sx={{opacity: .5}}>Forgot PIN?</Typography>

                                </Stack>
                            </Stack>
                        </Stack> : null}
                    </Stack>
                    {userState === 'activate_council' && <Activate_Council close={() => setUserState(null)} register={()=> setUserState('register')}></Activate_Council>}
                    {userState === null && <LoginCouncil no_account={() => setUserState('login')} forgot_pin={() => setUserState('')}></LoginCouncil>}
                </Stack>
            </Container>
            <RegisterForm open={userState === 'register' ? true : false} close={()=> {setUserState(null)}}></RegisterForm>
        </Box>
    );
}

export default LoginLayout;