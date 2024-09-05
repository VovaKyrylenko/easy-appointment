import {
  gql,
  useMutation
} from "/build/_shared/chunk-CM2XESBQ.js";
import {
  require_node,
  require_session
} from "/build/_shared/chunk-UY5JWTSU.js";
import {
  ArrowLeft,
  Button,
  Check,
  LoaderCircle
} from "/build/_shared/chunk-7NJH6SRP.js";
import "/build/_shared/chunk-D3IQKTGD.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Link,
  useLoaderData,
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
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.confirm.tsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);

// app/graphql/queries/create-booking.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/graphql/queries/create-booking.ts"
  );
  import.meta.hot.lastModified = "1725455425819.489";
}
var CREATE_BOOKING = gql`
  mutation CreateBooking(
    $apartmentId: ID!
    $startDate: String!
    $endDate: String!
    $userName: String!
    $userPhone: String!
    $userEmail: String!
  ) {
    createBooking(
      apartmentId: $apartmentId
      startDate: $startDate
      endDate: $endDate
      userName: $userName
      userPhone: $userPhone
      userEmail: $userEmail
    ) {
      id
      userName
      apartment {
        name
      }
      startDate
      endDate
    }
  }
`;

// app/hooks/use-create-booking.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/hooks/use-create-booking.ts"
  );
  import.meta.hot.lastModified = "1725455460366.2283";
}
var useCreateBooking = () => {
  const [createBooking, { data, loading, error }] = useMutation(CREATE_BOOKING);
  return { createBooking, data, loading, error };
};

// app/routes/app.confirm.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.confirm.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app.confirm.tsx"
  );
  import.meta.hot.lastModified = "1725543672372.775";
}
function ConfirmBooking() {
  _s();
  const {
    apartment,
    dates,
    userData
  } = useLoaderData();
  const {
    createBooking,
    error
  } = useCreateBooking();
  const transition = useNavigation();
  if (!apartment || !dates?.from || !dates?.to || !userData) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Something went wrong. Please go back and fill in all the details." }, void 0, false, {
      fileName: "app/routes/app.confirm.tsx",
      lineNumber: 41,
      columnNumber: 12
    }, this);
  }
  const calculateTotalPrice = () => {
    const startDate = new Date(dates.from);
    const endDate = new Date(dates.to);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24));
    return days * apartment.price;
  };
  const handleConfirmBooking = async () => {
    try {
      await createBooking({
        variables: {
          apartmentId: apartment.id,
          startDate: dates.from,
          endDate: dates.to,
          userName: userData.userName,
          userPhone: userData.userPhone,
          userEmail: userData.userEmail
        }
      });
      await fetch("/app/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Remix-Action": "destroy-session"
        }
      });
    } catch (error2) {
      console.error("Booking creation failed:", error2);
    }
  };
  const isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-lg w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold mb-6 text-center", children: "Booking Summary" }, void 0, false, {
      fileName: "app/routes/app.confirm.tsx",
      lineNumber: 75,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-center", children: [
      "Failed to create booking: ",
      error.message
    ] }, void 0, true, {
      fileName: "app/routes/app.confirm.tsx",
      lineNumber: 79,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Name:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: userData.userName }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Phone:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 89,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: userData.userPhone }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Email:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: userData.userEmail }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 92,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Apartment:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 97,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: apartment.name }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 98,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 96,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Location:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 101,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: apartment.location }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Check-in:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 105,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: new Date(dates.from).toDateString() }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Check-out:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: new Date(dates.to).toDateString() }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between text-lg font-semibold", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Price:" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 113,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
          "$",
          calculateTotalPrice().toFixed(2)
        ] }, void 0, true, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 112,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.confirm.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex mt-6 space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "button", disabled: isSubmitting, children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 121,
          columnNumber: 17
        }, this),
        " Please wait"
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 120,
        columnNumber: 29
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/app/user-data", className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-2 h-4 w-4" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 123,
          columnNumber: 17
        }, this),
        " Back"
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 122,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 119,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", disabled: isSubmitting, onClick: handleConfirmBooking, children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 128,
          columnNumber: 17
        }, this),
        " Please wait"
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 127,
        columnNumber: 29
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/app/success", children: [
        "Confirm Booking",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "ml-2 h-5 w-5" }, void 0, false, {
          fileName: "app/routes/app.confirm.tsx",
          lineNumber: 131,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 129,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/routes/app.confirm.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.confirm.tsx",
      lineNumber: 118,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.confirm.tsx",
    lineNumber: 74,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/app.confirm.tsx",
    lineNumber: 73,
    columnNumber: 10
  }, this);
}
_s(ConfirmBooking, "GEbEkKf1TO1jD+vxS9bhbFzEeag=", false, function() {
  return [useLoaderData, useCreateBooking, useNavigation];
});
_c = ConfirmBooking;
var _c;
$RefreshReg$(_c, "ConfirmBooking");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ConfirmBooking as default
};
//# sourceMappingURL=/build/routes/app.confirm-WDODMUFT.js.map
