import { Button, Card, Col, Form, Image, Input, Row, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { setTokenIntoLocalStorage } from "../../utils/utils";
import { useAuthAccountMutation } from "../../redux/auth/authApi";
import useAuth from "../../hooks/useAuth";
import loginImg from "../../assets/login.jpg";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, setRole } = useAuth();
  const [register, { isLoading }] = useAuthAccountMutation();

  const onSubmit = async (values) => {
    const key = "Login";
    message.loading({ content: "Logging In...", key });

    try {
      const userInfo = { email: values.email, password: values.password };
      await signIn(userInfo.email, userInfo.password);

      const tokenData = await register({ userInfo, email: userInfo.email }).unwrap();
      await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);

      setRole(tokenData?.data?.tokenData?.role);
      navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
      message.success({ content: "Logged in successfully!", key, duration: 2 });
    } catch (err) {
      console.error(err);
      message.error({ content: "Something went wrong. Please try again.", key, duration: 2 });
    }
  };

  const handleGoogleSignUp = async () => {
    const key = "Google Sign-Up";
    message.loading({ content: "Signing in with Google...", key });

    try {
      const response = await signInWithGoogle();
      const { displayName, email, photoURL } = response.user;
      const userInfo = { authName: displayName, email, authImgUrl: photoURL };

      const tokenData = await register({ userInfo, email: userInfo.email }).unwrap();
      await setTokenIntoLocalStorage(tokenData?.data?.tokenData?.token);

      setRole(tokenData?.data?.tokenData?.role);
      navigate(`/${tokenData?.data?.tokenData?.role}/dashboard`);
      message.success({ content: "Signed in successfully!", key, duration: 2 });
    } catch (err) {
      console.error("Google Sign-Up Error:", err);
      message.error({ content: "Google Sign-In Failed. Try again!", key, duration: 2 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "20px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={18}>
        <Card
          
          style={{ 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
            borderRadius: "12px", 
            padding: "0px" ,
            
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            {/* Left Side - Image (Hidden on Small Screens) */}
            <Col xs={0} md={12}>
              <Image src={loginImg} alt="Login" preview={false} width="100%" style={{ borderRadius: "8px" }} />
            </Col>

            {/* Right Side - Login Form */}
            <Col xs={24} md={12}>
              <Title level={2} style={{ textAlign: "center" }}>Log In</Title>

              <Form layout="vertical" onFinish={onSubmit}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                >
                  <Input placeholder="Enter your email" size="large" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password placeholder="Enter your password" size="large" />
                </Form.Item>

                <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
                  Log in
                </Button>
              </Form>

              <Text style={{ display: "block", textAlign: "center", marginTop: "16px" }}>
                Don’t have an account?{" "}
                <Link to="/register" style={{ color: "#1890ff", fontWeight: "bold" }}>
                  Register
                </Link>
              </Text>

              <Button
                onClick={handleGoogleSignUp}
                size="large"
                block
                style={{
                  marginTop: "16px",
                  background: "#db4437",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                }}
                loading={isLoading}
              >
                Sign In with Google
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
