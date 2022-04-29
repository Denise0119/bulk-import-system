import logo from './logo.svg';
import './App.css';
import { forwardRef } from 'react';
import React, { useState } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import Button from "@material-ui/core/Button";
import CSVReader from "react-csv-reader";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import List from '@material/react-dialog';

interface TableIcons {
  Add: any;
  Check: any;
  Clear: any;
  Delete: any;
  DetailPanel: any;
  Edit: any;
  Export: any;
  Filter: any;
  FirstPage: any;
  LastPage: any;
  NextPage: any;
  PreviousPage: any;
  ResetSearch: any;
  Search: any;
  SortArrow: any;
  ThirdStateCheck: any;
  ViewColumn: any;
}

interface EditCell {
  cellStyle: any;
  initialEditValue: any;
  onCellEditApproved: any;
}


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  tbdata: any;
  onClose: (value: string) => void;
}

interface MyObj {
  selectedCheckboxes: Array<number>;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, tbdata } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const checkboxes = [
    { id: 1, text: "campaign" },
    { id: 2, text: "ad_group" },
    { id: 3, text: "ad" }
  ];
  const [checkState, setCheckState] = useState<MyObj>({
    selectedCheckboxes: []
  });
  const onChange = (id: number) => {
    const selectedCheckboxes = checkState.selectedCheckboxes;
    // Find index
    const findIdx = selectedCheckboxes.indexOf(id);

    // // Index > -1 means that the item exists and that the checkbox is checked
    // // and in that case we want to remove it from the array and uncheck it
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }
    setCheckState({
      selectedCheckboxes: selectedCheckboxes
    });
  };

  const exportJson = async (jsondata: any, checklist: any) => {
    const adsArray = ['campId', 'adGroupId', 'adId'];
    // get the useful ids of entites
    const checkArry = [];
    var restArry: any[];
    restArry = [];
    for (var idx in adsArray) {
      if (checklist.includes(Number(idx) + 1)) {
        console.log("Included!")
      } else {
        restArry.push(adsArray[idx])
      }
    }
    //filter json data by checklist
    for (var i = 0; i < jsondata.length; i++) {
      for (var j = 0; j < restArry.length; j++) {
        delete jsondata[i][restArry[j]];
      }
    }
    // download json file with given table data
    const dataStr =
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(jsondata));
    const download = document.createElement('a');
    download.setAttribute('href', dataStr);
    download.setAttribute('download', 'CardData' + '.json');
    document.body.appendChild(download);
    download.click();
    download.remove();
    onClose(dataStr);
  }
  // close option dialog
  const cancelAction = (e: any) => {
    onClose(e);
  }
  const selectedCheckboxes = checkState.selectedCheckboxes;
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Export as JSON by Options</DialogTitle>
      <DialogContent>
        {checkboxes.map(checkbox => (
          <label key={checkbox.id}>
            {checkbox.text}
            <input
              type="checkbox"
              onChange={() => onChange(checkbox.id)}
              data-selected={selectedCheckboxes.includes(checkbox.id)}
            />
          </label>
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={cancelAction} variant="contained">
          Cancel
        </Button>
        <Button color="secondary" onClick={(e) => exportJson(tbdata, checkState.selectedCheckboxes)} variant="contained">
          Confirm
        </Button>
      </DialogActions>
      <List>

      </List>
    </Dialog>
  );
}

const editCell: EditCell = {
  cellStyle: { minWidth: 150 }, initialEditValue: "initial edit value",
  onCellEditApproved: (newValue: any, oldValue: any, rowData: any, columnDef: any) => {
    return new Promise((resolve: any, reject: any) => {
      console.log('newValue: ' + newValue);
      setTimeout(resolve, 4000);
    });
  }
}

const tableIcons: TableIcons = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref: any) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props: any, ref: any) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props: any, ref: any) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props: any, ref: any) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props: any, ref: any) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props: any, ref: any) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props: any, ref: any) => <ViewColumn {...props} ref={ref} />)
};

const buttonRef = React.createRef();

