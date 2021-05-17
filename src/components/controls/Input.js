import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    onBlur,
    isDisableEmail,
    disabled,
    ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      disabled={isDisableEmail || disabled}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  isDisableEmail: PropTypes.bool,
};

Input.defaultProps = {
  name: '',
  label: '',
  value: undefined,
  error: '',
  onChange: null,
  onBlur: null,
  items: [],
  disabled: null,
  indexs: [],
  isDisableEmail: null,
};
