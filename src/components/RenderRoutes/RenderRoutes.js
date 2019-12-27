import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// routes defined in routes.js are being rendered by this component
const RenderRoutes = ({ routes, startKeyIndex = 0, template: Template }) => (
  <>
    {
      routes.map((route, index) => {
        const pathDefined = !!route.path;
        const templateForChildren = pathDefined ? null : route.component;

        return (
          <Fragment key={startKeyIndex + index}>
            {
              pathDefined &&
              <>
                {
                  Template ?
                    <Route
                      path={route.path}
                      exact={route.exact}
                      render={props => (
                        <Template>
                          <route.component {...props} />
                        </Template>
                      )}
                    />
                    :
                    <Route
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                    />
                }
              </>
            }
            {!!route.children &&
              <RenderRoutes
                routes={route.children}
                startKeyIndex={routes.length}
                template={templateForChildren}
              />
            }
          </Fragment>
        )
      })
    }
  </>
);

export default RenderRoutes;