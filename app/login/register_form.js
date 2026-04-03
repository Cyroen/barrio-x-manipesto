'use client'

import { Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Input, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';

import '@/app/styles/login.scss'

import React, { useRef, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function RegisterForm({open, close}) {

    const [juanAnim1, setJuanAnim1] = useState(null);

    const containerRef = useRef(null);
    const [useOtherDesignation, setOtherDesignation] = useState(false);
    const [brgyEmail, setUseBrgyEmail] = useState(false);

    const form = useForm({
        defaultValues:{
            Name: "",
            Email: "",
            Barangay: {
                m: '',
                c: ''
            },
            Designation: '',
            Photo: {
              data: "",
              fileName: "",
              base64: "",
              msg: '',
            },
            GovID: {
              front: {
                data: "",
                msg: "",
                base64: ""
              },
              back: {
                data: "",
                msg: "",
                base64: ""
              },
            },
            PIN: "",
            useBrgyEmail: false,

        }
    });

    const {register, handleSubmit, setValue, getValues, clearErrors, formState: {errors}, reset, control} = form;

    const submitForm = (e) =>{
        console.log(form.getValues())
    }
    const submitError = (e) =>{
        console.log(e, form.getValues())
    }

    const convert2base64 = async (e, out) => {
        if(e?.target?.files?.length === 0) return;
        const file = e?.target?.files[0]
        const buffer = await file.arrayBuffer();
        let byteArray = new Int8Array(buffer);
        setValue(`${out}.data`, Buffer.from(byteArray).toString('base64'), {shouldDirty: true, shouldValidate: true});
        setValue(`${out}.base64`, `data:image/jpeg;base64,${Buffer.from(byteArray).toString('base64')}`)
        setValue(`${out}.fileName`, file?.name);
        clearErrors(`${out}.msg`)
    }

    useEffect(()=>{
        console.log(errors, getValues())
    }, [errors])

    return (
        <Stack className={`register_panel ${open ? 'register_open' : 'register_close'}`} py={8} direction={'column'} sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 10,
            maxWidth: 600,
            bgcolor: 'background.main',
        }}>
            <Stack px={4} direction={'row'} gap={3} justifyContent={'space-between'}>
                <Button color='secondary' size='large' onClick={() => close()} startIcon={<ChevronLeftIcon/>}>Back</Button>
                <Typography sx={{
                    lineHeight: '1.634'
                }} variant='h5' color='secondary.main' component={'span'}>Apply for Council Account</Typography>
            </Stack>
            <Divider sx={{my: 3}} flexItem/>
            <Stack component={'form'} autoComplete="off" id="form" method="post" onSubmit={handleSubmit(submitForm, submitError)} px={4} sx={{
                height: '100%',
                overflow: 'auto',
                '&::-webkit-scrollbar':{
                    display: 'none'
                },
                pb: 5,
            }}>
                {/* Photo */}
                <Box mb={5}>
                    <Stack direction={'row'} position={'relative'}>
                        <Box className={`photo_box ${!!errors?.Photo?.msg && 'error'}`} borderRadius={3}>
                            {getValues("Photo.base64").length !== 0 && <Image src={getValues("Photo.base64")} alt="Photo" fill className='photo_image'></Image>}
                        </Box>
                        <label className='photo_input' htmlFor="photo"></label>
                        <input {...register("Photo.msg", {
                            required: {
                                value: true,
                                message: "Photo is empty",
                            },
                        })} id="photo" style={{
                            width: 0,
                            height: 0
                        }} type="file" accept="image/png, image/webp, image/jpeg" onChange={(e) => {convert2base64(e, 'Photo')}}></input>
                        <Typography variant='body1' margin={'auto'} ml={2}>{getValues("Photo.fileName").length !== 0 ? `${getValues("Photo.fileName").toString()}` : "Select a photo of your face"}</Typography>
                    </Stack>
                    {!!errors?.Photo?.msg && <Typography mt={2} color='error' variant='body2'>{errors?.Photo?.msg?.message}</Typography>}
                </Box>

                {/* Name */}
                <TextField {...register("Name", {
                    required: {
                      value: true,
                      message: "Name is empty",
                    },
                })}
                placeholder="eg. Juan Dela Cruz"
                error={!!errors?.Name}
                helperText={errors?.Name?.message} color='secondary' variant='outlined' label="Display Name"></TextField>

                {/* Barangay */}
                <Box className="label-container" px={2} py={3} my={5}>
                    <Typography variant='body1' className='label' component={'span'}>Barangay</Typography>
                    <Stack direction={'row'} gap={3}>
                        <Box flex={1}>
                            <Autocomplete
                                {...register("Designation", {
                                    required: {
                                        value: true,
                                        message: "Designation is empty",
                                    },
                                })}
                                placeholder="eg. Juan Dela Cruz"
                                color='secondary'
                                size='small'
                                disablePortal
                                options={['Barangay Charmain', 'Barangay Kagawad', 'SK Chairman', 'SK Kagawad', 'Barangay Secretary', 'Barangay Treasurer', 'Barangay Tanod', 'Other Staff']}
                                fullWidth
                                onChange={(event, newValue) => {
                                    if(newValue === 'Other Staff'){
                                        setOtherDesignation(true);
                                        return;
                                    }
                                    setOtherDesignation(false);
                                    setValue("Designation", newValue, {shouldDirty: true, shouldValidate: true});
                                }}
                                renderInput={(params) => <TextField color='secondary' {...params} error={!!errors?.Designation}
                                helperText={errors?.Designation?.message} label="Designation" />}
                            />
                        </Box>
                        <Box flex={1}>
                            <Autocomplete
                                {...register("Barangay.m", {
                                    required: {
                                    value: true,
                                    message: "Barangay is empty",
                                    },
                                })}
                                placeholder="eg. Juan Dela Cruz"
                                color='secondary'
                                size='small'
                                disablePortal
                                options={['test1', 'test2']}
                                fullWidth
                                onChange={(event, newValue) => {
                                    setValue("Barangay.m", newValue, {shouldDirty: true, shouldValidate: true});
                                }}
                                renderInput={(params) => <TextField color='secondary' {...params} error={!!errors?.Barangay?.m}
                                helperText={errors?.Barangay?.m?.message} label="Barangay" />}
                            />
                        </Box>
                    </Stack>

                    {useOtherDesignation && <TextField size='small' sx={{my: 2}} {...register("Designation", {
                        required: {
                            value: useOtherDesignation,
                            message: "This field cannot be empty",
                        },
                    })}
                    placeholder="Please Specify"
                    error={!!errors?.Designation}
                    helperText={errors?.Designation?.message} color='secondary' variant='outlined' label="Please Specify" fullWidth></TextField>}
                </Box>

                {/* GovID */}
                <Stack direction={'row'} gap={3} className="label-container" px={2} py={3} my={2}>
                    <Typography variant='body1' className='label' component={'span'}>Government ID</Typography>

                    <Box flex={1}>
                        <Stack direction={'row'} position={'relative'}>
                            <Box className={`gov-id_box front ${!!errors?.GovID?.front?.msg && 'error'}`} borderRadius={3}>
                                {getValues("GovID.front.base64").length !== 0 && <Image src={getValues("GovID.front.base64")} alt="Photo" fill className='photo_image'></Image>}
                            </Box>
                            <label className='photo_input' htmlFor="id_front"></label>
                            <input {...register("GovID.front.msg", {
                                required: {
                                    value: true,
                                    message: "Front Photo is empty",
                                },
                            })} id="id_front" style={{
                                width: 0,
                                height: 0
                            }} type="file" accept="image/png, image/webp, image/jpeg" onChange={(e) => {convert2base64(e, 'GovID.front')}}></input>
                        </Stack>
                        {!!errors?.GovID?.front?.msg && <Typography mt={2} color='error' variant='body2'>{errors?.GovID?.front?.msg?.message}</Typography>}
                    </Box>

                    <Box flex={1}>
                        <Stack direction={'row'} position={'relative'}>
                            <Box className={`gov-id_box back ${!!errors?.GovID?.back?.msg && 'error'}`} borderRadius={3}>
                                {getValues("GovID.back.base64").length !== 0 && <Image src={getValues("GovID.back.base64")} alt="Photo" fill className='photo_image'></Image>}
                            </Box>
                            <label className='photo_input' htmlFor="id_back"></label>
                            <input {...register("GovID.back.msg", {
                                required: {
                                    value: true,
                                    message: "Back Photo is empty",
                                },
                            })} id="id_back" style={{
                                width: 0,
                                height: 0
                            }} type="file" accept="image/png, image/webp, image/jpeg" onChange={(e) => {convert2base64(e, 'GovID.back')}}></input>
                        </Stack>
                        {!!errors?.GovID?.back?.msg && <Typography mt={2} color='error' variant='body2'>{errors?.GovID?.back?.msg?.message}</Typography>}
                    </Box>
                </Stack>

                {/* Email & PIN */}
                <Stack direction={'row'} gap={3} mb={5} my={4}>
                    <Stack direction={'column'} flex={1}>
                        <TextField disabled={brgyEmail} {...register("Email", {
                            required: {
                                value: !brgyEmail,
                                message: "Email is empty",
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        placeholder="eg. JuanDelaCruz@gmail.com"
                        error={!!errors?.Email}
                        helperText={errors?.Email?.message} color='secondary' variant="outlined" name="Email" label="Email" fullWidth size="small"></TextField>
                        <FormGroup sx={{px: 2}}>
                            <FormControlLabel control={<Controller
                            name={"useBrgyEmail"}
                            control={control}
                            render={({ field: props }) => (
                            <Checkbox
                                color='secondary'
                                size="medium"
                                {...props}
                                checked={props.value}
                                onChange={(e) => {props.onChange(e.target.checked); setUseBrgyEmail(e.target.checked);}}
                            />)}/>} label={<Typography sx={{mt: '3px'}} variant='body2' component={'p'}>Use Barangay Email</Typography>} />
                        </FormGroup>
                    </Stack>
                    <Box flex={1}>
                        <TextField
                        {...register("PIN", {
                            required: {
                                value: true,
                                message: "PIN is empty",
                            },
                            pattern: {
                                value: /^[0-9]{4}$/,
                                message: "PIN must be exactly 4 digits",
                            },
                        })}
                        placeholder="eg. 1234"
                        slotProps={{ htmlInput: {maxLength: 4, inputMode: 'numeric'} }}
                        error={!!errors?.PIN}
                        helperText={errors?.PIN?.message}
                        label="4-Digit PIN"
                        type="password"
                    variant="outlined"
                    color="secondary" fullWidth size="small"></TextField>
                    </Box>
                </Stack>

                {/* Submit */}
                <Button type="submit" variant='contained' color='secondary' sx={{
                    color: '#fff'
                }}>Submit</Button>
            </Stack>
        </Stack>
    );
}

export default RegisterForm;