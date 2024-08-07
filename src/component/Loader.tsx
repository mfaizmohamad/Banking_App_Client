import { RotatingSquare } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#facc15"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
