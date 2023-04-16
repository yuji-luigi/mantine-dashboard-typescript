import React from 'react';
import { CardArticleImageDescFooter } from '../../components/card/CardArticleImageDescFooter';
import { CardArticleSmall } from '../../components/card/CardArticleSmall';
import { CARD_LINK_PATH } from '../../path/page-paths';

const PostList = ({ thread }: { thread: ThreadModel }) => {
  return (
    <>
      {thread.listViewType === 'default' && (
        <CardArticleSmall
          key={thread.title}
          data={thread}
          author={thread.user}
          category={thread.tags?.toString() || 'tech'}
          date={thread.createdAt}
          image={thread.images[0]?.url}
          title={thread.title}
          hrefRoot={CARD_LINK_PATH.posts}
        />
      )}
      {/* {thread.listViewType === 'default' && (
        <CardArticleImageDescFooter
          key={thread.title}
          className={''}
          image={thread.images[0]?.url}
          link={thread._id}
          title={thread.title}
          description={thread.description}
          author={thread.user}
          rating={'40' }
          sx={{ width: 300 }}
        />
      )} */}
    </>
  );
};

export default PostList;
