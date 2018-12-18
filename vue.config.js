const ImageminPlugin = require('imagemin-webpack-plugin').default;
const webpack = require('webpack');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const UglifyJS = require('uglify-es');
const env_vars = require('./ENV_VARS');
const webpackConfig = {
  node: {
    process: true
  },
  devServer: {
    https: true,
    host: 'localhost',
    hotOnly: true,
    port: 8080
  },
  plugins: [
    new webpack.DefinePlugin(env_vars),
    new webpack.NormalModuleReplacementPlugin(/^any-promise$/, 'bluebird'),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: process.env.NODE_ENV !== 'production',
      pngquant: {
        quality: '95-100'
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
if (process.env.BUILD_TYPE === 'mewcx') {
  webpackConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: 'src/builds/mewcx/files',
        transform: function(content, filePath) {
          if (filePath.split('.').pop() === ('js' || 'JS'))
            return UglifyJS.minify(content.toString()).code;
          if (filePath.replace(/^.*[\\\/]/, '') === 'manifest.json') {
            const version = require('./package.json').version;
            const json = JSON.parse(content);
            json.version = version;
            return JSON.stringify(json);
          }
          return content;
        }
      }
    ])
  );
}
if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
  webpackConfig.plugins.push(
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.*'],
      failOnUnused: false,
      globOptions: {
        ignore: [
          'src/assets/images/mew-screen.png',
          'src/assets/images/flags/countries.json',
          'src/assets/images/networks/esn.svg',
          'src/translations/README.md',
          'src/translations/terms-of-conditions/en_US.json',
          'src/wallets/hybrid/MEWconnect/deterministicWalletPaths.js',
          'src/wallets/hardware/deterministicWalletPaths.js',
          // UnusedFilesWebpackPlugin marked the below files as unused
          'src/components/DropDownAddressSelector/',
          'src/components/Transactions/TransactionEntry/',
          'src/dapps/RegisterDomain/components/FinalizeModal/',
          'src/layouts/InterfaceLayout/components/ProvidersRadioSelector/',
          'src/layouts/InterfaceLayout/SwapContainer/',
          'src/assets/images/currency/coins/',
          'src/builds/',
          'src/components/Transactions/',
          'src/partners/',
          'src/components/Transactions/TransactionEntry/index.js',
          'src/components/Transactions/TransactionEntry/TransactionEntry.scss',
          'src/assets/images/currency/coins/AllImages/_icon-config.json',
          'src/assets/images/currency/coins/asFont/cryptocoins-colors.css',
          'src/assets/images/currency/coins/asFont/cryptocoins.css',
          'src/assets/images/currency/coins/asFont/cryptocoins.eot',
          'src/assets/images/currency/coins/asFont/cryptocoins.less',
          'src/assets/images/currency/coins/asFont/cryptocoins.ttf',
          'src/assets/images/currency/coins/asFont/cryptocoins.woff',
          'src/assets/images/currency/coins/asFont/cryptocoins.woff2',
          'src/assets/images/currency/coins/webfont/cryptocoins-colors.css',
          'src/assets/images/currency/coins/webfont/cryptocoins.css',
          'src/assets/images/currency/coins/webfont/cryptocoins.ttf',
          'src/assets/images/currency/coins/webfont/cryptocoins.woff',
          'src/assets/images/currency/coins/webfont/cryptocoins.woff2',
          'src/assets/images/etc/changelly.png',
          'src/assets/images/etc/simplex.png',
          'src/builds/chrome-extension/files/img/icons/icon128.png',
          'src/builds/chrome-extension/files/img/icons/icon16.png',
          'src/builds/chrome-extension/files/img/icons/icon192.png',
          'src/builds/chrome-extension/files/img/icons/icon32.png',
          'src/builds/chrome-extension/files/img/icons/icon48.png',
          'src/builds/chrome-extension/files/manifest.json',
          'src/components/Transactions/index.js',
          'src/components/Transactions/TransactionEntry/TransactionEntry.vue',
          'src/components/Transactions/Transactions.scss',
          'src/components/Transactions/Transactions.vue',
          'src/helpers/httpRequests.js',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/CheckoutForm/CheckoutForm.scss',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/CheckoutForm/CheckoutForm.vue',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/CheckoutForm/index.js',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/ProvidersRadioSelector/index.js',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/ProvidersRadioSelector/ProvidersRadioSelector.scss',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/ProvidersRadioSelector/ProvidersRadioSelector.vue',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapAddressSelector/index.js',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapAddressSelector/SwapAddressSelector.scss',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapAddressSelector/SwapAddressSelector.vue',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapCurrencyPicker/index.js',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapCurrencyPicker/SwapCurrencyPicker.scss',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapCurrencyPicker/SwapCurrencyPicker.vue',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapSendToModal/index.js',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapSendToModal/SwapSendToModal.scss',
          'src/layouts/InterfaceLayout/ceslintrcrs/SwapContainer/components/SwapSendToModal/SwapSendToModal.vue',
          'src/partners/bity/bity.js',
          'src/partners/bity/call.js',
          'src/partners/bity/config.js',
          'src/partners/bity/index.js',
          'src/partners/changelly/call.js',
          'src/partners/changelly/changelly.js',
          'src/partners/changelly/config/config.js',
          'src/partners/changelly/config/currencies.js',
          'src/partners/changelly/config/index.js',
          'src/partners/changelly/index.js',
          'src/partners/config/currencyDetails.js',
          'src/partners/config/index.js',
          'src/partners/helpers/currencyOptionBuilder.js',
          'src/partners/helpers/sortAndIdentify.js',
          'src/partners/index.js',
          'src/partners/kyber/call.js',
          'src/partners/kyber/config/config.js',
          'src/partners/kyber/config/currencies.js',
          'src/partners/kyber/config/currenciesRop.js',
          'src/partners/kyber/config/ERC20TokenABI.js',
          'src/partners/kyber/config/index.js',
          'src/partners/kyber/config/kyberNetworkABI.js',
          'src/partners/kyber/index.js',
          'src/partners/kyber/kyber.js',
          'src/partners/simplex/config.js',
          'src/partners/simplex/index.js',
          'src/partners/simplex/simplex-api.js',
          'src/partners/simplex/simplex.js',
          'src/builds/web/storage/index.js',
          'src/builds/mewcx/app.vue',
          'src/builds/mewcx/files/img/icons/icon128.png',
          'src/builds/mewcx/files/img/icons/icon16.png',
          'src/builds/mewcx/files/img/icons/icon192.png',
          'src/builds/mewcx/files/img/icons/icon32.png',
          'src/builds/mewcx/files/img/icons/icon48.png',
          'src/builds/mewcx/files/manifest.json',
          'src/builds/mewcx/index.js',
          'src/App.scss',
          'src/assets/images/background/bg-left.png',
          'src/assets/images/background/bg-right.png',
          'src/assets/images/icons/arrow-green-right.svg',
          'src/assets/images/icons/btc.png',
          'src/assets/images/icons/favicon.png',
          'src/assets/images/icons/github-black.png',
          'src/assets/images/icons/slack.png',
          'src/assets/images/networks/etsc.svg',
          'src/assets/images/networks/exp.svg',
          'src/components/ConfirmationModal/ConfirmationModal.scss',
          'src/components/ConfirmationModal/ConfirmationModal.vue',
          'src/components/ConfirmationModal/index.js',
          'src/components/DropDownBidCurrencySelector/DropDownBidCurrencySelector.scss',
          'src/components/DropDownBidCurrencySelector/DropDownBidCurrencySelector.vue',
          'src/components/DropDownBidCurrencySelector/index.js',
          'src/components/TransactionsDropdownMenu/index.js',
          'src/components/TransactionsDropdownMenu/TransactionsDropdownMenu.scss',
          'src/components/TransactionsDropdownMenu/TransactionsDropdownMenu.vue',
          'src/contracts/contract-abi-etsc.json',
          'src/contracts/contract-abi-exp.json',
          'src/layouts/DevelopmentResources/DevelopmentResources.scss',
          'src/layouts/DevelopmentResources/DevelopmentResources.vue',
          'src/layouts/DevelopmentResources/index.js',
          'src/layouts/InformationPages/AdvancedToolsLayout/AdvancedToolsLayout.scss',
          'src/layouts/InformationPages/AdvancedToolsLayout/AdvancedToolsLayout.vue',
          'src/layouts/InformationPages/AdvancedToolsLayout/index.js',
          'src/layouts/InformationPages/ExtensionsLayout/ExtensionsLayout.scss',
          'src/layouts/InformationPages/ExtensionsLayout/ExtensionsLayout.vue',
          'src/layouts/InformationPages/ExtensionsLayout/index.js',
          'src/layouts/InformationPages/MewGithubLayout/index.js',
          'src/layouts/InformationPages/MewGithubLayout/MewGithubLayout.scss',
          'src/layouts/InformationPages/MewGithubLayout/MewGithubLayout.vue',
          'src/layouts/InformationPages/PrivacyPolicyLayout/index.js',
          'src/layouts/InformationPages/PrivacyPolicyLayout/PrivacyPolicyLayout.scss',
          'src/layouts/InformationPages/PrivacyPolicyLayout/PrivacyPolicyLayout.vue',
          'src/layouts/InformationPages/TermsAndConditionsLayout/index.js',
          'src/layouts/InformationPages/TermsAndConditionsLayout/TermsAndConditionsLayout.scss',
          'src/layouts/InformationPages/TermsAndConditionsLayout/TermsAndConditionsLayout.vue',
          'src/layouts/InterfaceLayout/containers/SendCurrencyContainer/SendCurrencyContainer-desktop.scss',
          'src/layouts/InterfaceLayout/containers/SendCurrencyContainer/SendCurrencyContainer-mobile.scss',
          'src/layouts/InterfaceLayout/containers/SendCurrencyContainer/SendCurrencyContainer-tablet.scss',
          'src/layouts/InterfaceLayout/containers/SwapContainer/components/SwapSendToModal/SwapSendToModal.vue',
          'src/layouts/TxStatusLayout/index.js',
          'src/layouts/TxStatusLayout/TxStatusLayout.scss',
          'src/layouts/TxStatusLayout/TxStatusLayout.vue',
          'src/tokens/tokens-etsc.json',
          'src/tokens/tokens-exp.json'
        ]
      }
    })
  );
}
const pwa = {
  name: 'MyEtherWallet',
  workboxOptions: {
    importWorkboxFrom: 'local'
  }
};
module.exports = {
  baseUrl: process.env.ROUTER_MODE === 'history' ? '/' : './',
  configureWebpack: webpackConfig,
  pwa: pwa,
  lintOnSave: process.env.NODE_ENV === 'production' ? 'error' : true,
  integrity: true,
  chainWebpack: config => {}
};