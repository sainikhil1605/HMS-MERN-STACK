import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";

function Profile() {
  const [patientDetails, setPatientDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { _id } = jwt(localStorage.getItem("token"));
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    const getData = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`/patient/${_id}`);
      if (res.status === 200) {
        setPatientDetails(res.data.patient?.[0]);
        setLoading(false);
      }
    };
    getData();
  }, [_id]);
  const handleSubmit = async () => {
    const res = await axiosInstance.patch(`/patient/${_id}`, {
      ...patientDetails,
    });
    alert("Details Updated Successfully");
  };
  console.log(patientDetails);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Row className="mt-4">
        <Col>
          <h1>Edit Profile</h1>
          <Form>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Name</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails?.name}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Email</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails?.email}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Phone Number</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails?.phone}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Adress</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails?.address}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col sm="6"></Col>
      </Row>
    </div>
  );
}

export default Profile;