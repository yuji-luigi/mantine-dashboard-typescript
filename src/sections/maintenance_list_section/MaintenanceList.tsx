import React from 'react';
import { CardArticleImageDescFooter } from '../../components/card/CardArticleImageDescFooter';
import { CardArticleSmall } from '../../components/card/CardArticleSmall';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../../path/page-paths';

const MaintenanceList = ({ maintenance }: { maintenance: MaintenanceModel }) => {
  return (
    <>
      {maintenance.listViewType === 'default' && (
        <CardArticleSmall
          key={maintenance.title}
          data={maintenance}
          author={maintenance.user}
          category={maintenance.tags?.toString() || 'tech'}
          date={maintenance.createdAt}
          image={maintenance.images[0]?.url}
          title={maintenance.title}
          hrefRoot={CARD_LINK_PATH.maintenances}
        />
      )}
      {/* {maintenance.listViewType === 'default' && (
        <CardArticleImageDescFooter
          key={maintenance.title}
          className={''}
          image={maintenance.images[0]?.url}
          link={maintenance._id}
          title={maintenance.title}
          description={maintenance.description}
          author={maintenance.user}
          rating={'40' }
          sx={{ width: 300 }}
        />
      )} */}
    </>
  );
};

export default MaintenanceList;
