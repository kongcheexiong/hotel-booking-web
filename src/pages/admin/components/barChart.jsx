import { Bar } from "react-chartjs-2";
//import {Chart, CategoryScale} from 'chart.js'
//Chart.register(CategoryScale)
import 'chart.js/auto';
import { color } from "../../../constants";
import {format} from 'date-fns'

function CustomBarChart(props) {
    const today = new Date()
    const { data=[], title = ""} = props
    const labels = [
        format(new Date(today),"dd/MM/yyyy"),
        format(new Date(today.setDate(today.getDate()-1)),"dd/MM/yyyy"),
        format(new Date(today.setDate(today.getDate()-1)),"dd/MM/yyyy"),
        format(new Date(today.setDate(today.getDate()-1)),"dd/MM/yyyy"),
        format(new Date(today.setDate(today.getDate()-1)),"dd/MM/yyyy"),
        format(new Date(today.setDate(today.getDate()-1)),"dd/MM/yyyy"),
        format(new Date(today.setDate(today.getDate()-1)),"dd/MM/yyyy"),
    ]
 
      return (
    <div style={{
        backgroundColor: `${color.GRAY_COLLOR}`,
        borderRadius: '20px',
       // margin: '10px',
        Width: 'auto',
        padding: '10px'
    }}
    className='App'>
      <h3>{title}</h3>
      <div style={{ Width: "auto", padding: '10px' }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: labels,
            //["1st bar", "2nd bar", "3rd bar", "4th bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: data,
                //[10, 7, 5, 3, 8, 11, 15],
                // Color of each bar
                backgroundColor: ["#5588BB", "#66BBBB", "#AA6644", "#99BB55", "#EE9944", "#444466", "#BB5555"],
                // Border color of each bar
                //borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 1,
              },
            ],
          }}
          // Height of graph
          height={100}
          
        />
      </div>
    </div>
  );
}
  
export default CustomBarChart;