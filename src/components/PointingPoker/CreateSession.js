import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import {
  _transction,
  _account,
  _fetch,
} from "../../ABI-connect/MessangerABI/connect";
import { useNavigate } from "react-router-dom";
import TransctionModal from "../../components/shared/TransctionModal";

const VendorSchema = Yup.object().shape({
  uid: Yup.string().required("uid is required"),
});

const CreateSession = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);

  let history = useNavigate();

  const validateUser = async () => {
    setStart(true);
    const account = await _account();
    if (account) {
      const isValidate = await _fetch("login", account);
      setStart(false);
      if (!isValidate) {
        history("/login");
        return false;
      }
    } else {
      history("/login");
      return false;
    }
  };

  useEffect(() => {
    validateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveData = async ({ uid }) => {
    const account = await _account();
    setStart(true);
    const time = Date.now();
    const responseData = await _transction(
      "addnewPointingData",
      account,
      uid,
      time?.toString()
    );
    setResponse(responseData);
  };

  return (
    <>
      {start && (
        <TransctionModal
          response={response}
          modalClose={() => history("/pointing")}
        />
      )}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div style={{ margin: 20 }}>
            <Card
              style={{
                padding: "20px",
                background: "white",
              }}
            >
              <h4>Create Session</h4>
              <Formik
                initialValues={{
                  uid: "",
                }}
                validationSchema={VendorSchema}
                onSubmit={(values, { setSubmitting }) => {
                  saveData(values);
                  setSubmitting(false);
                }}
              >
                {({ touched, errors, isSubmitting, values }) => (
                  <Form>
                    <Grid container>
                      {/* // Title */}
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div
                          className="form-group"
                          style={{ marginLeft: 10, marginTop: 10 }}
                        >
                          <label htmlFor="title" className="my-2">
                            Name <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            name="uid"
                            autoComplete="flase"
                            placeholder="Enter name"
                            className={`form-control text-muted ${
                              touched.uid && errors.uid ? "is-invalid" : ""
                            }`}
                            style={{ marginRight: 10, padding: 9 }}
                          />
                        </div>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div
                          className="form-group"
                          style={{
                            marginLeft: 10,
                            marginTop: 10,
                            float: "right",
                          }}
                        >
                          <span className="input-group-btn">
                            <input
                              className="btn btn-default btn-primary float-right"
                              type="submit"
                              value={"Create"}
                            />
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default CreateSession;
