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
    "revision": "eb6e23b1842b18d44b83693ce1b43041"
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
    "url": "js/dat.gui.js",
    "revision": "2a46f332e6979e00e22bde04ecab14ad"
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
    "url": "js/p2.js",
    "revision": "5ebc69945081509fe28b1c001d999869"
  },
  {
    "url": "js/p2.renderer.js",
    "revision": "42526ae762c04680c9249d40c296a4c7"
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
