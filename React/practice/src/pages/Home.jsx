import { Link } from "react-router-dom";
import styled from "styled-components";

function Home() {
  return (
    <Div>
      <Link to="/theme">theme page</Link>
      <br />
      <Link to="/addIcon">add icon page</Link>
      <br />
      <Link to="/addImage">add image page</Link>
    </Div>
  );
}

const Div = styled.div`
  color: blue;
  font-size: 20px;
`;
export default Home;
