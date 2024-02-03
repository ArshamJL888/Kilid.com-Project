import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
function DeleteModal(props) {
  const { t } = useTranslation();
  const closeModal = () => {
    props.onHide(false);
  };
  const acceptDelete = () => {
    props.deleteRequest()
    props.onHide(false)
  }
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4>{t("Delete Request")}</h4>
          <p>{t("Are You Sure You Want To Delete This Section?")}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="success" onClick={acceptDelete}>{t('Accept')}</Button>
          <Button variant="danger" onClick={closeModal}>{t('Cancel')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
