import { useReducer } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import { Modal } from "components";
import modalReducer from "../utils/reducers/modal-reducer";

function NormalLoginForm(props) {
  const { validateFields, getFieldDecorator } = props.form;
  const { user, password } = props;
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false,
    modalTitle: "",
    modalMessage: ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if (user !== values.username || password !== values.password) {
          dispatchModal({ type: "warning", values });
        } else {
          dispatchModal({ type: "success", values });
          setTimeout(() => {
            props.login();
          }, 1000);
        }
      }
    });
  }

  return (
    <Row type="flex" justify="center">
      <Col>
        <Modal modal={modal} dispatchModal={dispatchModal} />
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
