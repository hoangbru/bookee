import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IOrder } from "../../interfaces/order";
import { toast } from "react-hot-toast";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useUpdateOrderMutation } from "../../api/order";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CellActionProps {
  order: IOrder;
}

const CellAction: FC<CellActionProps> = ({ order }) => {
  const [update] = useUpdateOrderMutation();

  const cancelOrder = (order: IOrder) => {
    const confirm = window.confirm("Bạn có chắc muốn huỷ đơn hàng này ?");
    if (confirm) {
      update({
        id: order.id,
        status: "-1",
      })
        .unwrap()
        .then((res: any) => {
          toast.success(res.message);
        })
        .catch((res: any) => {
          toast.error(res.message);
        });
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <HiEllipsisHorizontal size={25} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/order/${order.id}`}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Xem chi tiết
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => cancelOrder(order)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Huỷ đơn hàng
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CellAction;
