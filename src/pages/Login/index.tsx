import React, {useState} from 'react';
import { Navigate, Link } from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
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
   createTheme } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import {useAppDispatch, useAppSelector} from '../../hooks';
import { fetchUserData } from '../../storage/slices/authSlice';

import style from './style.module.scss';

type Inputs = {
   email:string,
   password:string
}

export const Login: React.FC = ()=> {

   const dispatch = useAppDispatch();

   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [errorMesage, setErrorMessage] = useState<string>('');
   const [password, setPassword] = useState<string|null>('')
   const [email, setEmail] = useState<string>('')

   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

   const{register,handleSubmit,setError,formState:{errors}} = useForm<Inputs>({
      defaultValues:{
         email:'',
         password:''
      }, mode: 'all',
   })

   const onSubmit: SubmitHandler<Inputs> = async (data)=>{
         const value = await dispatch(fetchUserData(data));
         if(value.payload.data?.token){window.localStorage.setItem('token',value.payload.data.token )}
         else setErrorMessage(value.payload.response.data.message);

      }
   const darkTheme = createTheme({ palette: { mode: 'dark' } });

   const isAuth = useAppSelector(state=>state.auth.user?.token);
   if(isAuth){return<Navigate to='/'/>};


   return (
      <div><ThemeProvider theme={darkTheme}>
         <Paper variant="outlined" square>
          <Typography variant="h5" sx={{m:2}} gutterBottom>
        Вход
      </Typography>

            <form method ='POST' onSubmit={handleSubmit((onSubmit))} className={style.form}>
               {errorMesage&&<h3 style={{color:"red"}}>{errorMesage}</h3>}
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
                  size='small'
                     label="password"
                     id="password-input"
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
                        edge="end"
                   >
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                 </InputAdornment>}
                 />
               </FormControl>
               <span className={style.register}>Не зарегестрированы?<Link to={'shop/register'}>Создать акаунт</Link></span>
               <Button  sx={{m:2}} variant="text" type='submit'>Войти</Button>

            </form>
         </Paper></ThemeProvider>
   </div>
   );
}

export default Login;