import withAuth from "@/components/admin/withAuth";
import { AdminAttendanceContainer } from "@/styles/admin/panel";
import { useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import * as Yup from "yup";

import {
  getIpVerification,
  setIpVerification,
  getLocationVerification,
  setLocationVerification,
} from "@/helper/admin/apicalls";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import Loading from "@/components/admin/Loading";
import Feedback from "react-bootstrap/Feedback";

const Attendance = () => {
  const id = useSelector((state) => state.adminAuth.id);
  const token = useSelector((state) => state.adminAuth.token);

  const [ipError, setIpError] = useState(null);
  const [ipLoading, setIpLoading] = useState(false);
  const [ipSuccess, setIpSuccess] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const formik1 = useFormik({
    initialValues: {
      ip: "",
      ipSwitch: false,
    },
    validationSchema: Yup.object({
      ip: Yup.string().required("IP address is required."),
    }),
    onSubmit: async (values) => {
      setIpLoading(true);
      try {
        const res = await setIpVerification(id, token, values);
        if (res.error) {
          setIpLoading(false);
          setIpError(res.error);
        } else {
          setIpLoading(false);
          setIpSuccess(true);
        }
      } catch (error) {
        setIpLoading(false);
        setIpError("Internal server error.");
      }
    },
  });

  const formik2 = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
      meters: "",
      locationSwitch: false,
    },
    validationSchema: Yup.object({
      latitude: Yup.string().required("Latitude is required."),
      longitude: Yup.string().required("Longitude is required."),
    }),
    onSubmit: async (values) => {
      try {
        const res = await setLocationVerification(id, token, values);
        if (res.error) {
          setLocationLoading(false);
          setLocationError(res.error);
        } else {
          setLocationLoading(false);
          setLocationSuccess(true);
        }
      } catch (error) {
        setLocationLoading(false);
        setLocationError("Internal server error.");
      }
    },
  });

  const preloadIpVerification = () => {
    setIpLoading(true);
    try {
      getIpVerification(id, token).then((res) => {
        if (res.error) {
          setIpLoading(false);
          setIpError(res.error);
        } else {
          setIpLoading(false);
          formik1.setValues({
            ip: res.data.ipAddress,
            ipSwitch: res.data.isIpVerification,
          });
        }
      });
    } catch (error) {
      setIpLoading(false);
      setIpError("Internal server error.");
    }
  };

  const preloadLocationVerification = async () => {
    setLocationLoading(true);
    try {
      const res = await getLocationVerification(id, token);
      if (res.error) {
        setLocationLoading(false);
        setLocationError(res.error);
      } else {
        setLocationLoading(false);
        formik2.setValues({
          latitude: res.data.credential.lat,
          longitude: res.data.credential.long,
          locationSwitch: res.data.isLocationVerification,
        });
      }
    } catch (error) {
      setLocationLoading(false);
      setLocationError("Internal server error.");
    }
  };

  const handleIpSwitchChange = (e) => {
    formik1.setFieldValue("ipSwitch", !formik1.values.ipSwitch);
  };

  const handleLocationSwitchChange = (e) => {
    formik2.setFieldValue("locationSwitch", !formik2.values.locationSwitch);
  };

  useEffect(() => {
    preloadIpVerification();
    preloadLocationVerification();
  }, [ipSuccess, locationSuccess]);

  return (
    <AdminAttendanceContainer>
      <h1>Attendance</h1>

      {ipLoading && <Loading />}
      {locationLoading && <Loading />}

      {ipError && (
        <Toast
          onClose={() => setIpError(null)}
          show={ipError}
          delay={3000}
          autohide
          bg="danger"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 9999,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            <p>{ipError}</p>
          </Toast.Body>
        </Toast>
      )}

      {locationError && (
        <Toast
          onClose={() => setLocationError(null)}
          show={locationError}
          delay={3000}
          autohide
          bg="danger"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 9999,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            <p>{locationError}</p>
          </Toast.Body>
        </Toast>
      )}

      {ipSuccess && (
        <Toast
          onClose={() => setIpSuccess(false)}
          show={ipSuccess}
          delay={3000}
          autohide
          bg="success"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 9999,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            <p>IP verification updated successfully.</p>
          </Toast.Body>
        </Toast>
      )}

      {locationSuccess && (
        <Toast
          onClose={() => setLocationSuccess(false)}
          show={locationSuccess}
          delay={3000}
          autohide
          bg="success"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 9999,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            <p>Location verification updated successfully.</p>
          </Toast.Body>
        </Toast>
      )}

      <Form className="form1" onSubmit={formik1.handleSubmit}>
        <Form.Group controlId="ip">
          <Form.Label>Manage the IP verification.</Form.Label>
          <div className="d-flex justify-content-around align-items-center">
            <div
              style={{
                width: "80%",
              }}
            >
              <Form.Control
                type="text"
                value={formik1.values.ip}
                name="ip"
                placeholder="IP Address"
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
                disabled={!formik1.values.ipSwitch}
                isInvalid={formik1.errors.ip && formik1.touched.ip}
              />
              <Feedback type="invalid">{formik1.errors.ip}</Feedback>
            </div>
            <Form.Switch
              id="ipSwitch"
              checked={formik1.values.ipSwitch}
              onChange={handleIpSwitchChange}
            />
          </div>
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      </Form>

      <Form className="form2" onSubmit={formik2.handleSubmit}>
        <Form.Group>
          <Form.Label>Manage the Location verification.</Form.Label>
          <div className="d-flex justify-content-around align-items-center">
            <div>
              <Form.Control
                type="text"
                name="latitude"
                placeholder="latitude"
                value={formik2.values.latitude}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                disabled={!formik2.values.locationSwitch}
                isInvalid={formik2.errors.latitude && formik2.touched.latitude}
              />
              <Feedback type="invalid">{formik2.errors.latitude}</Feedback>
            </div>
            <div>
              <Form.Control
                type="text"
                name="longitude"
                placeholder="longitude"
                value={formik2.values.longitude}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                disabled={!formik2.values.locationSwitch}
                isInvalid={
                  formik2.errors.longitude && formik2.touched.longitude
                }
              />
              <Feedback type="invalid">{formik2.errors.longitude}</Feedback>
            </div>
            <div>
              <Form.Control
                type="text"
                name="meters"
                placeholder="meters"
                value={formik2.values.meters}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                disabled={!formik2.values.locationSwitch}
              />
            </div>

            <div>
              <Form.Switch
                id="locationSwitch"
                checked={formik2.values.locationSwitch}
                onChange={handleLocationSwitchChange}
              />
            </div>
          </div>
        </Form.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </AdminAttendanceContainer>
  );
};

export default withAuth(Attendance);