function App() {
  //set initial columns
  const [columns, setColumns] = useState<any>([
    { title: 'Campaign ID', field: 'campId', type: 'numeric' },
    { title: 'Campaign Title', field: 'campTitle', initialEditValue: 'initial edit value' },
    { title: 'Campaign Objective', field: 'campObj', initialEditValue: 'initial edit value' },
    { title: 'Ad Group ID', field: 'adGroupId', type: 'numeric' },
    { title: 'Ad Group Campaign ID ', field: 'adGroupCampId', type: 'numeric' },
    { title: 'Ad Group Title', field: 'adGroupTitle', initialEditValue: 'initial edit value' },
    { title: 'Geo Locations', field: 'geoLocation', initialEditValue: 'initial edit value' },
    { title: 'Start Date', field: 'startDate', initialEditValue: 'initial edit value' },
    { title: 'End Date', field: 'endDate', type: 'numeric' },
    { title: 'Ad ID', field: 'adId', type: 'numeric' },
    { title: 'Ad Title', field: 'adTitle', initialEditValue: 'initial edit value' },
    { title: 'Ad Ad Group ID', field: 'adAdGroupId', initialEditValue: 'initial edit value' },
    { title: 'Post ID', field: 'postId', type: 'numeric' },
    { title: 'Results', field: 'results', initialEditValue: 'initial edit value' },
  ]);

  //setting initial data to show in datatable
  const [data, setData] = useState([
    { campId: '1', campTitle: 'Test Campaign1', campObj: 'CLICKS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 1", geoLocation: "US, CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 1", adAdGroupId: "1", postId: "t2_1" },
    { campId: '1', campTitle: 'Test Campaign2', campObj: 'IMPRESSIONS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 2", geoLocation: "GB, AU, US-CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 2", adAdGroupId: "1", postId: "t2_2" },
    { campId: '1', campTitle: 'Test Campaign1', campObj: 'CLICKS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 1", geoLocation: "US, CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 1", adAdGroupId: "1", postId: "t2_1" },
    { campId: '1', campTitle: 'Test Campaign2', campObj: 'IMPRESSIONS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 2", geoLocation: "GB, AU, US-CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 2", adAdGroupId: "1", postId: "t2_2" },
    { campId: '1', campTitle: 'Test Campaign1', campObj: 'CLICKS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 1", geoLocation: "US, CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 1", adAdGroupId: "1", postId: "t2_1" },
    { campId: '1', campTitle: 'Test Campaign2', campObj: 'IMPRESSIONS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 2", geoLocation: "GB, AU, US-CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 2", adAdGroupId: "1", postId: "t2_2" },
    { campId: '1', campTitle: 'Test Campaign1', campObj: 'CLICKS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 1", geoLocation: "US, CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 1", adAdGroupId: "1", postId: "t2_1" },
    { campId: '1', campTitle: 'Test Campaign2', campObj: 'IMPRESSIONS', adGroupId: "1", adGroupCampId: "1", adGroupTitle: "Ad group 2", geoLocation: "GB, AU, US-CA", startDate: "1/1/2020", endDate: "1/10/2020", adId: "1", adTitle: "Ad 2", adAdGroupId: "1", postId: "t2_2" },
  ]);

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const [state, setState] = useState({ theInputKey: '' })
  const [open, setOpen] = useState(false);
  const handleOnFileLoad = (results: any) => {
    const rowsArray: any = [];
    const valuesArray: any = [];

    // Iterating data to get column name and their values
    results.map((d: any) => {
      d['Results'] = "success"
      valuesArray.push(Object.values(d));
    });
    rowsArray.push(valuesArray[0])
    rowsArray.push("Results");
    valuesArray.shift();

    // Parsed Data Response in array format
    setParsedData(results.data);

    // Filtered Column Names
    if (rowsArray.length != 0) {
      setTableRows(rowsArray[0]);
    }

    const tbDataArry: any = []
    // Insert values corresponding to field names of table based on CSV file
    for (let i in valuesArray) {
      const rowinfo = {
        campId: valuesArray[i][0] || i,
        campTitle: valuesArray[i][1],
        campObj: valuesArray[i][2],
        adGroupId: valuesArray[i][3] || i,
        adGroupCampId: valuesArray[i][4] || i,
        adGroupTitle: valuesArray[i][5],
        geoLocation: valuesArray[i][6],
        startDate: valuesArray[i][7],
        endDate: valuesArray[i][8],
        adId: valuesArray[i][9] || i,
        adTitle: valuesArray[i][10],
        adAdGroupId: valuesArray[i][11] || i,
        postId: valuesArray[i][12],
        results: valuesArray[i][13]
      }
      tbDataArry.push(rowinfo)
    }
    // Filtered Values
    setValues(tbDataArry);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="upload-csv">
        <CSVReader
          cssClass="csv-reader-input"
          label="Bulk Import System For Reddit Ads"
          onFileLoaded={handleOnFileLoad}
          // onError={handleDarkSideForce}
          // parserOptions={papaparseOptions}
          accept=".csv"
          inputId="ObiWan"
          inputName="ObiWan"
          inputStyle={{ color: 'red' }}
        />
      </div>
      <br />
      <br />
      <Button onClick={handleClickOpen} variant="contained" color="primary">
        Export as JSON
      </Button>
      <SimpleDialog
        selectedValue="dd"
        open={open}
        onClose={handleClose}
        tbdata={values}
      />
      <MaterialTable
        icons={tableIcons}
        title="Cell Editable Preview"
        columns={columns}
        data={values || data}
        localization={{
          toolbar: {
            exportPDFName: "Export as PDF"
          }
        }}
        // other props
        options={{
          exportButton: true,
          exportFileName: "results",
        }} />
    </div>
  )
}

export default App;
