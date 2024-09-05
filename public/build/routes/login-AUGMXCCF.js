import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader
} from "/build/_shared/chunk-UFE3VKFV.js";
import {
  Input
} from "/build/_shared/chunk-BU7OEKCX.js";
import {
  Button,
  CircleAlert,
  LoaderCircle
} from "/build/_shared/chunk-7NJH6SRP.js";
import "/build/_shared/chunk-D3IQKTGD.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Form,
  esm_exports,
  init_esm,
  useActionData,
  useNavigation
} from "/build/_shared/chunk-GBNPHAJX.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-CCTWOZM6.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __commonJS,
  __toCommonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:~/services/auth.server
var require_auth = __commonJS({
  "empty-module:~/services/auth.server"(exports, module) {
    module.exports = {};
  }
});

// node_modules/remix-auth/build/authenticator.js
var require_authenticator = __commonJS({
  "node_modules/remix-auth/build/authenticator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authenticator = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports));
    var Authenticator = class {
      /**
       * Create a new instance of the Authenticator.
       *
       * It receives a instance of the SessionStorage. This session storage could
       * be created using any method exported by Remix, this includes:
       * - `createSessionStorage`
       * - `createFileSystemSessionStorage`
       * - `createCookieSessionStorage`
       * - `createMemorySessionStorage`
       *
       * It optionally receives an object with extra options. The supported options
       * are:
       * - `sessionKey`: The key used to store and read the user in the session storage.
       * @example
       * import { sessionStorage } from "./session.server";
       * let authenticator = new Authenticator(sessionStorage);
       * @example
       * import { sessionStorage } from "./session.server";
       * let authenticator = new Authenticator(sessionStorage, {
       *   sessionKey: "token",
       * });
       */
      constructor(sessionStorage, options = {}) {
        var _a;
        this.sessionStorage = sessionStorage;
        this.strategies = /* @__PURE__ */ new Map();
        this.sessionKey = options.sessionKey || "user";
        this.sessionErrorKey = options.sessionErrorKey || "auth:error";
        this.sessionStrategyKey = options.sessionStrategyKey || "strategy";
        this.throwOnError = (_a = options.throwOnError) !== null && _a !== void 0 ? _a : false;
      }
      /**
       * Call this method with the Strategy, the optional name allows you to setup
       * the same strategy multiple times with different names.
       * It returns the Authenticator instance for concatenation.
       * @example
       * authenticator
       *  .use(new SomeStrategy({}, (user) => Promise.resolve(user)))
       *  .use(new SomeStrategy({}, (user) => Promise.resolve(user)), "another");
       */
      use(strategy, name) {
        this.strategies.set(name !== null && name !== void 0 ? name : strategy.name, strategy);
        return this;
      }
      /**
       * Call this method with the name of the strategy you want to remove.
       * It returns the Authenticator instance for concatenation.
       * @example
       * authenticator.unuse("another").unuse("some");
       */
      unuse(name) {
        this.strategies.delete(name);
        return this;
      }
      authenticate(strategy, request, options = {}) {
        const strategyObj = this.strategies.get(strategy);
        if (!strategyObj)
          throw new Error(`Strategy ${strategy} not found.`);
        return strategyObj.authenticate(new Request(request.url, request), this.sessionStorage, {
          throwOnError: this.throwOnError,
          ...options,
          name: strategy,
          sessionKey: this.sessionKey,
          sessionErrorKey: this.sessionErrorKey,
          sessionStrategyKey: this.sessionStrategyKey
        });
      }
      async isAuthenticated(request, options = {}) {
        var _a;
        let session = (0, server_runtime_1.isSession)(request) ? request : await this.sessionStorage.getSession(request.headers.get("Cookie"));
        let user = (_a = session.get(this.sessionKey)) !== null && _a !== void 0 ? _a : null;
        if (user) {
          if (options.successRedirect) {
            throw (0, server_runtime_1.redirect)(options.successRedirect, { headers: options.headers });
          } else
            return user;
        }
        if (options.failureRedirect) {
          throw (0, server_runtime_1.redirect)(options.failureRedirect, { headers: options.headers });
        } else
          return null;
      }
      /**
       * Destroy the user session throw a redirect to another URL.
       * @example
       * async function action({ request }: ActionFunctionArgs) {
       *   await authenticator.logout(request, { redirectTo: "/login" });
       * }
       */
      async logout(request, options) {
        let session = (0, server_runtime_1.isSession)(request) ? request : await this.sessionStorage.getSession(request.headers.get("Cookie"));
        let headers = new Headers(options.headers);
        headers.append("Set-Cookie", await this.sessionStorage.destroySession(session));
        throw (0, server_runtime_1.redirect)(options.redirectTo, { headers });
      }
    };
    exports.Authenticator = Authenticator;
  }
});

