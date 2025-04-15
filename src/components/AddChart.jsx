import { Line } from 'react-chartjs-2';
import { useFetcher } from 'react-router-dom';
import { Chart as ChartJS} from 'chart.js';

const AddChart = ({transactions}) => {
    
    const fetcher = useFetcher();
    return (
        <div>
            <h2 className="m-30">Transaction History</h2>
            <div className="flex justify-center">
                <div className="w-full">
                    <Line
                        data = {{
                            // should map transaction months
                            labels: ["A", "B", "C", "D"],
                            datasets: [
                                {
                                    label: "Amount Spent",
                                    // should map transaction amounts per month
                                    data: [12, 19, 3, 5],
                                    backgroundColor: "#4EB179",
                                    borderColor: "#4EB179",
                                    borderWidth: 5,
                                },
                            ],
                            options: {
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                                
                            },
                        }}
                    />
                </div>
            </div>
            
            
            
        </div>
    );
}



export default AddChart;