/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "editor.html",
    "revision": "7ab6ad58bd97bc726c90f3f6445c2515"
  },
  {
    "url": "js/dat.gui.js",
    "revision": "2a46f332e6979e00e22bde04ecab14ad"
  },
  {
    "url": "js/lodash.min.js",
    "revision": "b384de63a4d277919292e4b67be279b9"
  },
  {
    "url": "js/login.js",
    "revision": "ed814543c24173e87c526517cae79963"
  },
  {
    "url": "js/p2.js",
    "revision": "5ebc69945081509fe28b1c001d999869"
  },
  {
    "url": "js/p2.renderer.js",
    "revision": "9a06786b58556610bd9886519c7f80dd"
  },
  {
    "url": "js/pixi.js",
    "revision": "a257528e96497b21b80f0e1016d63aac"
  },
  {
    "url": "js/register.js",
    "revision": "3ed9a1573cf35734685bde44e233ad1b"
  },
  {
    "url": "js/Renderer.js",
    "revision": "9bd102c1196207a1a37047fcf17344ba"
  },
  {
    "url": "js/rhill-voronoi-core.min.js",
    "revision": "ac08ce5fa3472f4313061c9a14538210"
  },
  {
    "url": "js/WebGLRenderer.js",
    "revision": "02250bed1d220c3c86cd58a7dadd6bb8"
  },
  {
    "url": "resource/assets/background/game-background.png",
    "revision": "1d4fe36e1cadd9cd1bf623daa47a8369"
  },
  {
    "url": "resource/assets/bg.jpg",
    "revision": "bfbd6002c35cd2bfa99ec5333c2e28f7"
  },
  {
    "url": "resource/assets/Button/button_down.png",
    "revision": "878334d13048afd6b6b061e8b156dadb"
  },
  {
    "url": "resource/assets/Button/button_up.png",
    "revision": "a6341a65c7155a4edbbf1f39bc7932d9"
  },
  {
    "url": "resource/assets/caocao.png",
    "revision": "2752f5c58e4c341f858edf0541f4f90c"
  },
  {
    "url": "resource/assets/CheckBox/checkbox_select_disabled.png",
    "revision": "dd9aa43f0bf6cbb969f7cfa238734ee9"
  },
  {
    "url": "resource/assets/CheckBox/checkbox_select_down.png",
    "revision": "71e5f029838a1b6ffc11198097555e4b"
  },
  {
    "url": "resource/assets/CheckBox/checkbox_select_up.png",
    "revision": "68a00c5f12172b1a2f658925d69a998b"
  },
  {
    "url": "resource/assets/CheckBox/checkbox_unselect.png",
    "revision": "2ffa97740e6d6ea0b005b4465255b098"
  },
  {
    "url": "resource/assets/cue.png",
    "revision": "ab9c4c86dd48709b361db2f4c78eb5c1"
  },
  {
    "url": "resource/assets/cueBall.png",
    "revision": "1bf1083fb8b31976a151d0ca2ecb3468"
  },
  {
    "url": "resource/assets/dragonBones/dizzy_ske.json",
    "revision": "70cac7970e942d1571ec443f2b1c676a"
  },
  {
    "url": "resource/assets/dragonBones/dizzy_tex.json",
    "revision": "1fe189a4ad5cb142c1ac3c49116acb6b"
  },
  {
    "url": "resource/assets/dragonBones/dizzy_tex.png",
    "revision": "92a787ad4b899651d852b3e232705d16"
  },
  {
    "url": "resource/assets/egret_icon.png",
    "revision": "d7c7550013fbcae72390f7ce17c78e19"
  },
  {
    "url": "resource/assets/fonts/level-number.png",
    "revision": "40cb5b40a4175d6fe6446d4c701dea88"
  },
  {
    "url": "resource/assets/icons/btn-back.png",
    "revision": "9250465aa2ce0a06b9b4feb2058e6aaf"
  },
  {
    "url": "resource/assets/icons/btn-restart.png",
    "revision": "2e54e650e84fbdc50eb784a9bc1f323e"
  },
  {
    "url": "resource/assets/icons/btn-tip.png",
    "revision": "0906550ea069f41c7880b3b1df25e030"
  },
  {
    "url": "resource/assets/icons/icon-power.png",
    "revision": "7dec0ddc2de366a409d3b0bc713285e7"
  },
  {
    "url": "resource/assets/icons/icon-star-black.png",
    "revision": "0de1a01b45a224cbdfab9c0f3bd04b10"
  },
  {
    "url": "resource/assets/icons/icon-star.png",
    "revision": "98041375cf07187057b2d45ac1ebc0ce"
  },
  {
    "url": "resource/assets/ItemRenderer/rank/rank-icon.json",
    "revision": "2a505f5d09e616fafb3101a00e5a7f91"
  },
  {
    "url": "resource/assets/ItemRenderer/rank/rank-icon.png",
    "revision": "7a255e7352c71daa758290aa08877abc"
  },
  {
    "url": "resource/assets/ItemRenderer/selected.png",
    "revision": "94efb85255bad50f4b5c1b44f7190d0d"
  },
  {
    "url": "resource/assets/loading/loading-background.png",
    "revision": "1d4fe36e1cadd9cd1bf623daa47a8369"
  },
  {
    "url": "resource/assets/loading/progress-bg.png",
    "revision": "73e740df3c719c94f7d01880122ff1b8"
  },
  {
    "url": "resource/assets/loading/progress.png",
    "revision": "db3c2ee2cf4f1ef094a6c6accb9c530f"
  },
  {
    "url": "resource/assets/Panel/border.png",
    "revision": "a4ff3e088a39fef12556e404e768244a"
  },
  {
    "url": "resource/assets/Panel/header.png",
    "revision": "46c313e8c024d3bf069767075842b713"
  },
  {
    "url": "resource/assets/ProgressBar/thumb_pb.png",
    "revision": "903295905d99cabc4c2b679959d55373"
  },
  {
    "url": "resource/assets/ProgressBar/track_pb.png",
    "revision": "60e6154d678d5e516dfe3f84b47dd894"
  },
  {
    "url": "resource/assets/radar.png",
    "revision": "bfb6dc66751f0b983b2b018095de845b"
  },
  {
    "url": "resource/assets/RadioButton/radiobutton_select_disabled.png",
    "revision": "725d226305491301ca8cce8aa68d08d6"
  },
  {
    "url": "resource/assets/RadioButton/radiobutton_select_down.png",
    "revision": "725d226305491301ca8cce8aa68d08d6"
  },
  {
    "url": "resource/assets/RadioButton/radiobutton_select_up.png",
    "revision": "bf16aacfe9b30037835e1c6482eee507"
  },
  {
    "url": "resource/assets/RadioButton/radiobutton_unselect.png",
    "revision": "cd40270b37ab3a5248ea2c61f883934c"
  },
  {
    "url": "resource/assets/rects.rect-1.png",
    "revision": "847e458a917cf7a4de7a3cd8ca5601a6"
  },
  {
    "url": "resource/assets/rects.rect-9.png",
    "revision": "bc9634a7f441eb0e8932ea53a46ead04"
  },
  {
    "url": "resource/assets/redBall.png",
    "revision": "9820aa2e6af3c15264022774651e395a"
  },
  {
    "url": "resource/assets/ScrollBar/roundthumb.png",
    "revision": "5f550ff68f1240501f035fdc0eda0843"
  },
  {
    "url": "resource/assets/ScrollBar/track_sb.png",
    "revision": "541048214115efe2a7a2750cde6b4e54"
  },
  {
    "url": "resource/assets/Slider/thumb.png",
    "revision": "ac46ad4174244342194e74667d57cf1d"
  },
  {
    "url": "resource/assets/Slider/track.png",
    "revision": "541048214115efe2a7a2750cde6b4e54"
  },
  {
    "url": "resource/assets/Slider/tracklight.png",
    "revision": "5f550ff68f1240501f035fdc0eda0843"
  },
  {
    "url": "resource/assets/start/btn-view.png",
    "revision": "c2963777d52080a1399b8ba4a1a44c46"
  },
  {
    "url": "resource/assets/table.jpg",
    "revision": "5e2958f87240dbcc648092b4e6be45aa"
  },
  {
    "url": "resource/assets/ToggleSwitch/handle.png",
    "revision": "1b0a0f006c66a7264ab62a897076bd12"
  },
  {
    "url": "resource/assets/ToggleSwitch/off.png",
    "revision": "808df10161bd36abd6600f16e131aca3"
  },
  {
    "url": "resource/assets/ToggleSwitch/on.png",
    "revision": "1dccf23d316f65d77c6497d3de987b1d"
  },
  {
    "url": "resource/assets/trap.png",
    "revision": "fcf9fba9f3985dc5c9e5b3cfb725d35f"
  },
  {
    "url": "resource/assets/xiaobin.png",
    "revision": "b6961d9817165df7463e0e7a5a716ac1"
  },
  {
    "url": "resource/assets/zhangai/QPG22I_1)_M`7({CC2A(E3R.jpg",
    "revision": "caf405994916f3f90f90d7d4804dc7c5"
  },
  {
    "url": "resource/assets/zhangai/repeat50.png",
    "revision": "9132dd84cbe67654685b0a29b50bf4e7"
  },
  {
    "url": "resource/assets/zhangai/repeatEnd.png",
    "revision": "8a81a76b3117b6efc89b4ec73bc16554"
  },
  {
    "url": "resource/assets/zhangai/repeatTop.png",
    "revision": "3ffa025326e98d5e87cca73793091e48"
  },
  {
    "url": "resource/assets/zhangai/Stabs.png",
    "revision": "12437cc7702767f45d3bb6bb87ffec21"
  },
  {
    "url": "resource/assets/zhangai/stone-rotate.png",
    "revision": "49a12ef8dd90ddcd15eee172b89babaa"
  },
  {
    "url": "resource/assets/zhangai/stone.png",
    "revision": "2eb08fb7a859eedbed43fb2cc8298a88"
  },
  {
    "url": "resource/assets/zhangai/游戏内容.png",
    "revision": "aa3ed5c97fabcd0414784e07b99452b6"
  },
  {
    "url": "resource/assets/zhangfei_range.png",
    "revision": "5cb41490eef9f4414a4d97eecbf1871f"
  },
  {
    "url": "resource/assets/zhangfei.png",
    "revision": "99a8efb6ccce39cfffbc30e10f4b4248"
  },
  {
    "url": "resource/config/antiques.json",
    "revision": "934c91d6398d7317a88aa01276cc2b1c"
  },
  {
    "url": "resource/config/clubs.json",
    "revision": "fd38e628d9dd204639988510eb6e49df"
  },
  {
    "url": "resource/config/description.json",
    "revision": "53ec3cea96670c9e36a683e0842ad67b"
  },
  {
    "url": "resource/config/game-term.json",
    "revision": "e7c04b454647d3368ea904004e1996af"
  },
  {
    "url": "resource/config/level.json",
    "revision": "feef59f58a359f21d2f3a42893feeced"
  },
  {
    "url": "resource/config/photon.json",
    "revision": "9ee304bbff81116b44fe85ab8cf01823"
  },
  {
    "url": "resource/config/rank.json",
    "revision": "ef7484edec56d7299e0fa66734a1e16b"
  },
  {
    "url": "resource/config/role.json",
    "revision": "f77f1b695f2c32e81df6d9fa93cd5193"
  },
  {
    "url": "resource/config/seats.json",
    "revision": "e2be56369847ad41954419ef1644f96b"
  },
  {
    "url": "resource/default.res.json",
    "revision": "1fedc464efeb49b0a6f9d0fbc84f21d1"
  },
  {
    "url": "resource/default.thm.json",
    "revision": "b9bc5068f7a641e5539e6f7b96f90304"
  },
  {
    "url": "resource/gameEui.json",
    "revision": "99914b932bd37a50b983c5e7c90ae93b"
  },
  {
    "url": "stylesheets/style.css",
    "revision": "bc598959a63383a3e3ef9461962b4bc8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
