

import { Button, Form, Image, Input, message, Typography, Upload, Card, Row, Col, Space } from "antd";
import TaskForm from "../../components/dashboard/form/TaskForm";
import TaskInput from "../../components/dashboard/form/TaskInput";
import { useNavigate, Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useAuthAccountMutation } from "../../redux/auth/authApi";
import { useImageUploadMutation } from "../../redux/imageUpload/imageUploadApi";
import { setTokenIntoLocalStorage } from "../../utils/utils";
import { UploadOutlined, GoogleOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import regImg from "../../assets/reg.jpg";
import { useState } from "react";

const { Title, Text } = Typography;

const Register = () => {
  const [roleSignUp, setRoleSignUp] = useState('User');
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle, setRole } = useAuth();
  const [register, { isLoading }] = useAuthAccountMutation();
  const [imageUpload] = useImageUploadMutation();

  const handleRoleSignUp = (roleName) =>{
    setRoleSignUp(roleName);
}


  const defaultValues = {
    authName: "",
    authImgUrl: null,
    email: "",
    password: "",
  };

  const onSubmit = async (data) => {
    const key = "register";
    message.loading({ content: "Signing Up...", key });

    try {
      const formData = new FormData();
      formData.append("file", data.image);
      formData.append("upload_preset", "portfolio-blog");

      const response = await imageUpload(formData).unwrap();

      const userInfo = {
        authName: data.authName,
        authImgUrl: response?.secure_url,
        email: data.email,
        password: data.password,
        role: roleSignUp
      };

      await createUser(userInfo.email, userInfo.password);
      await updateUserProfile(userInfo.authName, userInfo.authImgUrl);

      const tokenData = await register({ userInfo, email: userInfo.email }).unwrap();
      await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);

      setRole(tokenData?.data?.tokenData?.role);
      navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
      message.success({ content: "Signed Up successfully!", key, duration: 2 });
    } catch (err) {
      console.log(err);
      message.error({ content: "Something went wrong. Please try again.", key, duration: 2 });
    }
  };

  const handleGoogleSignUp = async () => {
    const key = "register";
    try {
      const response = await signInWithGoogle();
      const { displayName, email, photoURL } = response.user;

      const userInfo = { authName: displayName, email, authImgUrl: photoURL };
      const tokenData = await register({ userInfo, email: userInfo.email }).unwrap();
      await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);

      setRole(tokenData?.data?.tokenData?.role);
      navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
      message.success({ content: "Signed successfully!", key, duration: 2 });
    } catch (err) {
      console.log("Google Sign-Up Error:", err);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "20px" }}>
      <Col xs={24} sm={20} md={16} lg={14} xl={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: 12, width:1000 }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "16px" }}>Sign Up</Title>
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Text style={{fontSize:20}}>Sign up as <Button style={{fontSize:20}} type={roleSignUp === 'Admin' ? "primary" : "default"} onClick={() => handleRoleSignUp('Admin')}>Admin</Button> or <Button style={{fontSize:20}} type={roleSignUp === 'User' ? "primary" : "default"} onClick={() => handleRoleSignUp('User')}>User</Button></Text>
          </Space>
          
          <Row gutter={[24, 24]} align="middle">
            {/* Left Side - Image */}
            <Col xs={24} md={12}>
              <Image src={regImg} alt="Register" preview={false} style={{ width: "100%", borderRadius: 8 }} />
            </Col>

            {/* Right Side - Form */}
            <Col xs={24} md={12}>
              <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <TaskInput type="text" name="authName" label="Name" />
                <TaskInput type="email" name="email" label="Email" />
                
                {/* Image Upload */}
                <Controller
                  name="image"
                  render={({ field: { onChange } }) => (
                    <Form.Item label="Upload Profile Image">
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          onChange(file);
                          return false;
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
                  )}
                />

                <TaskInput type="password" name="password" label="Password" />

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={isLoading}
                  style={{ marginTop: "16px" }}
                >
                  Sign Up
                </Button>
              </TaskForm>

              <Text style={{ display: "block", textAlign: "center", marginTop: "12px", color: "#595959" }}>
                Already have an account?{" "}
                <Link to="/" style={{ color: "#1890ff", fontWeight: "500" }}>
                  Login
                </Link>
              </Text>

              {/* Google Sign Up Button */}
              <Button
                type="default"
                block
                icon={<GoogleOutlined />}
                onClick={handleGoogleSignUp}
                style={{ marginTop: "16px", fontWeight: "500" }}
              >
                Sign Up with Google
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
