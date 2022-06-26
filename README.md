
# qbr-clothing

**My version of qbr-clothing with translation support and added command /clothingunbug**

## Features

- [x]  Same as original qbr-clothing
- [x]  /clothingunbug - F8 command that close NUI without saving character
- [x]  Translation support
- [ ]  Repair attempting to use nil value when there is no character created before 
- [ ]  Repair overlays


## Change language (default is Polish)

To choose language PL or EN you can download release, or change it in `"./html/src/translation.js"` and compile (step 5). Maybe you want add your own language then follow these steps:
1. just copy one of previously created (XX_clothes, XX_menu)
2. change XX to your country code
3. translate content of variables (on right side)
4. add created var to exports at the bottom of file
5. install node.js on your computer
6. open powershell/cmd/terminal in `./html` and run **npm install webpack**
7. to compile code run **npm run build**
8. then go to `./shared/config.lua` and change clothingunbug = ""
## Dependencies

- [qbr-core](https://github.com/RexShack/qbr-core)

## Based on

- [qbr-clothing](https://github.com/RexShack/qbr-clothing)


## 🔗 Links
[![discord](https://img.shields.io/badge/Dziksonn%27s%20Server-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/6yeDVnd4)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/dziksonn)

