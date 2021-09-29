(function () {
  var moduleList = [
    // index.js
    function (myRequire, module, exports) {
      const moduleA = myRequire("./moduleA"); //  myRequire("./moduleA" ,0)
      console.log("moduleA输出：", moduleA);
    },
    // moduleA.js
    function (myRequire, module, exports) {
      module.exports = new Date().getTime();
    },
  ];

  // 引用关系
  var moduleDepIdList = [{ "./moduleA": 1 }, { "./moduleB": 2 }];

  var myRequire = function (id, parentId) {
    // 1) 先获取到当前的id （如果有parent的id，则从维护的数组moduleDepIdList中获取）
    var currentModuleId =
      parentId !== undefined ? moduleDepIdList[parentId][id] : id;

    var module = { exports: {} };

    var moduleFunc = moduleList[currentModuleId];

    moduleFunc((id) => myRequire(id, currentModuleId), module, module.exports);

    return module.exports;
  };

  myRequire(0);
})();
