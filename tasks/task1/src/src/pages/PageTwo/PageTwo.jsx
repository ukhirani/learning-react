import CurrentColor from "../../components/CurrentColor";
import "./PageTwo.css";
const PageTwo = ({ color }) => {
  return <CurrentColor color={color} />; // im aware that this prop drilling can be avoided by using context
};

export default PageTwo;
