import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authenticateStudent } from "@/helper/student/apicalls";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const token = useSelector((state) => state.studentAuth.token);

    useEffect(() => {
      if (!token) {
        router.push("/student/signin");
      } else {
        try {
          async function verify() {
            const res = await authenticateStudent(token);
            if (!res.ok && res.error) {
              router.push("/student/signin");
            } else {
              if (res.success) {
                setIsAuthenticated(true);
              }
            }
          }
          verify();
        } catch (error) {
          router.push("/student/signin");
        }
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
