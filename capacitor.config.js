"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    appId: 'com.tylerfarris.wormcast',
    appName: 'WormCast',
    webDir: 'dist',
    server: {
        androidScheme: 'https',
    },
    android: {
        buildOptions: {
            keystorePath: 'release.keystore',
            keystoreAlias: 'wormcast',
        },
    },
};
exports.default = config;
