/* eslint-disable no-unused-vars */
import { Button, Form, Image, Input, message, Typography, Upload } from "antd";
import TaskForm from "../../components/dashboard/form/TaskForm";
import TaskInput from "../../components/dashboard/form/TaskInput";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useAuthAccountMutation } from "../../redux/auth/authApi";
import { useImageUploadMutation } from "../../redux/imageUpload/imageUploadApi";
import { setTokenIntoLocalStorage } from "../../utils/utils";
import { PlusOutlined } from '@ant-design/icons';
import useAuth from "../../hooks/useAuth";
import regImg from "../../assets/reg.jpg";

const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, signInWithGoogle, user, loading, role, setRole } = useAuth();
    const [register, { isLoading }] = useAuthAccountMutation();
    const [imageUpload] = useImageUploadMutation();


    const defaultValues = {
        authName: '',
        authImgUrl: null,
        email: '',
        password: '',
    };

    const onSubmit = async (data) => {
        
        const key = 'register'; 
        message.loading({ content: 'Signing Up...', key });
        try {
            const formData = new FormData();
            formData.append("file", data.image);
            formData.append("upload_preset", "portfolio-blog"); 
            const response = await imageUpload(formData).unwrap();
            
            const userInfo = {
                authName: data.authName,
                authImgUrl: response?.secure_url,
                email: data.email,
                password: data.password
            };

          
                await createUser(userInfo.email, userInfo.password);
            
                await updateUserProfile(userInfo.authName, userInfo.authImgUrl);

                const tokenData = await register({userInfo, email:userInfo.email}).unwrap();
                
                await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);
            
            setRole(tokenData?.data?.tokenData?.role)
            navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
            message.success({ content: 'Signed Up successfully!', key, duration: 2 });
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
            <Title level={2} style={{ textAlign: 'center' }}>Sign UP</Title>
           <div style={{display: 'flex'}}>
           <div>
            <Image src={regImg} alt="register"></Image>
           </div>
            <div>
            <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
         
         <TaskInput type="text" name="authName" label="Name" />
         <TaskInput type="email" name="email" label="Email" />
         <Controller
                        name="image"
                        render={({ field: { onChange, value, ...field } }) => (
                            <Form.Item label="Upload Image">
                                <Input
                                    type="file"
                                    {...field}
                                    onChange={(e) => onChange(e.target.files?.[0])}
                                />
                            </Form.Item>
                            
                        )}
                    />
                <TaskInput type="password" name="password" label="Password" />
         <Button type="primary" htmlType="submit" >Sign Up</Button>
  
       
   
         </TaskForm>
         <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
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
        </div>
    );
};

export default Register;