import { React, useState } from "../common";

import Post from "./Post";

const NONE_SELECTED = 0;

function Posts({ contents = [], selectedCallback = (_isSelected) => {} } = {}) {
  const [selectedKey, setSelected] = useState(NONE_SELECTED);
  return contents.map((data, idx) => {
    const key = idx + 1;
    return (
      <Post
        key={key}
        myKey={key}
        selectedKey={selectedKey}
        selectThisToggle={() => {
          selectedCallback(selectedKey !== NONE_SELECTED);
          setSelected(selectedKey === key ? NONE_SELECTED : key);
        }}
        data={data}
      />
    );
  });
}

export default Posts;
