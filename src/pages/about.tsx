const AboutPage = () => {
  return (
    <>
      {/* Breadcrumb Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Trang chủ
              </a>
              <span className="breadcrumb-item active">Giới thiệu</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Contact Start */}
      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Giới thiệu về chúng tôi</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form bg-light p-30">
              <div id="success" />
              <p style={{ height: 180 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                necessitatibus illo, perferendis blanditiis, expedita natus,
                optio veritatis provident iste praesentium maiores adipisci
                sapiente corporis temporibus.
              </p>
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <img
              src="../../../src/assets/img/offer-2.jpg"
              style={{ width: "100%", height: 250 }}
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
};

export default AboutPage;
