/* eslint-disable array-callback-return */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  _fetch,
  _account,
  _transction,
} from "../../ABI-connect/MessangerABI/connect";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import GetUser from "../../components/shared/GetUser";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TransctionModal from "../../components/shared/TransctionModal";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import Nodata from "../shared/NoData";

export default function UserList() {
  const [account, setAccount] = React.useState(null);
  const [session, setSession] = React.useState(null);
  const [start, setStart] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  const [allUesrInputs, setAllUesrInputs] = React.useState([]);

  let history = useNavigate();

  const validateUser = async (account) => {
    if (account) {
      const isValidate = await _fetch("login", account);
      if (!isValidate) {
        history("/login");
        return false;
      }
    } else {
      history("/login");
      return false;
    }
  };

  React.useEffect(() => {
    fetchStudentData();
    // startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // var timer;
  // function startTimer() {
  //   timer = setInterval(function () {
  //     fetchStudentData();
  //     console.log("5 seconds are up");
  //   }, 5000);
  // }

  // function stopTimer() {
  //   alert("Timer stopped");
  //   clearInterval(timer);
  // }

  async function fetchStudentData() {
    const getAllpointingData = await _fetch("getAllpointingData");
    const getCurrentStatus =
      getAllpointingData &&
      getAllpointingData?.find((value) => value?.status === true);
    // console.log("---session===>", getCurrentStatus);
    setSession(getCurrentStatus);
    const account = await _account();
    validateUser(account);
    setAccount(account);

    const getUserAllInputs = await _fetch("getUserAllInputs");
    // console.log("-------->", getUserAllInputs);
    const filterInputforCurrentSession = getUserAllInputs?.filter(
      (inputVal) => inputVal?.title === getCurrentStatus?.title
    );
    setAllUesrInputs(filterInputforCurrentSession);
  }

  const onclickpoint = async (val) => {
    setStart(true);
    const ifAnswred = allUesrInputs.find(
      (val) => val?.uid === account && val?.title === session?.title
    );
    let responseData;
    if (ifAnswred) {
      responseData = await _transction(
        "updateUserInputs",
        ifAnswred?.slNo,
        val.toString()
      );
    } else {
      responseData = await _transction(
        "adduserInputs",
        account,
        session?.title,
        val.toString()
      );
    }

    fetchStudentData();
    setResponse(responseData);
  };

  const publishResult = async () => {
    setStart(true);
    const responseData = await _transction("publishResult", session?.slNo);
    fetchStudentData();
    setResponse(responseData);
  };

  const completeSession = async () => {
    setStart(true);
    await _transction("compleSession", session?.slNo);
    fetchStudentData();
    history("/create");
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  // console.log("===============>", studentData);

  return (
    <>
      {session ? (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{
            marginBottom: 20,
          }}
        >
          {start && (
            <TransctionModal
              response={response}
              modalClose={() => modalClose()}
            />
          )}
          <Grid item xs={12} lg={3} md={3} sm={12}></Grid>
          <Grid item xs={12} lg={6} md={6} sm={12}>
            <h3 style={{ textAlign: "center", margin: 20 }}>
              {session?.title}
            </h3>
            <center>
              {/* <GetUser
            uid={session?.Creator}
            imgStyle={{ height: 60, width: 60 }}
            subtext={"Admin"}
          /> */}
            </center>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={12}></Grid>
          {session && allUesrInputs?.length > 0 ? (
            allUesrInputs.map((data, index) => {
              return (
                <>
                  <Grid item xs={12} lg={3} md={3} sm={12}></Grid>

                  <Grid item xs={12} lg={6} md={6} sm={12}>
                    <Card style={{ padding: 5 }}>
                      <GetUser
                        uid={data?.uid}
                        imgStyle={{ height: 40, width: 40 }}
                        subtext={`user ${data?.title}`}
                        point={
                          (account === data?.uid || session?.show) &&
                          data?.response
                        }
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} lg={3} md={3} sm={12}></Grid>
                </>
              );
            })
          ) : (
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Nodata text="No response" />
            </Grid>
          )}
          <Grid item xs={12} lg={12} md={12} sm={12} style={{ marginTop: 30 }}>
            <center>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(1)}
                >
                  1
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(2)}
                >
                  2
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(3)}
                >
                  3
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(4)}
                >
                  4
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(5)}
                >
                  5
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(6)}
                >
                  6
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(7)}
                >
                  7
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(8)}
                >
                  8
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => onclickpoint(9)}
                >
                  9
                </Button>
                <Button onClick={() => onclickpoint(10)}>10</Button>
              </ButtonGroup>
            </center>
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12} style={{ marginTop: 30 }}>
            <center>
              {session?.Creator === account && (
                <Button variant="contained" onClick={() => publishResult()}>
                  Publish Results
                </Button>
              )}
            </center>
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12} style={{ marginTop: 30 }}>
            <center>
              <Button
                variant="outlined"
                style={{ marginRight: 10 }}
                onClick={() => completeSession()}
              >
                Start New
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => completeSession()}
              >
                Complete
              </Button>
            </center>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} lg={12} md={12} sm={12} style={{ marginTop: 30 }}>
          <Nodata text="There is no active session" />
          <center>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history("/create")}
            >
              Create a new session
            </Button>
          </center>
        </Grid>
      )}
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
        onClick={() => fetchStudentData()}
      >
        <RefreshIcon />
      </Fab>
    </>
  );
}
