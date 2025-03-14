import { useCategory } from "../../Hooks/useCategory";
import Header from "../../Shared/Header/Header";
import DeleteConfirmation from "../../Shared/Model/Model";

export default function CategoriesList() {
  const {
    categoriesList,
    handleShow,
    handleClose,
    handleCloseAndDelete,
    showModal,
    selectedId,
  } = useCategory();

  return (
    <div className="h-100">
      <Header
        title="Categories"
        tag="Items"
        description="You can now add your items that any user can order it from the application and you can edit"
      />

      <div className="title d-flex justify-content-between my-3">
        <div className="caption">
          <h3>Categories Table Details</h3>
          <span>You can check details</span>
        </div>
        <button className="btn btn-success my-auto">Add new Category</button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td>
                <div className="dropdown">
                  <i
                    className="fa fa-ellipsis text-success m-2"
                    data-bs-offset="-20,0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" type="button">
                        <i className="fa fa-eye text-success m-2"></i>
                        View
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        <i className="fa fa-edit text-success m-2"></i>
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleShow(category.id)}
                        type="button"
                      >
                        <i className="fa fa-trash text-success m-2"></i>
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmation
        item="Category"
        show={showModal}
        handleClose={handleClose}
        handleCloseAndDelete={() => handleCloseAndDelete(selectedId)}
      />
    </div>
  );
}
