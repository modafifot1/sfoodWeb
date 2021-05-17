import { lazy } from 'react';

export const publicRoutes = [
  {
    key: 'login',
    path: '/auth/login',
    exact: true,
    component: lazy(() => import('../features/Auth/component/Login/Login')),
  },
  {
    key: 'login',
    path: '/auth/forgot-password',
    exact: true,
    component: lazy(() => import('../features/Auth/component/ForgotPassword/ForgotPassword')),
  },
  {
    key: 'error404',
    path: '/errors/error-404',
    exact: true,
    component: lazy(() => import('../common/components/Error/components/Error404/Error404')),
  },
  {
    key: 'error401',
    path: '/errors/error-401',
    exact: true,
    component: lazy(() => import('../common/components/Error/components/Error401/Error401')),
  },
  {
    key: 'error500',
    path: '/errors/error-500',
    exact: true,
    component: lazy(() => import('../common/components/Error/components/Error500/Error500')),
  },
];
export const adminRoutes = [
  {
    key: 'users-management',
    path: '/admin/users-management',
    exact: true,
    component: lazy(() => import('../features/Admin/components/UserManagement/UserManagement')),
  },

  {
    key: 'roles-management',
    path: '/admin/roles-management',
    exact: true,
    component: lazy(() => import('../features/Admin/components/RolesManagement/RolesManagement')),
  },

  {
    key: 'users-permission',
    path: '/admin/users-management/:userId/permissions',
    exact: true,
    component: lazy(() =>
      import('../features/Admin/components/UserManagement/components/UserPermission')
    ),
  },

  {
    key: 'roles-permission',
    path: '/admin/roles-permission/:roleId',
    exact: true,
    component: lazy(() =>
      import('../features/Admin/components/RolesManagement/components/RolesPermission')
    ),
  },
  {
    key: 'product-detail',
    path: '/admin/product-management/:id',
    exact: true,
    component: lazy(() => import('../common/components/ProductDetail/ProductDetail')),
  },
  {
    key: 'edit-product',
    path: '/admin/product-management/:id/edit',
    exact: true,
    component: lazy(() => import('../common/components/EditProduct/EditProduct')),
  },
  {
    key: 'productVerify',
    path: '/admin/product-management',
    exact: true,
    component: lazy(() => import('../features/Admin/components/ProductManagement/index')),
  },
  {
    key: 'employees-management',
    path: '/admin/employees-management',
    exact: true,
    component: lazy(() =>
      import('../features/Admin/components/EmployeeManagement/EmployeeManagement')
    ),
  },
  {
    key: 'statistical',
    path: '/admin/statistical',
    exact: true,
    component: lazy(() => import('../features/Admin/components/Statistical/Statistical')),
  },
  {
    key: 'profile',
    path: '/admin/profile',
    exact: true,
    component: lazy(() => import('../features/Profile/Profile/index')),
  },
  {
    key: 'change-password',
    path: '/admin/change-password',
    exact: true,
    component: lazy(() => import('../features/Profile/ChangePassword/index')),
  },
];
export const employeeRoutes = [
  {
    key: 'product-management',
    path: '/employee/product-management',
    exact: true,
    component: lazy(() =>
      import('../features/Employee/components/ProductManagement/ProductManagement')
    ),
  },

  {
    key: 'order-management',
    path: '/employee/order-management',
    exact: true,
    component: lazy(() =>
      import('../features/Employee/components/OrderManagement/OrderManagement')
    ),
  },
  {
    key: 'shipper-management',
    path: '/employee/shipper-management',
    exact: true,
    component: lazy(() =>
      import('../features/Employee/components/ShipperManagement/ShipperManagement')
    ),
  },
  {
    key: 'feedback-management',
    path: '/employee/reply-management/:id',
    exact: true,
    component: lazy(() =>
      import(
        '../features/Employee/components/FeedbackManagement/components/ReplyFeedback/ReplyFeedback'
      )
    ),
  },
  {
    key: 'profile',
    path: '/employee/profile',
    exact: true,
    component: lazy(() => import('../features/Profile/Profile/index')),
  },
  {
    key: 'change-password',
    path: '/employee/change-password',
    exact: true,
    component: lazy(() => import('../features/Profile/ChangePassword/index')),
  },
  {
    key: 'add-product',
    path: '/employee/product-management/add',
    exact: true,
    component: lazy(() => import('../common/components/EditProduct/EditProduct')),
  },
  {
    key: 'product-detail',
    path: '/employee/product-management/:id',
    exact: true,
    component: lazy(() => import('../common/components/ProductDetail/ProductDetail')),
  },
  {
    key: 'edit-product',
    path: '/employee/product-management/:id/edit',
    exact: true,
    component: lazy(() => import('../common/components/EditProduct/EditProduct')),
  },
];
