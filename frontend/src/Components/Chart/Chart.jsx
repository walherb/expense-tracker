import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { styled } from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import moment from 'moment';
import 'chartjs-adapter-moment';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, TimeScale);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc) => {
      const date = inc.date;
      return moment(date).format('DD/MM/YYYY');
    }),
    datasets: [
      {
        label: 'Income',
        data: [...incomes.map((income) => income.amount)],
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Expenses',
        data: [...expenses.map((income) => income.amount)],
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };
  // const labels = incomes.map((inc) => dateFormat(inc.date));
  // const labels = incomes.map((inc) => {
  //   const date = inc.date;
  //   return moment(date).format(data.options.scales.x.time.displayFormats.day);
  // });
  // labels: labels.sort((a, b) => moment(a).diff(moment(b))),
  {
    /* <Line
        data={data}
        options={{
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'DD/MM/YYYY',
                },
                parser: 'DD/MM/YYYY',
                tooltipFormat: 'YYYY-MM-DD',
              },
              adapters: {
                date: moment,
              },
            },
          },
        }}
      /> */
  }

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;
export default Chart;
