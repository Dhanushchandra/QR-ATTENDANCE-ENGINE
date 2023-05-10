export const verifyEmail = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/verify-email?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const resetPassword = async (token, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/reset-password?token=${token}`,
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

export const authenticateTeacher = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/authenticate`,
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

export const getClasses = async (token, id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/classes/${id}`,
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

export const createClass = async (token, values, id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/create-class/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const updateClass = async (token, values, id, cid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/update-class/${id}/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteClass = async (token, id, cid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/delete-class/${id}/${cid}`,
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

export const getStudents = async (token, id, cid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/students/${id}/${cid}`,
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

export const addStudent = async (token, id, cid, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/add-student/${id}/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: values.srn,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const removeStudent = async (token, id, cid, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/remove-student/${id}/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: values.srn,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const addStudentToAttendance = async (token, id, cid, values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/update-attendance/${id}/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: values.srn,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const addStudentToAttendanceById = async (token, id, cid, aid, srn) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/update-attendance-by-attendance-id/${id}/${cid}/${aid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: srn,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const removeStudentFromAttendanceById = async (
  token,
  id,
  cid,
  aid,
  srn
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/remove-attendance-by-attendance-id/${id}/${cid}/${aid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: srn,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const getStudentsInAttendance = async (token, id, cid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/recent-attendance-students/${id}/${cid}`,
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

export const removeStudentFromAttendance = async (token, id, cid, srn) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/remove-attendance/${id}/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: srn,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const getAllAttendance = async (token, id, cid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/attendance/${id}/${cid}`,
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

export const getAttendance = async (token, id, cid, attId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/attendance/${id}/${cid}/${attId}`,
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

export const deleteAttendance = async (token, id, cid, attId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/delete-attendance/${id}/${cid}/${attId}`,
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
