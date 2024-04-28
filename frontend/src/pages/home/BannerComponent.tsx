import { Row, Col } from "react-bootstrap";

const BannerComponent = () => {
  return (
    <div className="bannerSection">
      <Row className="row d-flex align-items-center">
        <Col xs={12} lg={6} md={6} sm={6} className="content">
          <h1>Welcome to Book Bus!</h1>
          <p>Book your tickets online!</p>
        </Col>
        <Col xs={12} lg={6} md={6} sm={6}>
          <img
            src={`${process.env.PUBLIC_URL + "/images/generic_banner_Ind.png"}`}
            alt="images"
          />
        </Col>
      </Row>
    </div>
  );
};

export default BannerComponent;
