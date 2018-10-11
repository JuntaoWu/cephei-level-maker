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
    "revision": "0a375f67389caecc408e4513bcaa8bb6"
  },
  {
    "url": "js/dat.gui.js",
    "revision": "2a46f332e6979e00e22bde04ecab14ad"
  },
  {
    "url": "js/lodash.min.js",
    "revision": "c8515f131f3194c32a3670c8e274fab6"
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
    "revision": "da8b351ea17b7d3e47794dd5eef40c38"
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
    "url": "stylesheets/style.css",
    "revision": "bc598959a63383a3e3ef9461962b4bc8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
