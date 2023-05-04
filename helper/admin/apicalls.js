export const authenticateAdmin = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/authenticate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const resetPassword = async (token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/reset-password?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: values.password,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const verifyEmail = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/verify-email?token=${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

//Teacher

export const getTeachers = async (id, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/getallteachers/${id}`,
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

export const createTeacher = async (id, token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/createteacher/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: values.phone,
        trn: values.trn,
        department: values.department,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const updateTeacher = async (id, token, values, tid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/updateteacher/${id}/${tid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        trn: values.trn,
        department: values.department,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteTeacher = async (id, token, tid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/deleteteacher/${id}/${tid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

//Student

export const getAllStudents = async (id, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/getallstudents/${id}`,
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

//Attendance

export const getIpVerification = async (id, token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/getip/${id}`,
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

export const setIpVerification = async (id, token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/addip/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ipAddress: values.ip,
        isIpVerification: values.ipSwitch,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const getLocationVerification = async (id, token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/getlocation/${id}`,
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

export const setLocationVerification = async (id, token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/addlocation/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lat: values.latitude,
        long: values.longitude,
        meters: values.meters,
        isLocationVerification: values.locationSwitch,
      }),
    }
  );
  const data = await response.json();
  return data;
};
