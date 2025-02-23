import { Button, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import TaskInput from "../../components/dashboard/form/TaskInput";
import TaskForm from "../../components/dashboard/form/TaskForm";
import { setTokenIntoLocalStorage } from "../../utils/utils";
import { useAuthAccountMutation } from "../../redux/auth/authApi";
import useAuth from "../../hooks/useAuth";
const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const { signIn, updateUserProfile, signInWithGoogle, user, loading, role, setRole } = useAuth();
    const [register, { isLoading }] = useAuthAccountMutation();
    


    const defaultValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (data) => {
        
        const key = 'Login'; 
        message.loading({ content: 'Logging In...', key });
        try {
        
            
            const userInfo = {
                email: data.email,
                password: data.password
            };

          
                await signIn(userInfo.email, userInfo.password);
            

                const tokenData = await register({userInfo, email:userInfo.email}).unwrap();
                
                await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);
            
            setRole(tokenData?.data?.tokenData?.role)
            navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
            message.success({ content: 'Logged in successfully!', key, duration: 2 });
        } catch (err) {
            console.log(err)
            message.error({ content: 'Something went wrong. Please try again.', key, duration: 2 });
        }
    };

    const handleGoogleSignUp = async () => {
        const key = 'register';
        try {
          const response = await signInWithGoogle();
          const { displayName, email, photoURL } = response.user;
    
          const userInfo = { authName: displayName, email, authImgUrl: photoURL };
          const tokenData = await register({userInfo, email:userInfo.email}).unwrap();
          await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);
            
          setRole(tokenData?.data?.tokenData?.role)
          navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
          message.success({ content: 'Signed successfully!', key, duration: 2 });
        } catch (err) {
          console.log("Google Sign-Up Error:", err);
        }
      };

    return (
        <div>
            <Title level={2} style={{ textAlign: 'center' }}>Log In</Title>
            <div></div>
            <div>
            <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
         
   
         <TaskInput type="email" name="email" label="Email" />
         
                <TaskInput type="password" name="password" label="Password" />
         <Button type="primary" htmlType="submit" >Log in</Button>
  
       
   
         </TaskForm>
         <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
            <Button
              onClick={handleGoogleSignUp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
            >
              Sign Up with Google
            </Button>
            </div>
        </div>
    );
};

export default Login;