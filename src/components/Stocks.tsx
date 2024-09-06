import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, addProduct, removeProduct, updateProduct } from "../redux/stockSlice";
import { fetchProductsFromFirestore, addProductToFirestore, updateProductInFirestore, deleteProductFromFirestore } from "../services/productService";
import { TrashIcon, PencilIcon, CheckIcon, XCircleIcon } from "@heroicons/react/20/solid";

const Stocks = () => {
  const dispatch = useDispatch();
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<any>(null);
  const products = useSelector((state: any) => state.stock.products);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, quantity: 0, confirmed: false });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await fetchProductsFromFirestore();
      dispatch(setProducts(productsList));
    };
    fetchProducts();
  }, [dispatch]);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.quantity > 0) {
      const productToAdd = { ...newProduct, confirmed: false };
      const addedProduct = await addProductToFirestore(productToAdd);
      dispatch(addProduct(addedProduct));
      setNewProduct({ name: "", price: 0, quantity: 0, confirmed: false });
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductFromFirestore(id);
    dispatch(removeProduct(id));
  };

  const handleUpdateProduct = async (id: string, updatedProduct: any) => {
    await updateProductInFirestore(id, updatedProduct);
    dispatch(updateProduct({ id, ...updatedProduct }));
  };

  const handleEditClick = (product: any) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSaveClick = () => {
    handleUpdateProduct(editProductId!, editedProduct);
    setEditProductId(null);
  };

  const handleCancelClick = () => {
    setEditProductId(null);
    setEditedProduct(null);
  };

  const handleConfirmStock = (productId: string) => {
    const productToUpdate = products.find((product: any) => product.id === productId);
    handleUpdateProduct(productId, { ...productToUpdate, confirmed: true });
  };

  const handleRejectStock = (productId: string) => {
    const productToUpdate = products.find((product: any) => product.id === productId);
    handleUpdateProduct(productId, { ...productToUpdate, confirmed: false });
  };

  return (
    <div className="relative sm:rounded-lg">
      <section className="flex items-center h-32 bg-gray-50 dark:bg-gray-900 mx-16 mt-4 rounded-t-lg">
        <div className="w-full px-4 mx-auto lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <h5 className="mr-3 font-semibold dark:text-white">Stock Management System</h5>
                <p className="text-gray-500 dark:text-gray-400">Manage all your existing products or add a new one</p>
              </div>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={() => setAdding(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Add new product
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center bg-gray-50 dark:bg-gray-900 mx-16 rounded-b-lg">
        <table className=" table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-12 w-full mb-12">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Confirmed
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {adding && (
              <tr>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                    className="border p-2 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <button onClick={handleAddProduct} className="text-green-600 mr-4">
                    Save
                  </button>
                  <button onClick={() => setAdding(false)} className="text-red-600 ml-2">
                    Cancel
                  </button>
                </td>
              </tr>
            )}

            {products.map((product: any) => (
              <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-600 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700">
                {editProductId === product.id ? (
                  <>
                    <td className="px-4 py-4">
                      <input
                        type="text"
                        value={editedProduct.name}
                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                        className="border p-1 "
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                        className="border p-1 "
                      />
                    </td>
                    <td className=" py-4">
                      <input
                        type="number"
                        value={editedProduct.quantity}
                        onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })}
                        className="border p-1 "
                      />
                    </td>
                    <td className="px-2 py-4"></td>
                    <td className="px-6 py-4">
                      <button onClick={handleSaveClick} className="text-green-600 mr-4">
                        Save
                      </button>
                      <button onClick={handleCancelClick} className="text-red-600 ml-2">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4 ">
                      {product.confirmed ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmed</span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Not confirmed</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="relative group ml-4 " onClick={() => handleConfirmStock(product.id)}>
                        <CheckIcon className="h-5 w-5 text-green-600" />
                        <span className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                          Confirm Stock
                        </span>
                      </button>
                      <button className="relative group ml-4" onClick={() => handleRejectStock(product.id)}>
                        <XCircleIcon className="h-5 w-5 text-red-600" />
                        <span className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                          Reject Stock
                        </span>
                      </button>
                      <button className="relative group ml-4" onClick={() => handleEditClick(product)}>
                        <PencilIcon className="h-5 w-5 text-blue-800 ml-8" />
                        <span className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">Update</span>
                      </button>
                      <button className="relative group" onClick={() => handleDeleteProduct(product.id)}>
                        <TrashIcon className="h-5 w-5 text-red-500 ml-4 " />
                        <span className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">Delete</span>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
