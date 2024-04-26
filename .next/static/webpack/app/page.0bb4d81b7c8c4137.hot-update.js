"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_notebook_Notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/notebook/Notebook */ \"(app-pages-browser)/./components/notebook/Notebook.tsx\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Home() {\n    _s();\n    const [notebooks, setNotebooks] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        if (status == \"unauthenticated\") {\n            router.push(\"/api/auth/signin\");\n        }\n    }, [\n        status\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        async function fetchNotebooks() {\n            const res = await fetch(\"/api/user/notebooks\");\n            const data = await res.json();\n            setNotebooks(data);\n        }\n        fetchNotebooks();\n    }, [\n        notebooks\n    ]);\n    const handleDelete = (id)=>{\n        async function deleteNotebook() {\n            const res = await fetch(\"/api/user/notebooks\", {\n                method: \"DELETE\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    id: id\n                })\n            });\n            if (res.ok) {\n                window.alert(\"Notebook deleted successfully\");\n            } else {\n                window.alert(\"Failed to delete notebook\");\n            }\n        }\n        deleteNotebook();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"flex min-h-screen flex-col items-center justify-between p-4 bg-black\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-4xl text-white\",\n                children: \"My Notebooks\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\krpiy\\\\Documents\\\\journum-next\\\\app\\\\page.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-20 mt-5\",\n                children: session && notebooks.map((notebook, index)=>{\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_notebook_Notebook__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        handleDelete: handleDelete,\n                        editMode: false,\n                        id: notebook.id,\n                        title: notebook.title,\n                        description: notebook.description,\n                        image: notebook.image\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\krpiy\\\\Documents\\\\journum-next\\\\app\\\\page.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 13\n                    }, this);\n                })\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\krpiy\\\\Documents\\\\journum-next\\\\app\\\\page.tsx\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\krpiy\\\\Documents\\\\journum-next\\\\app\\\\page.tsx\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"Q61rufiCZx2z6tZjMiQqvibjHXQ=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ3NEO0FBQ1Q7QUFDRDtBQUNBO0FBRTdCLFNBQVNLOztJQUN0QixNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR0gsK0NBQVFBLENBQUMsRUFBRTtJQUM3QyxNQUFNLEVBQUNJLE1BQU1DLE9BQU8sRUFBRUMsTUFBTSxFQUFDLEdBQUdULDJEQUFVQTtJQUMxQyxNQUFNVSxTQUFTVCwwREFBU0E7SUFFeEJDLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU8sVUFBVSxtQkFBbUI7WUFDL0JDLE9BQU9DLElBQUksQ0FBQztRQUNkO0lBQ0osR0FBRztRQUFDRjtLQUFPO0lBRVRQLGdEQUFTQSxDQUFDO1FBQ1IsZUFBZVU7WUFDYixNQUFNQyxNQUFNLE1BQU1DLE1BQU07WUFDeEIsTUFBTVAsT0FBTyxNQUFNTSxJQUFJRSxJQUFJO1lBQzNCVCxhQUFhQztRQUNmO1FBQ0FLO0lBQ0YsR0FBRztRQUFDUDtLQUFVO0lBRWQsTUFBTVcsZUFBZ0IsQ0FBQ0M7UUFDckIsZUFBZUM7WUFDYixNQUFNTCxNQUFNLE1BQU1DLE1BQU0sdUJBQXVCO2dCQUM3Q0ssUUFBUTtnQkFDUkMsU0FBUztvQkFDUCxnQkFBZ0I7Z0JBQ2xCO2dCQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQUNOLElBQUlBO2dCQUFFO1lBQzlCO1lBQ0EsSUFBSUosSUFBSVcsRUFBRSxFQUFFO2dCQUNWQyxPQUFPQyxLQUFLLENBQUM7WUFDZixPQUFPO2dCQUNMRCxPQUFPQyxLQUFLLENBQUM7WUFDZjtRQUNGO1FBQ0FSO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ1M7UUFBS0MsV0FBVTs7MEJBQ2QsOERBQUNDO2dCQUFHRCxXQUFZOzBCQUFzQjs7Ozs7OzBCQUN0Qyw4REFBQ0U7Z0JBQUlGLFdBQVk7MEJBQ2hCcEIsV0FDQ0gsVUFBVTBCLEdBQUcsQ0FBQyxDQUFDQyxVQUFlQztvQkFDNUIscUJBQ0UsOERBQUNsQyxxRUFBUUE7d0JBQUNpQixjQUFnQkE7d0JBQWNrQixVQUFZO3dCQUFPakIsSUFBSWUsU0FBU2YsRUFBRTt3QkFBRWtCLE9BQU9ILFNBQVNHLEtBQUs7d0JBQUVDLGFBQWFKLFNBQVNJLFdBQVc7d0JBQUVDLE9BQU9MLFNBQVNLLEtBQUs7Ozs7OztnQkFFL0o7Ozs7Ozs7Ozs7OztBQUtSO0dBcER3QmpDOztRQUVVSix1REFBVUE7UUFDM0JDLHNEQUFTQTs7O0tBSEZHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9wYWdlLnRzeD83NjAzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5pbXBvcnQgTm90ZWJvb2sgZnJvbSBcIkAvY29tcG9uZW50cy9ub3RlYm9vay9Ob3RlYm9va1wiO1xuaW1wb3J0IHsgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW25vdGVib29rcywgc2V0Tm90ZWJvb2tzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3Qge2RhdGE6IHNlc3Npb24sIHN0YXR1c30gPSB1c2VTZXNzaW9uKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHN0YXR1cyA9PSAndW5hdXRoZW50aWNhdGVkJykge1xuICAgICAgcm91dGVyLnB1c2goJy9hcGkvYXV0aC9zaWduaW4nKTtcbiAgICB9XG59LCBbc3RhdHVzXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoTm90ZWJvb2tzKCkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvdXNlci9ub3RlYm9va3MnKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgc2V0Tm90ZWJvb2tzKGRhdGEpO1xuICAgIH1cbiAgICBmZXRjaE5vdGVib29rcygpO1xuICB9LCBbbm90ZWJvb2tzXSlcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSAgKGlkOiBudW1iZXIpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVOb3RlYm9vaygpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL3VzZXIvbm90ZWJvb2tzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2lkOiBpZH0pLFxuICAgICAgfSlcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KCdOb3RlYm9vayBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KCdGYWlsZWQgdG8gZGVsZXRlIG5vdGVib29rJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZU5vdGVib29rKCk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXggbWluLWgtc2NyZWVuIGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC00IGJnLWJsYWNrXCI+XG4gICAgICA8aDEgY2xhc3NOYW1lID0gXCJ0ZXh0LTR4bCB0ZXh0LXdoaXRlXCI+TXkgTm90ZWJvb2tzPC9oMT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lID0gXCJncmlkIHNtOmdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIG1kOmdyaWQtY29scy0yIGdhcC0yMCBtdC01XCI+XG4gICAgICB7c2Vzc2lvbiAmJiBcbiAgICAgICAgbm90ZWJvb2tzLm1hcCgobm90ZWJvb2s6IGFueSwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE5vdGVib29rIGhhbmRsZURlbGV0ZSA9IHtoYW5kbGVEZWxldGV9IGVkaXRNb2RlID0ge2ZhbHNlfSBpZD17bm90ZWJvb2suaWR9IHRpdGxlPXtub3RlYm9vay50aXRsZX0gZGVzY3JpcHRpb249e25vdGVib29rLmRlc2NyaXB0aW9ufSBpbWFnZT17bm90ZWJvb2suaW1hZ2V9IC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIk5vdGVib29rIiwidXNlU2Vzc2lvbiIsInVzZVJvdXRlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiSG9tZSIsIm5vdGVib29rcyIsInNldE5vdGVib29rcyIsImRhdGEiLCJzZXNzaW9uIiwic3RhdHVzIiwicm91dGVyIiwicHVzaCIsImZldGNoTm90ZWJvb2tzIiwicmVzIiwiZmV0Y2giLCJqc29uIiwiaGFuZGxlRGVsZXRlIiwiaWQiLCJkZWxldGVOb3RlYm9vayIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwid2luZG93IiwiYWxlcnQiLCJtYWluIiwiY2xhc3NOYW1lIiwiaDEiLCJkaXYiLCJtYXAiLCJub3RlYm9vayIsImluZGV4IiwiZWRpdE1vZGUiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.tsx\n"));

/***/ })

});