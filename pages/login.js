import { useEffect, useState, useReducer } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import { Modal } from "components";

function NormalLoginForm(props) {
  const { validateFields, getFieldDecorator } = props.form;
  const { user, password } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        console.log("Received values of form: ", user, password);
        if (user !== values.username || password !== values.password) {
          setModalTitle("Warning");
          setModalMessage("Username atau Password yang Anda masukkan salah!");
        } else {
          setModalTitle("Success");
          setModalMessage("Anda Berhasil Login!");
          setTimeout(() => {
            props.login();
          }, 1000);
        }
        setModalVisible(true);
      }
    });
  }

  return (
    <Row type="flex" justify="center">
      <Col>
        <Modal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          modalTitle={modalTitle}
          modalMessage={modalMessage}
        />
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
