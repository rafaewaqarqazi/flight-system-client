import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Field } from "formik";
import { airports } from "../../../utils/airports";

const InputAirports = ({ field }) => {
  return (
    <Field>
      {({ form: { setFieldValue, values } }) => {
        const handleChangeA = (event, value) => {
          setFieldValue(field, value?.code);
        };
        return (
          <Autocomplete
            onChange={handleChangeA}
            options={airports.filter(
              a => a.code !== values.origin && a.code !== values.destination
            )}
            autoHighlight
            getOptionLabel={option => option.name}
            renderOption={option => (
              <React.Fragment>
                {option.name} ({option.code})
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                margin="dense"
                // value={values.country}
                inputProps={{
                  ...params.inputProps
                }}
              />
            )}
          />
        );
      }}
    </Field>
  );
};

export default InputAirports;
