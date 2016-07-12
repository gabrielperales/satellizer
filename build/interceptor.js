"use strict";
var Interceptor = (function () {
    function Interceptor($q, SatellizerConfig, SatellizerShared, SatellizerStorage) {
        var _this = this;
        this.$q = $q;
        this.SatellizerConfig = SatellizerConfig;
        this.SatellizerShared = SatellizerShared;
        this.SatellizerStorage = SatellizerStorage;
        this.request = function (request) {
            if (request.skipAuthorization) {
                return request;
            }
            if (_this.SatellizerShared.isAuthenticated() && _this.SatellizerConfig.httpInterceptor()) {
                var tokenName = _this.SatellizerConfig.tokenPrefix ?
                    [_this.SatellizerConfig.tokenPrefix, _this.SatellizerConfig.tokenName].join('_') : _this.SatellizerConfig.tokenName;
                var token = _this.SatellizerStorage.get(tokenName);
                if (_this.SatellizerConfig.tokenHeader && _this.SatellizerConfig.tokenType) {
                    token = _this.SatellizerConfig.tokenType + ' ' + token;
                }
                request.headers[_this.SatellizerConfig.tokenHeader] = token;
            }
            return request;
        };
        this.responseError = function (response) {
            return _this.$q.reject(response);
        };
    }
    Interceptor.$inject = ['$q', 'SatellizerConfig', 'SatellizerShared', 'SatellizerStorage'];
    return Interceptor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Interceptor;
//# sourceMappingURL=interceptor.js.map