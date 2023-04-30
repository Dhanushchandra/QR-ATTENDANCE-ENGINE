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
  console.log(values);
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
