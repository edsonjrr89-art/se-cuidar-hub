/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ccc74704723a31f7623b593162daf7b9"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c4ce9559d6e854bfb55d3d8bd0dc7027"
  }, {
    "url": "pwa-192x192.png",
    "revision": "8c4ef98359daa538ba6ffe1315f05972"
  }, {
    "url": "index.html",
    "revision": "9b72756c32d932af2884290ddc3ee641"
  }, {
    "url": "icon.svg",
    "revision": "9690c1a754d740f15833e46541c306dd"
  }, {
    "url": "favicon.ico",
    "revision": "d8522a2cdae54ef47e920ae962ea6ed5"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "dba2312a4e0e9379ccf49152b5a33dfd"
  }, {
    "url": "assets/index-K9Wv4LFN.css",
    "revision": null
  }, {
    "url": "assets/index-DbzioHwD.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "dba2312a4e0e9379ccf49152b5a33dfd"
  }, {
    "url": "favicon.ico",
    "revision": "d8522a2cdae54ef47e920ae962ea6ed5"
  }, {
    "url": "icon.svg",
    "revision": "9690c1a754d740f15833e46541c306dd"
  }, {
    "url": "pwa-192x192.png",
    "revision": "8c4ef98359daa538ba6ffe1315f05972"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c4ce9559d6e854bfb55d3d8bd0dc7027"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ccc74704723a31f7623b593162daf7b9"
  }, {
    "url": "manifest.webmanifest",
    "revision": "0d5180c2cf0187e6488c53fb8dc55da6"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
