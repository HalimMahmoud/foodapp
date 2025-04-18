/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryDataSehemaValidation } from "../../services/vaildators";
import { useState } from "react";
import { categories_endpoints } from "../../services/api/apiConfig";
import { privateApiInstance } from "../../services/api/apiInstance";
import { toast } from "react-toastify";

export default function CategoryData({
  selectedId,
  categoryName,
  getAllCategories,
}) {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: { name: categoryName },
    resolver: yupResolver(categoryDataSehemaValidation),
  });

  const onAddEdit = async (data) => {
    handleClose();

    try {
      if (selectedId && categoryName) {
        await privateApiInstance.put(
          categories_endpoints.UPDATE_CATEGORY(selectedId),
          data
        );
        toast.success("Category is edited successfully");
      } else {
        await privateApiInstance.post(categories_endpoints.ADD_CATEGORY, data);
        toast.success("Category is added successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

    getAllCategories();
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    reset();
  };

  return (
    <>
      {selectedId ? (
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleShow(selectedId)}
        >
          <i className="fa fa-edit text-success m-2"></i>
          Edit
        </button>
      ) : (
        <button
          className="btn btn-success my-auto"
          onClick={() => handleShow(null)}
        >
          Add new Category
        </button>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <i
          className="fa-regular fa-circle-xmark close-icon text-danger"
          onClick={handleClose}
        ></i>

        <form className="" role="form" onSubmit={handleSubmit(onAddEdit)}>
          <Modal.Body className="W">
            {/* <img className="w-50 my-5" src={ModalImg} /> */}
            <h5>{selectedId ? "Edit Category" : "Add new category"}</h5>

            <div className="input-group mb-3">
              <input
                {...register("name")}
                type="text"
                className="form-control"
                placeholder="Category Name"
              />
            </div>
            {errors.name && (
              <div className="pb-3 text-danger">{errors.name.message}</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              {isSubmitting ? <i className="fa fa-spinner"></i> : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
