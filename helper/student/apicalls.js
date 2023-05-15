export const studentSignin = async (values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/signin`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    }
  );
  return response.json();
};

export const authenticateStudent = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/authenticate`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const resetPassword = async (values, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/reset-password?token=${token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password: values.password,
      }),
    }
  );
  return response.json();
};

export const universitiesList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/universities`
  );
  return res.json();
};

export const studentSignup = async (values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/createstudent`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: values.phone,
        university: values.university,
        department: values.department,
        srn: values.srn,
      }),
    }
  );
  return response.json();
};

export const verifyEmail = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/verify-email?token=${token}`
  );
  return response.json();
};

export const getAllStudentClasses = async (token, id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/classes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export const getStudentAttendanceByClassId = async (token, id, cid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/get-attendance/${id}/${cid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export const registerAttendance = async (
  token,
  id,
  cid,
  qrcode,
  ipAddress,
  location
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/register-attendance/${id}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        qrCodes: qrcode,
        classId: cid,
        ip: ipAddress,
        lat: location.latitude,
        long: location.longitude,
      }),
    }
  );
  return response.json();
};

export const getAttendancePercentage = async (token, id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/get-attendance-percentage/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
