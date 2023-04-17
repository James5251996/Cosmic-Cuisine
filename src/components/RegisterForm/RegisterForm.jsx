import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';



function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('')
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        avatar: avatar,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <FormControl fullWidth>
        <InputLabel id="select-avatar">Avatar</InputLabel>
        <Select
        labelId='select-avatar'
        id='avatar'
        value={avatar}
        label="avatar"
        onChange={(event) => setAvatar(event.target.value)}>
          <MenuItem value="https://cdn.dribbble.com/users/38298/screenshots/2530382/attachments/499551/eagle-2.jpg?compress=1&resize=400x300&vertical=top">Eagle</MenuItem>
          <MenuItem value="https://cdn.dribbble.com/users/981588/screenshots/2539488/media/139bf7e8ef44365ed7214c7c35819104.jpg?compress=1&resize=400x300&vertical=top">Gorilla</MenuItem>
          <MenuItem value="https://thumbs.dreamstime.com/b/epic-cool-elephant-vector-cartoon-epic-cool-elephant-avatar-character-cartoon-doodle-color-emoticon-mascot-icon-213585819.jpg">Elephant</MenuItem>
          <MenuItem value="https://st3.depositphotos.com/14846838/18964/v/600/depositphotos_189649430-stock-illustration-lion-roaring.jpg">Lion</MenuItem>
          <MenuItem value="https://ih1.redbubble.net/image.4645337244.9570/st,small,507x507-pad,600x600,f8f8f8.jpg">Tiger</MenuItem>
        </Select>
        </FormControl>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
