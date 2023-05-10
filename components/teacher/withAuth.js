import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authenticateTeacher } from "@/helper/teacher/apicalls";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const token = useSelector((state) => state.teacherAuth.token);

    useEffect(() => {
      if (!token) {
        router.push("/teacher/signin");
      } else {
        try {
          async function verify() {
            const res = await authenticateTeacher(token);

            if (!res.ok && res.error) {
              router.push("/teacher/signin");
            } else {
              if (res.success) {
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const isDesktop = screenWidth >= 900 && screenHeight >= 500;

                if (!isDesktop) {
                  router.push("/teacher/desktop-only"); // redirect to a desktop-only page
                } else {
                  setIsAuthenticated(true);
                }
              }
            }
          }
          verify();
        } catch (error) {
          router.push("/teacher/signin");
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
