const Carousel = () => {
  return (
    <>
      {/* Carousel Start */}
      <div className="container-fluid mb-3">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div
              id="header-carousel"
              className="carousel slide carousel-fade mb-30 mb-lg-0"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#header-carousel"
                  data-slide-to={0}
                  className="active"
                />
                <li data-target="#header-carousel" data-slide-to={1} />
                <li data-target="#header-carousel" data-slide-to={2} />
              </ol>
              <div className="carousel-inner">
                <div
                  className="carousel-item position-relative active"
                  style={{ height: 430 }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src="../../../src/assets/img/carousel-1.jpg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 700 }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Anime Dragon Ball Shop
                      </h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                        Như những viên gạch nhỏ xây dựng một tòa nhà lớn, mỗi mô
                        hình sưu tầm là một bước nhỏ để hiểu sâu hơn về thế giới
                        xung quanh chúng ta.
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                        href="#"
                      >
                        Sản phẩm
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel-item position-relative"
                  style={{ height: 430 }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src="../../../src/assets/img/carousel-2.jpg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 700 }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Anime Dragon Ball Shop
                      </h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                        Trong thế giới rộng lớn của kiến thức, sưu tầm mô hình
                        là cách chúng ta tìm ra những mảnh ghép để hình thành
                        một cái nhìn toàn diện.
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                        href="#"
                      >
                        Sản phẩm
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel-item position-relative"
                  style={{ height: 430 }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src="../../../src/assets/img/carousel-3.jpg"
                    style={{
                      width: "1000px",
                      height: "430px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 700 }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Anime Dragon Ball Shop
                      </h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                        Mỗi mô hình là một câu chuyện, và sưu tầm chúng là hành
                        trình khám phá những chương mới của tri thức.
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                        href="#"
                      >
                        Sản phẩm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="product-offer mb-30" style={{ height: 200 }}>
              <img
                className="img-fluid"
                src="../../../src/assets/img/offer-1.jpg"
                alt=""
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Tiết kiệm 20%</h6>
                <h3 className="text-white mb-3">Khi đăng ký tài khoản</h3>
                <a href="" className="btn btn-primary">
                  Mua ngay
                </a>
              </div>
            </div>
            <div className="product-offer mb-30" style={{ height: 200 }}>
              <img
                className="img-fluid"
                src="../../../src/assets/img/offer-2.jpg"
                alt=""
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Giảm giá 20%</h6>
                <h3 className="text-white mb-3">Nhiều ưu đãi đặc biệt</h3>
                <a href="" className="btn btn-primary">
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End */}
    </>
  );
};

export default Carousel;
