import React, {useState} from 'react';
import { Navigate, Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useForm, SubmitHandler} from 'react-hook-form';
import { fetchRegister } from '../../storage/slices/authSlice';
import {
   Paper,
   Typography ,
   TextField,
   FormControl,
   InputLabel,
   ThemeProvider,
   InputAdornment,
   IconButton,
   OutlinedInput,
   Button,
   Avatar,
   createTheme } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import style from './style.module.scss';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

type Inputs = {
   name:string,
   login:string,
   email:string,
   password:string
}


export const Register:React.FC = () => {
   const dispatch = useAppDispatch();


   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [password, setPassword] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [login, setLogin] = useState<string>('');
   const [name, setName] = useState<string>('');

   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

   const{
      register,
      handleSubmit,
      setError,
      formState:{errors, isValid}
   }=useForm<Inputs>({
      defaultValues:{
         name:'',
         login:'',
         email:'',
         password:''
      }, mode: 'all',
   })

   const onSubmit: SubmitHandler<Inputs> =async (data)=>{
      try{

         const value = await dispatch(fetchRegister(data));
         //   console.log(value);
         if(value.payload.token){window.localStorage.setItem('token',value.payload.token )}
      }catch(err){
         console.log(err)
      }};

   const isAuth = useAppSelector(state=>state.auth.user?.token);
   if(isAuth){return<Navigate to='/'/>};


   return (
      <div>
<ThemeProvider theme={darkTheme}>
   <Paper
      style={{margin: 'auto'}}
      elevation={3}
      sx={{
         py: 2,
         width:"50vw",
         textAlign:"center"}}>
      <Typography variant="h5" sx={{m:2}} gutterBottom>
         Регистрация
      </Typography>
      <Avatar sx={{
         width:"6rem",
         height:"6rem",
         margin:"auto"}}
         />
      <form className={style.form} method='POST' onSubmit={handleSubmit((onSubmit))}>
         <FormControl  sx={{m:2}}>
            <TextField
               id="name-input"
               value={name}
               {...register('name', {required: 'Укажите полное имя'})}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
               label="Name"
               error={Boolean(errors.email?.message)}
               helperText={errors.email?.message}
               type="name"
               size="small"
               autoComplete="current-name"/>

         </FormControl>
         <FormControl  sx={{m:2}}>
            <TextField
               id="login-input"
               value={login}
               {...register('login', {required: 'Укажите логин'})}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setLogin(event.target.value)}}
               label="Login"
               error={Boolean(errors.login?.message)}
               helperText={errors.login?.message}
               type="login"
               size="small"
               autoComplete="current-login"/>

         </FormControl>
         <FormControl  sx={{m:2}}>
            <TextField
               id="email-input"
               value={email}
               {...register('email', {required: 'Укажите почту'})}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}
               label="Email"
               error={Boolean(errors.email?.message)}
               helperText={errors.email?.message}
               type="email"
               size="small"
               autoComplete="current-password"/>
         </FormControl>

         <FormControl variant='outlined' sx={{m:2}}>
            <InputLabel htmlFor="password" size='small'>Password</InputLabel>
               <OutlinedInput
               label="password"
               id="password-input"
               size="small"
               value={password}
               error={Boolean(errors.password?.message)}
               {...register('password', {required: 'Укажите пароль'})}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
               autoComplete="current-email"
               type={showPassword ? 'text' : 'password'}
               endAdornment={
                  <InputAdornment position="end">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
               {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
         </InputAdornment>}
         />
         </FormControl>
                  <Button disabled={!isValid} sx={{m:2}} variant="text" type='submit'>Зарегистрироваться</Button>
         </form>
   </Paper>
</ThemeProvider>
</div>
   );
}

export default Register;