import { Modal } from "antd";

export default function CustomModal(props) {
  function handleOk() {
    props.setModalVisible(false);
  }

  function handleCancel() {
    props.setModalVisible(false);
  }

  return (
    <Modal
      title={props.modalTitle}
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{props.modalMessage}</p>
    </Modal>
  );
}
