import React from 'react';
import {Autocomplete} from "@material-ui/lab";
import {countries} from "../../../utils/countries";
import {TextField} from "@material-ui/core";
import {Field} from "formik";

const InputCountry = () => {
  return (
    <Field>
      {({form: {setFieldValue, values}}) => {
        const handleChangeA = (event, value) => {
          setFieldValue('country', value ? value.label : '', true)
        }
        return (
          <Autocomplete
            onChange={handleChangeA}
            options={countries}
            autoHighlight
            defaultValue={values.country}
            getOptionLabel={option => option.label || values.country}
            renderOption={option => (
              <React.Fragment>
                {option.label} ({option.code})
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                margin='dense'
                // value={values.country}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        )
      }}
    </Field>
  );
};

export default InputCountry;