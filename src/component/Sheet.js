import React, { useState, useEffect } from 'react';
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
} from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';

function Sheet(props) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (props.data && props.data[0]) {
      setData(props.data);
      
      // Generate columns dynamically based on data keys
      const columnKeys = Object.keys(props.data[0]);
      let columns =[]
       columnKeys.map((item) => (
        columns.push( { ...keyColumn(item, textColumn), title: item })


      ));
      
      setColumns(columns);
    }
  }, [props.data]);
  
  return (
    <DataSheetGrid    
      value={data}
      onChange={setData}
      columns={columns}
    />
  );
}

export default Sheet;
