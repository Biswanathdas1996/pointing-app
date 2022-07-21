import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { _fetch } from "../../ABI-connect/MessangerABI/connect";
import Skeleton from "@mui/material/Skeleton";

const GetUser = ({
  uid,
  subtext = "",
  hideName = false,
  imgStyle = {},
  point,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    frtchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const frtchData = async () => {
    setLoading(true);

    const repoterData = await _fetch("users", uid);
    setUser(repoterData);
    setLoading(false);
  };

  return (
    <>
      {!loading ? (
        <div
          style={{
            display: "flex",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <Avatar
              alt={user?.name}
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
              }}
              style={imgStyle}
              src={user?.profileImg}
              title={user?.name}
            ></Avatar>

            {!hideName && (
              <p style={{ color: "black", margin: 5, fontWeight: "bold" }}>
                {user?.name}
                <p
                  style={{
                    color: "rgb(118, 118, 118)",
                    fontSize: 12,
                    fontWeight: "400",
                  }}
                >
                  {subtext}
                </p>
              </p>
            )}
          </div>

          <p
            style={{
              color: "black",
              marginRight: 20,
              fontWeight: "bold",
              float: "right",
            }}
          >
            {point || ""}
          </p>
        </div>
      ) : (
        <Skeleton animation="wave" />
      )}
    </>
  );
};

export default GetUser;
