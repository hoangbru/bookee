import React from "react";
import { IProduct } from "../../../interfaces/product";

import { useAppDispatch } from "../../../store/hook";
import { add } from "../../../slices/Cart";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiOutlineEye, HiOutlineShoppingCart } from "react-icons/hi";
import * as CurrencyFormat from "react-currency-format";
import PreviewProduct from "./PreviewProduct";

type ProductItemProps = {
  product: IProduct;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="group relative">
        <Link to={`/product/${product.id}`} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.image}
            alt="image of product"
            className="h-[200px] sm:h-[220px] md:h-[220px] lg:h-[400px] w-full object-cover object-center lg:w-full"
          />
        </Link>

        <button
          type="button"
          data-toggle="modal"
          data-target={`#qr-modal-${product.id}`}
          className="absolute bottom-14 left-4 drop-shadow-md flex justify-center items-center"
        >
          <HiOutlineEye
            size={32}
            className="opacity-0 text-gray-100 transition ease-linear group-hover:opacity-100 bg-indigo-500 rounded-full p-2"
          />
        </button>
        <button
          className="absolute bottom-4 left-4 drop-shadow-md flex justify-center items-center"
          onClick={() => {
            dispatch(add({ ...product, quantity: 1 }));
            toast.success("Thêm vào giỏ hàng thành công");
          }}
        >
          <HiOutlineShoppingCart
            size={32}
            className="opacity-0 text-gray-100 transition ease-linear group-hover:opacity-100 bg-indigo-500 rounded-full p-2"
          />
        </button>
      </div>
      <div className="group relative">
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0 capitalize" />
                {product.title}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">
            <CurrencyFormat
              value={product?.price}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VND"}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
