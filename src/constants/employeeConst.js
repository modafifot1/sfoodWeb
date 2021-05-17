import { Feedback, Redeem, ShoppingCart, TwoWheeler } from '@material-ui/icons';

export const employeeDashboard = [
  {
    text: 'Product',
    icon: <Redeem />,
    link: '/employee/product-management',
  },
  {
    text: 'Order',
    icon: <ShoppingCart />,
    link: '/employee/order-management',
  },
  {
    text: 'Shipper',
    icon: <TwoWheeler />,
    link: '/employee/shipper-management',
  },
  {
    text: 'Feedback',
    icon: <Feedback />,
    link: '/employee/feedback-management',
  },
];
