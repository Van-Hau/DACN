import { MainLayout } from '@/components/common';
import Statistic3 from '@/components/common/dia/statistic3';
export interface IStatisticProps {}

function Statistic(props: IStatisticProps) {
    return <Statistic3 />;
}
Statistic.Layout = MainLayout;
export default Statistic;
