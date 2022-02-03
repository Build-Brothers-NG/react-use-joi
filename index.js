import Joi from "joi";
import { useEffect, useState } from "react";

const useJoi = (init) => {
  const initError = {
    error: false,
    message: "",
    path: "",
  };
  const [schema, setSchema] = useState({});
  const [values, setValues] = useState(init);
  const [error, setError] = useState(initError);
  const [check, setCheck] = useState(false);

  const validate = (val) => {
    setSchema(val || schema);
    setCheck(true);
    if (Object.keys(schema).length === 0) {
      return;
    }
    try {
      const valid = Joi.object(val || schema).validate(values);
      if (valid.error) {
        setError({
          error: true,
          message: valid.error.details[0].message,
          path: valid.error.details[0].path,
        });
        return;
      }
      setError(initError);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (check) {
      validate();
    }
  }, [values, schema, check]);
  return { Joi, values, error, setSchema, handleChange, validate };
};

export default useJoi;
