import React from 'react';
import { CardArticleImageDescFooter } from '../../components/card/CardArticleImageDescFooter';
import { CardArticleSmall } from '../../components/card/CardArticleSmall';

const PostList = ({ thread }: { thread: Thread }) => {
  return (
    <>
      {thread.listViewType === 'default' && (
        <CardArticleSmall
          key={thread.title}
          thread={thread}
          author={thread.createdBy}
          category={thread.tags?.toString() || 'tech'}
          date={thread.createdAt}
          image={thread.images[0]?.url}
          title={thread.title}
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
          author={thread.createdBy}
          rating={'40' }
          sx={{ width: 300 }}
        />
      )} */}
    </>
  );
};

export default PostList;
