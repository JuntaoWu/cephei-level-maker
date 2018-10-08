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
    "revision": "01d0e7a8324cd6eed0c30904e4dbd9d2"
  },
  {
    "url": "images/icons-192.png",
    "revision": "c14c655f8f406ecef2ab61713cd9b2fe"
  },
  {
    "url": "images/icons-512.png",
    "revision": "98ed5ce171929aab0653a755f13ea3c1"
  },
  {
    "url": "index.html",
    "revision": "99ca9f3a9b64b68d6f96eb4df54d0dc6"
  },
  {
    "url": "js/assetsmanager.min_e1440ef3.js",
    "revision": "a1c87284cbf20835d61566be2294fbd6"
  },
  {
    "url": "js/dat.gui.js",
    "revision": "2a46f332e6979e00e22bde04ecab14ad"
  },
  {
    "url": "js/default.thm_c5fa21dc.js",
    "revision": "f1d33679704dd4f9b4898937bc9ab9a0"
  },
  {
    "url": "js/dragonBones.min_6252b9c4.js",
    "revision": "8e2f39e62dbea0106e177ec0748aaca7"
  },
  {
    "url": "js/egret.min_40e267ce.js",
    "revision": "584a8b97b0dbdab1c8ef825168fc6dec"
  },
  {
    "url": "js/egret.web.min_29018c52.js",
    "revision": "9010cc6e29c92a01064f64113c96ae78"
  },
  {
    "url": "js/eui.min_9cf92601.js",
    "revision": "83a29edcc9a222d4687c9d40d2b6070f"
  },
  {
    "url": "js/experimental.min_31954293.js",
    "revision": "1aba35369d25a01002413cadc9cbfe70"
  },
  {
    "url": "js/game.min_45aa06f6.js",
    "revision": "9b128bc335b0ced149a2cc7724688ec8"
  },
  {
    "url": "js/lodash.min.js",
    "revision": "c8515f131f3194c32a3670c8e274fab6"
  },
  {
    "url": "js/login.js",
    "revision": "8ee9f1f67e6cad7ebc4d242cefd8847c"
  },
  {
    "url": "js/main.min_1135827a.js",
    "revision": "e5828484e6f8f98ae28ca17e004895fe"
  },
  {
    "url": "js/main.min_3567abba.js",
    "revision": "8f4e1c74ceb3e46cf3a3cc05fa5b2de4"
  },
  {
    "url": "js/main.min_56c1f261.js",
    "revision": "a3d883395f4e21e2bce2a32e2bd14704"
  },
  {
    "url": "js/main.min_ae265358.js",
    "revision": "f4777ba137d5264fde6a27770259741a"
  },
  {
    "url": "js/main.min_b5453a7c.js",
    "revision": "d19fd85c9efe9fbdad9e66032f57c231"
  },
  {
    "url": "js/p2.js",
    "revision": "5ebc69945081509fe28b1c001d999869"
  },
  {
    "url": "js/p2.renderer.js",
    "revision": "da184fc0da9a7ff6fad8d22150ec775f"
  },
  {
    "url": "js/physics.min_2fdcf68e.js",
    "revision": "e73c1a0625b3b3e3089d59b4b448a6d4"
  },
  {
    "url": "js/pixi.js",
    "revision": "a257528e96497b21b80f0e1016d63aac"
  },
  {
    "url": "js/promise.min_83a6a5d.js",
    "revision": "1db72e0812aeb36ffec5285a2e14959f"
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
    "url": "js/socket.min_8b4cb752.js",
    "revision": "43649a162ccb3e1376835c9db9c147cf"
  },
  {
    "url": "js/tween.min_6c5a88f9.js",
    "revision": "20f8a48b4726c837db3d3cb6dfeaf8b1"
  },
  {
    "url": "js/WebGLRenderer.js",
    "revision": "02250bed1d220c3c86cd58a7dadd6bb8"
  },
  {
    "url": "manifest.json",
    "revision": "dfa49f584d35d11810892db15658e4f2"
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
    "url": "resource/assets/ItemRenderer/selected.png",
    "revision": "94efb85255bad50f4b5c1b44f7190d0d"
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
    "url": "resource/config/description.json",
    "revision": "53ec3cea96670c9e36a683e0842ad67b"
  },
  {
    "url": "resource/config/level.json",
    "revision": "5354f892d41856e0c86c8e2689fe9057"
  },
  {
    "url": "resource/default.res.json",
    "revision": "427c3d8d5cc81e42dcfb90faadad88eb"
  },
  {
    "url": "resource/default.thm.json",
    "revision": "ada269381e5bd0045d9dc4b7916c154c"
  },
  {
    "url": "stylesheets/style.css",
    "revision": "bc598959a63383a3e3ef9461962b4bc8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
