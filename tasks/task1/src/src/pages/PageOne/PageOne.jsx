import PageTwo from "../PageTwo/PageTwo";

const PageOne = ({ SetRandomColor, children }) => {
  return <button onClick={SetRandomColor}>Fetch Random Color</button>;
};

export default PageOne;
