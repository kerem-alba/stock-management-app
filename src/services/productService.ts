import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/app";
import { Product } from "../models/Product";

export const fetchProductsFromFirestore = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const productsList: Product[] = productsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );
  return productsList;
};

export const addProductToFirestore = async (product: any) => {
  const docRef = await addDoc(collection(db, "products"), product);
  return { id: docRef.id, ...product };
};

export const updateProductInFirestore = async (id: string, updatedProduct: any) => {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, updatedProduct);
};

export const deleteProductFromFirestore = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
};
