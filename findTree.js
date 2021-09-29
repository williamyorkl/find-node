/** 代码node树 */
const mainNode = [
  {
    name: "mainNode",
    rectAttr: {
      x: 0,
      y: 0,
      width: 375,
      height: 812,
    },
    children: [
      // code: 第一个父节点
      {
        name: "cNode1",
        rectAttr: {
          x: 25,
          y: 55,
          width: 300,
          height: 400,
        },
        children: [
          {
            name: "ccNode1",
            rectAttr: {
              x: 40,
              y: 70,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "cccNode1",
                rectAttr: {
                  x: 50,
                  y: 80,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
      // code: 第二个父节点
      {
        name: "cNode2",
        rectAttr: {
          x: 125,
          y: 155,
          width: 1300,
          height: 1400,
        },
        children: [
          {
            name: "ccNode2",
            rectAttr: {
              x: 56,
              y: 72,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "cccNode2",
                rectAttr: {
                  x: 54,
                  y: 83,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
];

/** sketchNode树 */
const sketchJsonList = [
  {
    name: "sMainNode",
    rectAttr: {
      x: 0,
      y: 0,
      width: 375,
      height: 812,
    },
    children: [
      // 第一个父节点
      {
        name: "sFNode1",
        rectAttr: {
          x: 25,
          y: 55,
          width: 300,
          height: 400,
        },
        children: [
          {
            name: "sCCNode1",
            rectAttr: {
              x: 40,
              y: 70,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "cccNode1",
                rectAttr: {
                  x: 50,
                  y: 80,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
      // 第二个父节点
      {
        name: "sFNode2",
        rectAttr: {
          x: 125,
          y: 155,
          width: 1300,
          height: 1400,
        },
        children: [
          {
            name: "scNode2",
            rectAttr: {
              x: 56,
              y: 72,
              width: 100,
              height: 100,
            },
            children: [
              {
                name: "sccNode2",
                rectAttr: {
                  x: 54,
                  y: 83,
                  width: 100,
                  height: 100,
                },
                children: null,
              },
            ],
          },
        ],
      },
      // 第三个父节点
      {
        name: "sFNode3",
        rectAttr: {
          x: 225,
          y: 255,
          width: 2300,
          height: 2400,
        },
        children: null,
      },
    ],
  },
];

// const flatList = [
//   { name: "mainNode", rectAttr: {}, children: ["cNode1"] },
//   { name: "cNode1", rectAttr: {}, children: null },
// ];

/**
 *
 * @param {object} sNode sketch图的节点对象
 * @param {object} node 整颗树的节点对象
 * @returns {array} [code父节点1，code父节点2, ... ]
 */
function breadthFirstSearch(sNode, node) {
  const { rectAttr: sNodeAttr } = sNode;

  var nodes = [];
  if (node != null) {
    var queue = [];
    queue.unshift(node); // 在队列的开头插入
    while (queue.length != 0) {
      var item = queue.shift();
      const { rectAttr: codeNodeAttr } = item;

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

/**
 *  返回一个符合条件的节点数组 [node1,node2]
 * @param {Array} sketchTree
 * @param {Array} codeTree
 */
function handleFindTree(sketchTree, codeTree) {
  const matchFatherNodeList = [];
  // 遍历sketchTree的父节点
  sketchTree[0].children.forEach((sNode) => {
    const resArr = breadthFirstSearch(sNode, codeTree);

    matchFatherNodeList.push(...resArr);
  });

  return matchFatherNodeList;
}

/** 一、获取到对应sketch树的code的父节点 */
const codeFatherNodeList = handleFindTree(sketchJsonList, mainNode[0]);
console.log("🚀 符合条件的code父节点：", codeFatherNodeList);

/** 二、遍历第一个sketch节点的children，是否在matchedCode父节点中 */

function handleFindChildNode() {
  const matchChildNode = [];
  sketchJsonList[0].children.forEach((sCNode, sCIndex) => {
    // 每个sketch的父1节点进入
    if (sCNode.children) {
      sCNode.children.forEach((scNode3) => {
        // 遍历每个父节点的子节点，传入广度遍历中；限制搜索范围是：第一颗code父亲的树
        const res = breadthFirstSearch(scNode3, codeFatherNodeList[sCIndex]);
        matchChildNode.push(...res);

        // 如果scNode3还有子节点
        if (scNode3.children) {
          scNode3.children.forEach((scNode4) => {
            const res = breadthFirstSearch(
              scNode4,
              codeFatherNodeList[sCIndex]
            );
            matchChildNode.push(...res);
          });
        }
      });
    }
  });

  return matchChildNode;
}

const res2 = handleFindChildNode();
console.log("🚀 符合条件的子节点:", res2);

/** 三、改造"第二步"成为递归函数 */

// function handleRecursiveFindChildren() {
//   const matchChildNode = [];
//   sketchJsonList[0].children.forEach((sCNode, sCIndex) => {
//     // 每个sketch的父1节点进入
//     if (sCNode.children) {
//       sCNode.children.forEach((scNode3) => {
//         // 遍历每个父节点的子节点，传入广度遍历中；限制搜索范围是：第一颗code父亲的树
//         const res = breadthFirstSearch(scNode3, codeFatherNodeList[sCIndex]);
//         matchChildNode.push(...res);

//         // 如果scNode3还有子节点
//         if (scNode3.children) {
//           scNode3.children.forEach((scNode4) => {
//             const res = breadthFirstSearch(
//               scNode4,
//               codeFatherNodeList[sCIndex]
//             );
//             matchChildNode.push(...res);
//           });
//         }
//       });
//     }
//   });

//   return matchChildNode;
// }

/* 四、  */

/**
 * 查找核心：
 *  1）第一次遍历sketch的第一层children，传入sketch的节点到 code树[0] 查找
 *  2）第一次找符合sketch的节点的所有在code树的节点
 *     ===> 获得第一层 “node节点列表” 与 “sketch节点列表” 对应的数组列表 list1
 *
 *  3）第二次遍历sketch的第二层children，传入sketch的节点到 code树[1]
 */
