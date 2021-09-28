/** 代码node树 */
const mainNode = {
  name: "mainNode",
  rectAttr: {
    x: 25,
    y: 55,
    width: 300,
    height: 400,
  },
  children: [
    {
      name: "cNode1",
      rectAttr: {
        x: 40,
        y: 70,
        width: 100,
        height: 100,
      },
      children: null,
    },
  ],
};

/** sketchNode树 */
const sketchJsonList = [
  {
    rectAttr: {
      x: 25,
      y: 55,
      width: 300,
      height: 400,
    },
    children: [
      {
        rectAttr: {
          x: 40,
          y: 70,
          width: 100,
          height: 100,
        },
        children: null,
      },
    ],
  },
  {
    rectAttr: {
      x: 125,
      y: 155,
      width: 1300,
      height: 1400,
    },
    children: null,
  },
  {
    rectAttr: {
      x: 225,
      y: 255,
      width: 2300,
      height: 2400,
    },
    children: null,
  },
];

const flatList = [
  { name: "mainNode", rectAttr: {}, children: ["cNode1"] },
  { name: "cNode1", rectAttr: {}, children: null },
];

function breadthFirstSearch(sNode, node) {
  const { reactAttr: sNodeAttr } = sNode;
  console.log(
    "🚀 ~ file: findTree.js ~ line 72 ~ breadthFirstSearch ~ sNodeAttr",
    sNodeAttr
  );
  var nodes = [];
  if (node != null) {
    var queue = [];
    queue.unshift(node); // 在队列的开头插入
    while (queue.length != 0) {
      var item = queue.shift();
      const { reactAttr: codeNodeAttr } = item;
      console.log(
        "🚀 ~ file: findTree.js ~ line 83 ~ breadthFirstSearch ~ codeNodeAttr",
        codeNodeAttr
      );

      // 加判断条件
      if (codeNodeAttr.x === sNodeAttr.x && codeNodeAttr.y === sNodeAttr.y) {
        nodes.push(item);
      }

      var children = item.children;
      if (!children) {
        break;
      }
      for (var i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
  }
  return nodes;
}

function handleFindTree(sketchTree, codeTree) {
  const nodeDepMap = {};
  let counter = 0;
  sketchTree.forEach((sNode) => {
    const resArr = breadthFirstSearch(sNode, codeTree);
    nodeDepMap[counter] = resArr;
    counter++;
  });

  return nodeDepMap;
}

const res = handleFindTree(sketchJsonList, mainNode);
console.log("🚀 ~ file: findTree.js ~ line 107 ~ res", res);
