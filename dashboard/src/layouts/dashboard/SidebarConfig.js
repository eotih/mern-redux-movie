import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('flat-color-icons:pie-chart')
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('flat-color-icons:manager')
  },
  {
    title: 'movie',
    path: '/dashboard/movie',
    icon: getIcon('twemoji:film-projector')
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: getIcon('flat-color-icons:todo-list')
  },
  {
    title: 'actor',
    path: '/dashboard/actor',
    icon: getIcon('twemoji:astronaut-medium-skin-tone')
  }
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
