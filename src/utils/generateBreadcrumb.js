import head from 'lodash/head';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { combineRoutes } from 'app/config/routes';

const generateBreadcrumb = breadcrumb => (
  [{
    text: 'pageTitle_homePage',
    href: '/',
  }].concat(map(breadcrumb, (path) => {
    const { pageTitle } = head(filter(
      combineRoutes,
      route => route.path === path,
    ));
    return {
      text: pageTitle,
      href: path,
    };
  }))
);

export default generateBreadcrumb;
