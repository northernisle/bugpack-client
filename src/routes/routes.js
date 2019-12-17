import Login from './Login';
import Join from './Join';
import SignTemplate from './SignTemplate';

// all the routes are defined here as objects with 4 properties:

// path - the absolute path they should be rendered at (must start with a '/')
// exact - wether the path should be matched exactly by React Router
// component - the component that should be rendered
// children - any sub-components that will derive the path from the parent

// TEMPLATES
// if a route object doesn't define a path property, then it will act as a template
// the children components can be accessed from props.children
// currently doesn't support template nesting

const routes = [
  {
    component: SignTemplate,
    children: [
      {
        component: SignTemplate,
        children: [
          {
            path: '/login',
            component: Login,
            exact: true,
          },
          {
            path: '/join',
            component: Join,
            exact: true
          }
        ]
      }
    ]
  }
];

export default routes;