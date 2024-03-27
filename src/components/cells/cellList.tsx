import { Fragment } from "react/jsx-runtime";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "./addCell";
import CellListItem from "./cellListItem";
import "../styles/cellList.css";

const CellList: React.FC = () =>{
  const cells = useTypedSelector(({cells: { order, data }}) =>{
    return order.map((id) =>{
      return data[id]
    });
  });

  const renderedCells = cells.map((cell) =>(
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell}/>
      <AddCell previousCellID={cell.id}/>
    </Fragment>
  ));

  return(
    <div className="cell-list">
      <AddCell previousCellID={null}/>
      {renderedCells}
    </div>
  )
}

export default CellList;