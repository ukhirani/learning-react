import "../../App.css";

const Container = ({ bgColor, children }) => {
  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      {" "}
      {children}{" "}
    </div>
  );
};

export default Container;
