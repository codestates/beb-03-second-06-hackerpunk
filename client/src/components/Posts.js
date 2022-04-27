import { React, useState } from "../common";

import Post from "./Post";

function Posts({ contents = [] } = {}) {
  const [selectedKey, setSelected] = useState(-1);
  return contents.map((data, idx) => {
    return (
      <Post
        key={idx}
        myKey={idx}
        selectedKey={selectedKey}
        selectThisToggle={() => setSelected(selectedKey === idx ? -1 : idx)}
        data={data}
      />
    );
  });
}

export default Posts;
