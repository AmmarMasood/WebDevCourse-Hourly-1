import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { getUserInfo, logoutUser } from "../Services/auth";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

function Dashboard() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    const res = await getUserInfo(setLoading, setError);
    if (res.success) {
      setUserInfo(res.data);
    }
    // console.log("response", res);
  };
  return (
    <div style={{ height: "100vh" }} className="auth-bg">
      {loading ? (
        <div className="absolute-center" style={{ textAlign: "center" }}>
          <LoadingOutlined
            style={{
              color: "#fff",
              fontSize: "100px",
              fontWeight: "1200",
              margin: "0 auto",
            }}
          />
          <p
            style={{
              color: "#fff",
              fontSize: "40px",
              fontWeight: "900",
              marginTop: "10px",
            }}
          >
            Please wait while we fetch <br /> your details
          </p>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            paddingTop: "100px",
            width: "800px",
            margin: "0 auto",
          }}
        >
          {error ? (
            <h1
              style={{
                fontSize: "50px",
                color: "white",
                fontWeight: "900",
                width: "600px",
                margin: "0 auto",
              }}
            >{`Error: ${error} :(`}</h1>
          ) : (
            userInfo && (
              <>
                <h1
                  style={{
                    color: "#fff",
                    fontWeight: "900",
                    fontSize: "70px",
                    textTransform: "capitalize",
                  }}
                >
                  {`Welcome, ${userInfo.firstname}`}
                </h1>
                <div
                  style={{
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: "20px",
                    margin: "0 0 30px 0px",
                    fontWeight: "600",
                  }}
                >
                  <h3 style={{ color: "inherit", fontSize: "26px" }}>
                    Profile Information
                  </h3>
                  <span>{`Full Name: ${userInfo.firstname} ${userInfo.lastname}`}</span>
                  <span>{`Email: ${userInfo.email}`}</span>
                  <span>{`Account Created On ${moment(
                    userInfo.createdAt
                  ).format("DD/MM/YYYY, h:mm a")}`}</span>
                </div>
                <Button
                  onClick={() => logoutUser(history, setUserInfo)}
                  style={{ width: "300px" }}
                >
                  Log Out
                </Button>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
