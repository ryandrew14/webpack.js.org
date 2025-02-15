// Import External Dependencies
import React from 'react';

// Import Local Components
import Shield from '../Shield/Shield';
import SidebarItem from '../SidebarItem/SidebarItem';
import Print from '../Print/Print';

// Load Styling
import './Sidebar.scss';

// Create and export the component
export default ({
  className = '',
  pages,
  currentPage
}) => {
  let group;
  // just skipping this on SSG run shifts the index in sidebar item see #3127
  const filteredPages = pages.filter(page => page.title !== 'printable.md');

  return (
    <nav className={`sidebar ${className}`}>
      <div className="sidebar__inner">
        <div className="sidebar__shields">
          <a href="https://github.com/webpack/webpack/releases">
            <Shield content="npm/v/webpack" label="webpack" />
          </a>
        </div>
        <Print url={currentPage} />

        {filteredPages.map((page, index) => {
          let displayGroup = group !== page.group && page.group !== '-';
          group = page.group;

          return (
            <React.Fragment key={`sidebar-item-${index}`}>
              {displayGroup ? <h4 className="sidebar__group">{group}</h4> : null}

              <SidebarItem
                index={index}
                url={page.url}
                title={page.title}
                anchors={page.anchors}
                currentPage={currentPage}
              />
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
