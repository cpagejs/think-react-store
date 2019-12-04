module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "chrome": "64"
        // "browsers": ["last 2 versions", "safari >= 7"]
      },
      // useBuiltIns: "usage"
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
}
