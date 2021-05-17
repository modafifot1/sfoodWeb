import { Group, PeopleAlt, ShowChart, Beenhere, HowToReg } from '@material-ui/icons';

export const adminDashBoard = [
  {
    text: 'Employees',
    icon: <Group />,
    link: '/admin/employees-management',
  },
  {
    text: 'Users Permission',
    icon: <PeopleAlt />,
    link: '/admin/users-management',
  },
  {
    text: 'Roles Permission',
    icon: <HowToReg />,
    link: '/admin/roles-management',
  },
  {
    text: 'Revenues Statistical',
    icon: <ShowChart />,
    link: '/admin/statistical',
  },
  {
    text: 'Products',
    icon: <Beenhere />,
    link: '/admin/product-management',
  },
];
