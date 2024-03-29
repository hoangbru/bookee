import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
import { useGetAllProductsQuery } from "../../api/product";
import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";

export default function Home() {
  const [feedback, setFeedback] = useState<any[]>([
    {
      id: 1,
      description: "Mô tả chi tiết cùng với đánh giá từ người đọc khác đã giúp tôi có cái nhìn tổng quan về nội dung của từng cuốn sách. Những ý kiến này rất hữu ích khi tôi đang tìm kiếm thông tin để quyết định mua. Điều này chứng tỏ trang web của bạn không chỉ chú trọng đến việc cung cấp sách mới mà còn đảm bảo rằng khách hàng có đủ thông tin để đưa ra quyết định đúng đắn.",
      date: "05 Tháng 05, 2023",
      datetime: "2020-03-16",
      author: {
        name: "Takemichi",
        imageUrl: "https://res.cloudinary.com/dxa8ks06k/image/upload/v1687326391/takemichi/behance-circle_gkise5.png"
      }
    },
    {
      id: 2,
      description: "Tôi đánh giá cao sự nhanh chóng và thân thiện của dịch vụ khách hàng. Mỗi khi có thắc mắc, tôi luôn nhận được sự hỗ trợ chuyên nghiệp từ đội ngũ của bạn. Quá trình thanh toán và xử lý đơn hàng cũng diễn ra suôn sẻ, giúp tôi tiết kiệm thời gian và trải nghiệm mua sắm sách trở nên thoải mái hơn.",
      date: "13 Tháng 11, 2023",
      datetime: "2020-03-16",
      author: {
        name: "Hamster",
        imageUrl: "https://i.pinimg.com/564x/4e/d2/40/4ed240138bd33f4fad1066de6c87d589.jpg"
      }
    },
    {
      id: 3,
      description: "Trang web bán sách của bạn thật sự ấn tượng với sự đa dạng và độ mới lạ của bộ sưu tập sách. Tôi rất hạnh phúc khi phát hiện ra những tác phẩm mới và không tưởng, điều này tạo nên một trải nghiệm mua sắm sách thú vị. Sự chọn lọc cẩn thận của các tựa sách mới càng làm tăng giá trị của trang web.",
      date: "16 Tháng 3, 2023",
      datetime: "2020-03-16",
      author: {
        name: "Mugi",
        imageUrl: "https://i.pinimg.com/564x/ea/b8/46/eab84665b30d20f407e2202bf5054faa.jpg"
      }
    }
  ]);

  useEffect(() => {
    setFeedback(feedback)
  }, [feedback]);

  const { data: productsApi } = useGetAllProductsQuery(`?item_per_page=4`);

  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="uppercase leading-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Mừng ngày nhà giáo chọn quà tri ân
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Nhân dịp ngày nhà giáo, để tri ân công lao của các nhà giáo, quý
                khách hàng sẽ được hưởng những ưu đãi đặc biệt, bao gồm giảm giá
                đặc biệt và quà tặng hấp dẫn. Chúng tôi hy vọng rằng những ưu
                đãi này sẽ là một cách nhỏ để thể hiện lòng biết ơn và động viên
                tinh thần cho những người làm nên tương lai.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="images/banner1.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="images/banner2.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="images/banner3.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="images/banner4.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="images/banner5.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="images/banner6.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="images/banner7.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/product"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Khám phá ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Sách mới
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productsApi?.data.map((product: IProduct) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    <FormattedNumber
                      value={product.price}
                      style="currency"
                      currency="VND"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ý kiến & đóng góp
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {feedback.map((post: any) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="group relative">
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
