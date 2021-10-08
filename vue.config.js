process.env.VUE_APP_VERSION = require("./package.json").version;
module.exports = {
	transpileDependencies: ["vuetify"],
    devServer: {
        // clientLogLevel: "warning",
        // https: true,
        open: false,
        hot: true,
        compress: true,
        overlay: {
            warnings: false,
            errors: true
        },
        stats: "errors-only",
        watchOptions: {
            poll: false,
            ignored: /node_modules/
        }
    },
    chainWebpack: config => {
        config
            .plugin("html")
            .tap(args => {
                args[0].title = "ExpenseJAR - Maintain your expenses";
                return args;
            })
    }
}
