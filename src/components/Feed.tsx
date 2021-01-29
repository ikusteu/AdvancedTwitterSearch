// import from node modules
import React from 'react';

// local types and interfaces
export enum View {
  POSTED_BY = 'postedBy',
  LIKED_BY = 'likedBy',
}

export interface OnViewChange {
  (view: View): void;
}

interface FeedProps {
  username?: string;
  view?: View;
  onViewChange: OnViewChange;
}

// component function
const Feed: React.FC<FeedProps> = ({
  username,
  view,
  onViewChange,
  children,
}) => {
  return (
    <section id='feed'>
      <nav id='feed-nav'>
        <button
          onClick={() => onViewChange(View.POSTED_BY)}
          disabled={!username}
        >
          Posted by User
        </button>
        <button
          onClick={() => onViewChange(View.POSTED_BY)}
          disabled={!username}
        >
          Liked by User
        </button>
      </nav>

      <div id={'feed-main'}>
        <h1>
          {!username
            ? ''
            : view === 'postedBy'
            ? 'Tweets posted by: '
            : 'Tweets liked by: '}
          {username}
        </h1>
        <div id='posts container'>{children}</div>
      </div>
    </section>
  );
};

export default Feed;
