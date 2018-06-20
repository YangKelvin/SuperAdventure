Framework.Game.fps = 120;
Framework.Game.canvasWidth = 1600;
Framework.Game.canvasHeight = 900;
Framework.Game.isBackwardCompatiable = false;

//當有要加關卡時, 可以使用addNewLevel
//第一個被加進來的Level就是啟動點, 所以一開始遊戲就進入MyMenu
Framework.Game.addNewLevel({myMenu: new MyMenu()})
Framework.Game.addNewLevel({chooseLevel: new ChooseLevel()})
Framework.Game.addNewLevel({cheatScreen: new CheatScreen()})
Framework.Game.addNewLevel({instructionScreen: new InstructionScreen()})
Framework.Game.addNewLevel({aboutScreen: new AboutScreen()})
Framework.Game.addNewLevel({levelTest: new LevelTest()});
Framework.Game.addNewLevel({level1: new Level1()});
Framework.Game.addNewLevel({level2: new Level2()});
Framework.Game.addNewLevel({level3: new Level3()});
Framework.Game.addNewLevel({level4: new Level4()});

Framework.Game.addNewLevel({dieScreen: new DieScreen()});
Framework.Game.addNewLevel({bag: new Bag()})
Framework.Game.addNewLevel({recordScreen: new RecordScreen()})

//讓Game開始運行
Framework.Game.start();


console.log("MainGame")