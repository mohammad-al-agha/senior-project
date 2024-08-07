import "./NotFound.css";
import NotFound from "../../../assets/images/NotFound.svg";

const NotFoundPage = () => {
  return (
    <div className="not-found-wrapper">
      <img height={400} width={400} src={NotFound} alt="" />
      <h1>404</h1>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
