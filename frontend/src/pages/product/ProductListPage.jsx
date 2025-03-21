import React, { useEffect, useState } from "react";
import { AdminPageTitle } from "../../components/admin-page-layout/AdminPageTitle";
import { AdminSearchField } from "../../components/admin-page-layout/AdminSearchField";
import { ContentAddButton } from "../../components/admin-page-layout/ContentAddButton";
import { TableRows } from "../../components/skeleton/TableSketelon";
import { StatusBadge } from "../../components/badge/BadgeComponent";
import { NavLink } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { PaginationComponent } from "../../components/pagination/Pagination";
import { toast } from "react-toastify";
import productSvc from "./product.service";

const ProductListPage = () => {
  const [search, setSearch] = useState();
  let [dataList, setDataList] = useState();
  let [loading, setLoading] = useState(false);

  let [pagination, setPagination] = useState({
    totalData: 0,
    limit: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const loadData = async (page = 1, limit = 10, search = null) => {
    try {
      const response = await productSvc.getProductList({
        page: page,
        limit: limit,
        search: search,
      });
      setDataList(response.data);
      setPagination({
        totalData: response.options.total,
        limit: response.options.limit,
        currentPage: response.options.page,
        totalPages: Math.ceil(response.options.total / response.options.limit),
      });
    } catch (exception) {
      console.log(exception);
      toast.error("Error fetching froduct list.");
    }
  };

  useEffect(() => {
    loadData({
      page: 1,
      limit: 10,
    });
  }, []);

  const deleteData = async (id) => {
    try {
      const response = await productSvc.deleteProduct(id);
      loadData({
        page:1,
        limit: 10
      })
      toast.success("Product deleted successfuly.");
    } catch (exception) {
      toast.error("Error deleting product.");
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <AdminPageTitle pageTitle={"Product List"} />
        <div className="mx-auto my-3 px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <AdminSearchField loading={loading} setSearch={setSearch} />
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <ContentAddButton
                  url={"/admin/products/create"}
                  btnText={"Add Product"}
                />
              </div>
            </div>

            <div className="overflow-x-auto mb-5">
              <table className=" md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-teal-200 uppercase bg-teal-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>

                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Slug
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Seller
                    </th>

                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <tbody>
                    <TableRows rows={5} cols={6} />
                  </tbody>
                ) : (
                  <>
                    {dataList && dataList.length ? (
                      <>
                        {dataList.map((row, index) => (
                          <tbody key={index}>
                            <tr className="border-b dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {row.title}
                              </th>
                              <td className="px-4 py-3">
                                {row?.category?.title}
                              </td>
                              <td className="px-4 py-3">
                                {row?.brand?.title}
                              </td>
                              <td className="px-4 py-3">
                                {"Npr. " + row?.actualAmount}
                              </td>
                              <td className="px-4 py-3">
                                <img
                                  src={row.images[0]}
                                  alt=""
                                  className="max-w-10"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <StatusBadge status={row.status} />
                              </td>
                              <td className="px-4 py-3">
                                <NavLink className={"text-teal-800 hover:underline hover:underline-offset-4"}
                                  to={"/products/" + row.slug}
                                  target="_product"
                                >
                                  {" "}
                                  {row.slug}{" "}
                                </NavLink>
                              </td>
                              <td className="px-4 py-3">
                                {row?.seller?.name}
                              </td>
                              <td className="px-4 py-3 flex items-center justify-end">
                                <NavLink
                                  to={`/admin/products/edit/${row._id}`}
                                  className="w-8 h-8 bg-teal-700 rounded-full me-2 flex items-center justify-center hover:bg-teal-900"
                                >
                                  <FaPen className="text-white" />
                                </NavLink>
                                <NavLink
                                  onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#085c66",
                                      cancelButtonColor: "#c81e1e",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        await deleteData(row._id);
                                      }
                                    });
                                  }}
                                  className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800"
                                >
                                  <FaTrash className="text-white" />
                                </NavLink>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </>
                    ) : (
                      <>
                        <tbody>
                          <tr className="border-b dark:border-gray-700">
                            <th
                              colSpan={6}
                              scope="row"
                              className=" text-center px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              No Data Found
                            </th>
                          </tr>
                        </tbody>
                      </>
                    )}
                  </>
                )}
              </table>
            </div>

            {loading ? (
              <></>
            ) : (
              <>
                <PaginationComponent
                  pagination={pagination}
                  loadData={loadData}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListPage;
