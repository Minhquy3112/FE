import { Link } from "react-router-dom";

const ListCartPage = () => {
  return (
    <>
      <main role="main" className="main-content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="row">
                {/* Striped rows */}
                <div className="col-md-12 my-4">
                  <h2 className="h4 mb-1">Cart</h2>
                  <p className="mb-4">
                    Customized table based on Bootstrap with additional elements
                    and more functions
                  </p>
                  <div className="card shadow">
                    <div className="card-body">
                      <div className="toolbar row mb-3">
                        <div className="col">
                          <form className="form-inline">
                            <div className="form-row">
                              <div className="form-group col-auto">
                                <label className="sr-only">Search</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue=""
                                  placeholder="Search"
                                />
                              </div>
                              <div className="form-group col-auto ml-3">
                                <label className="my-1 mr-2 sr-only">
                                  Status
                                </label>
                                <select className="custom-select my-1 mr-sm-2">
                                  <option>Choose...</option>
                                  <option value={1}>Processing</option>
                                  <option value={2}>Success</option>
                                  <option value={3}>Pending</option>
                                  <option value={3}>Hold</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* table */}
                      <table className="table table-bordered">
                        <thead>
                          <tr role="row">
                            <th>STT</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>User</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>4574</td>
                            <td>2019-09-11 10:22:04</td>
                            <td>Kitra Knapp</td>
                            <td>(132) 339-7423</td>
                            <td>P.O. Box 944, 4739 Suspendisse Road</td>
                            <td>$68.79</td>
                            <td>
                              <select id="inputState5" className="form-control">
                                <option>Status</option>
                                <option>Đang giao hàng</option>
                                <option>Đã xác nhận</option>
                                <option>Giao thành công</option>
                                <option>Hủy đơn hàng</option>
                              </select>
                            </td>
                            <td>
                              {/* <Link to="/admin/updatePro"><span className="badge badge-warning">Update</span></Link> */}
                              <button>
                                <span className="badge badge-danger">
                                  Delete
                                </span>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label" />
                              </div>
                            </td>
                            <td>2132</td>
                            <td>2019-08-23 12:28:40</td>
                            <td>Blake Orr</td>
                            <td>(257) 565-4706</td>
                            <td>P.O. Box 939, 9156 Sollicitudin St.</td>
                            <td>$84.24</td>
                            <td>
                              <span className="badge badge-warning">
                                Pending
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label" />
                              </div>
                            </td>
                            <td>2576</td>
                            <td>2020-07-14 17:18:27</td>
                            <td>Amber Rice</td>
                            <td>(791) 898-8806</td>
                            <td>P.O. Box 724, 3385 Vel Ave</td>
                            <td>$37.00</td>
                            <td>
                              <span className="badge badge-success">
                                Success
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label" />
                              </div>
                            </td>
                            <td>2397</td>
                            <td>2020-12-25 13:35:39</td>
                            <td>Fletcher Petty</td>
                            <td>(115) 625-5813</td>
                            <td>8907 Orci St.</td>
                            <td>$75.69</td>
                            <td>
                              <span className="badge badge-success">
                                Success
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label" />
                              </div>
                            </td>
                            <td>4028</td>
                            <td>2021-04-11 22:33:47</td>
                            <td>Kasimir Carr</td>
                            <td>(266) 991-0479</td>
                            <td>489-624 Quis St.</td>
                            <td>$86.89</td>
                            <td>
                              <span className="badge badge-danger">Hold</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label" />
                              </div>
                            </td>
                            <td>3782</td>
                            <td>2020-03-01 10:44:03</td>
                            <td>Daria Frank</td>
                            <td>(599) 361-7999</td>
                            <td>Ap #875-5778 Massa. Av.</td>
                            <td>$38.04</td>
                            <td>
                              <span className="badge badge-primary">
                                Processing
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label" />
                              </div>
                            </td>
                            <td>3881</td>
                            <td>2019-12-17 00:40:24</td>
                            <td>Herrod Byrd</td>
                            <td>(878) 901-7269</td>
                            <td>P.O. Box 107, 3720 Vitae, Ave</td>
                            <td>$73.38</td>
                            <td>
                              <span className="badge badge-primary">
                                Processing
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <nav
                        aria-label="Table Paging"
                        className="mb-0 text-muted"
                      >
                        <ul className="pagination justify-content-end mb-0">
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>{" "}
                {/* simple table */}
              </div>{" "}
              {/* end section */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ListCartPage;