// node_modules/remix-auth/build/authorizer.js
var require_authorizer = __commonJS({
  "node_modules/remix-auth/build/authorizer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authorizer = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports));
    var Authorizer = class {
      constructor(authenticator2, rules = []) {
        this.authenticator = authenticator2;
        this.rules = rules;
      }
      async authorize(args, { failureRedirect, raise = "response", rules = [] } = {}) {
        let user = await this.authenticator.isAuthenticated(args.request);
        if (!user) {
          if (raise === "response") {
            throw (0, server_runtime_1.json)({ message: "Not authenticated." }, { status: 401 });
          }
          if (raise === "redirect") {
            throw (0, server_runtime_1.redirect)(failureRedirect);
          }
          throw new Error("Not authenticated.");
        }
        for (let rule of [...this.rules, ...rules]) {
          if (await rule({ user, ...args }))
            continue;
          if (raise === "redirect")
            throw (0, server_runtime_1.redirect)(failureRedirect);
          if (raise === "response") {
            if (!rule.name)
              throw (0, server_runtime_1.json)({ message: "Forbidden" }, { status: 403 });
            throw (0, server_runtime_1.json)({ message: `Forbidden by policy ${rule.name}` }, { status: 403 });
          }
          if (!rule.name)
            throw new Error("Forbidden.");
          throw new Error(`Forbidden by policy ${rule.name}`);
        }
        return user;
      }
    };
    exports.Authorizer = Authorizer;
  }
});

// node_modules/remix-auth/build/error.js
var require_error = __commonJS({
  "node_modules/remix-auth/build/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthorizationError = void 0;
    var AuthorizationError2 = class extends Error {
      constructor(message, cause) {
        super(message);
        this.cause = cause;
      }
    };
    exports.AuthorizationError = AuthorizationError2;
  }
});

// node_modules/remix-auth/build/strategy.js
var require_strategy = __commonJS({
  "node_modules/remix-auth/build/strategy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Strategy = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports));
    var error_1 = require_error();
    var Strategy = class {
      constructor(verify) {
        this.verify = verify;
      }
      /**
       * Throw an AuthorizationError or a redirect to the failureRedirect.
       * @param message The error message to set in the session.
       * @param request The request to get the cookie out of.
       * @param sessionStorage The session storage to retrieve the session from.
       * @param options The strategy options.
       * @throws {AuthorizationError} If the throwOnError is set to true.
       * @throws {Response} If the failureRedirect is set or throwOnError is false.
       * @returns {Promise<never>}
       */
      async failure(message, request, sessionStorage, options, cause) {
        if (!options.failureRedirect) {
          if (options.throwOnError)
            throw new error_1.AuthorizationError(message, cause);
          throw (0, server_runtime_1.json)({ message }, 401);
        }
        let session = await sessionStorage.getSession(request.headers.get("Cookie"));
        session.flash(options.sessionErrorKey, { message });
        throw (0, server_runtime_1.redirect)(options.failureRedirect, {
          headers: { "Set-Cookie": await sessionStorage.commitSession(session) }
        });
      }
      /**
       * Returns the user data or throw a redirect to the successRedirect.
       * @param user The user data to set in the session.
       * @param request The request to get the cookie out of.
       * @param sessionStorage The session storage to retrieve the session from.
       * @param options The strategy options.
       * @returns {Promise<User>} The user data.
       * @throws {Response} If the successRedirect is set, it will redirect to it.
       */
      async success(user, request, sessionStorage, options) {
        var _a;
        if (!options.successRedirect)
          return user;
        let session = await sessionStorage.getSession(request.headers.get("Cookie"));
        session.set(options.sessionKey, user);
        session.set(options.sessionStrategyKey, (_a = options.name) !== null && _a !== void 0 ? _a : this.name);
        throw (0, server_runtime_1.redirect)(options.successRedirect, {
          headers: { "Set-Cookie": await sessionStorage.commitSession(session) }
        });
      }
    };
    exports.Strategy = Strategy;
  }
});

// node_modules/remix-auth/build/index.js
var require_build = __commonJS({
  "node_modules/remix-auth/build/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_authenticator(), exports);
    __exportStar(require_authorizer(), exports);
    __exportStar(require_error(), exports);
    __exportStar(require_strategy(), exports);
  }
});

// app/routes/login.tsx
var import_auth = __toESM(require_auth(), 1);
var import_remix_auth = __toESM(require_build(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/login.tsx"
  );
  import.meta.hot.lastModified = "1725542224641.3987";
}
function Login() {
  _s();
  const actionData = useActionData();
  const transition = useNavigation();
  const isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center h-screen bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { className: "w-full max-w-sm mx-auto p-6 bg-white shadow-md rounded-md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-bold text-center", children: "Sign In" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 40,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { name: "email", type: "email", placeholder: "Email", className: `w-full ${actionData?.errors?.email ? "border-red-500" : ""}`, disabled: isSubmitting }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 45,
          columnNumber: 15
        }, this),
        actionData?.errors?.email && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-sm", children: actionData.errors.email }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 46,
          columnNumber: 45
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 44,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { name: "password", type: "password", placeholder: "Password", className: `w-full ${actionData?.errors?.password ? "border-red-500" : ""}`, disabled: isSubmitting }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        actionData?.errors?.password && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-sm", children: actionData.errors.password }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 52,
          columnNumber: 48
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 50,
        columnNumber: 13
      }, this),
      actionData?.generalError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-4 w-4" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 57,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertTitle, { className: "pl-0 ", children: actionData.generalError }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 58,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 56,
        columnNumber: 42
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", className: "w-full mt-4", disabled: isSubmitting, children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 64,
          columnNumber: 19
        }, this),
        " Please wait"
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 63,
        columnNumber: 31
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: "Log In" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 65,
        columnNumber: 23
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 62,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 43,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 42,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 38,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 37,
    columnNumber: 10
  }, this);
}
_s(Login, "WnSomWCNIe8FOMO4uooxOdyKcWk=", false, function() {
  return [useActionData, useNavigation];
});
_c = Login;
var _c;
$RefreshReg$(_c, "Login");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Login as default
};
//# sourceMappingURL=/build/routes/login-AUGMXCCF.js.map
