import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Controls from '../../../../../../components/controls/Controls';
import { Form, useForm } from '../../../../../../components/useForm';

const initialFValues = {
  _id: '',
  fullName: '',
  phoneNumber: '',
  address: '',
  status: '',
  isIdle: 1,
  birthday: new Date(),
};

const idle = [
  { id: 0, title: 'Đang giao hàng' },
  { id: 1, title: 'Rảnh' },
];

export default function ShipperForm(props) {
  const { addOrEdit, recordForEdit, nameButton } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required.';

    if ('birthday' in fieldValues)
      temp.birthday = fieldValues.birthday === null ? 'This field is required.' : '';

    if ('phoneNumber' in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber.length === 0
          ? 'This field is required'
          : fieldValues.phoneNumber.length > 9 && fieldValues.phoneNumber.length < 12
          ? ''
          : 'Min 10 and max 11 numbers required.';

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, handleInputBlur, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name*"
            value={values.fullName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.fullName}
          />
          <Controls.Input
            label="Phone Number*"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.phoneNumber}
          />

          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="isIdle"
            label="Status"
            value={Number(values.isIdle)}
            onChange={handleInputChange}
            items={idle}
            disabled={nameButton === 'Add' ? true : false}
          />
          <Controls.DatePicker
            name="birthday"
            label="Birthday*"
            value={values.birthday}
            onChange={handleInputChange}
            error={errors.birthday}
          />

          <div>
            <Controls.Button type="submit" text={nameButton} />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
