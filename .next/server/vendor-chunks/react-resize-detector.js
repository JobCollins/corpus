"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-resize-detector";
exports.ids = ["vendor-chunks/react-resize-detector"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-resize-detector/build/index.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-resize-detector/build/index.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useResizeDetector: () => (/* binding */ useResizeDetector)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/debounce */ \"(ssr)/./node_modules/lodash/debounce.js\");\n/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/throttle */ \"(ssr)/./node_modules/lodash/throttle.js\");\n/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_2__);\n/**\n * Wraps the resize callback with a lodash debounce / throttle based on the refresh mode\n */\nconst patchResizeCallback = (resizeCallback, refreshMode, refreshRate, refreshOptions) => {\n    switch (refreshMode) {\n        case 'debounce':\n            return lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(resizeCallback, refreshRate, refreshOptions);\n        case 'throttle':\n            return lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default()(resizeCallback, refreshRate, refreshOptions);\n        default:\n            return resizeCallback;\n    }\n};\n/**\n * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a\n * prop or avoid re-executing effects when passed as a dependency\n */\nconst useCallbackRef = \n// eslint-disable-next-line @typescript-eslint/no-explicit-any\n(callback) => {\n    const callbackRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(callback);\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {\n        callbackRef.current = callback;\n    });\n    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ((...args) => { var _a; return (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, ...args); }), []);\n};\n/** `useRef` hook doesn't handle conditional rendering or dynamic ref changes.\n * This hook creates a proxy that ensures that `refElement` is updated whenever the ref is changed. */\nconst useRefProxy = \n// eslint-disable-next-line @typescript-eslint/no-explicit-any\n(targetRef) => {\n    // we are going to use this ref to store the last element that was passed to the hook\n    const [refElement, setRefElement] = react__WEBPACK_IMPORTED_MODULE_0__.useState((targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) || null);\n    // if targetRef is passed, we need to update the refElement\n    // we have to use setTimeout because ref get assigned after the hook is called\n    // in the future releases we are going to remove targetRef and force users to use ref returned by the hook\n    if (targetRef) {\n        setTimeout(() => {\n            if (targetRef.current !== refElement) {\n                setRefElement(targetRef.current);\n            }\n        }, 0);\n    }\n    // this is a memo that will be called every time the ref is changed\n    // This proxy will properly call setState either when the ref is called as a function or when `.current` is set\n    // we call setState inside to trigger rerender\n    const refProxy = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => new Proxy(node => {\n        if (node !== refElement) {\n            setRefElement(node);\n        }\n    }, {\n        get(target, prop) {\n            if (prop === 'current') {\n                return refElement;\n            }\n            return target[prop];\n        },\n        set(target, prop, value) {\n            if (prop === 'current') {\n                setRefElement(value);\n            }\n            else {\n                target[prop] = value;\n            }\n            return true;\n        }\n    }), [refElement]);\n    return { refProxy, refElement, setRefElement };\n};\n/** Calculates the dimensions of the element based on the current box model.\n * @see https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model\n */\nconst getDimensions = (entry, box) => {\n    // Value\t          Border\t  Padding\t  Inner Content\n    // ---------------------------------------------------\n    // 'border-box'\t    Yes\t      Yes\t      Yes\n    // 'content-box'\t  No\t      No\t      Yes\n    //  undefined       No\t      No?\t      Yes\n    if (box === 'border-box') {\n        return {\n            width: entry.borderBoxSize[0].inlineSize,\n            height: entry.borderBoxSize[0].blockSize\n        };\n    }\n    if (box === 'content-box') {\n        return {\n            width: entry.contentBoxSize[0].inlineSize,\n            height: entry.contentBoxSize[0].blockSize\n        };\n    }\n    return {\n        width: entry.contentRect.width,\n        height: entry.contentRect.height\n    };\n};// eslint-disable-next-line @typescript-eslint/no-explicit-any\nfunction useResizeDetector({ skipOnMount = false, refreshMode, refreshRate = 1000, refreshOptions, handleWidth = true, handleHeight = true, targetRef, observerOptions, onResize } = {}) {\n    // If `skipOnMount` is enabled, skip the first resize event\n    const skipResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(skipOnMount);\n    // Wrap the `onResize` callback with a ref to avoid re-renders\n    const onResizeRef = useCallbackRef(onResize);\n    const [size, setSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        width: undefined,\n        height: undefined\n    });\n    // Create a proxy ref to handle conditional rendering and dynamic ref changes of the target element\n    const { refProxy, refElement } = useRefProxy(targetRef);\n    const { box } = observerOptions || {};\n    const resizeCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((entries) => {\n        if (!handleWidth && !handleHeight)\n            return;\n        if (skipResize.current) {\n            skipResize.current = false;\n            return;\n        }\n        // Only update the size if one of the observed dimensions has changed\n        const shouldSetSize = (prevSize, nextSize) => (handleWidth && prevSize.width !== nextSize.width) || (handleHeight && prevSize.height !== nextSize.height);\n        entries.forEach(entry => {\n            const dimensions = getDimensions(entry, box);\n            setSize(prevSize => {\n                if (!shouldSetSize(prevSize, dimensions))\n                    return prevSize;\n                onResizeRef === null || onResizeRef === void 0 ? void 0 : onResizeRef({\n                    width: dimensions.width,\n                    height: dimensions.height,\n                    entry\n                });\n                return dimensions;\n            });\n        });\n    }, [handleWidth, handleHeight, skipResize, box]);\n    // Throttle/Debounce the resize event if refreshMode is configured\n    const resizeHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(patchResizeCallback(resizeCallback, refreshMode, refreshRate, refreshOptions), [\n        resizeCallback,\n        refreshMode,\n        refreshRate,\n        refreshOptions\n    ]);\n    // Attach ResizeObserver to the element\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        let resizeObserver;\n        if (refElement) {\n            resizeObserver = new window.ResizeObserver(resizeHandler);\n            resizeObserver.observe(refElement, observerOptions);\n        }\n        // If refElement is not available, reset the size\n        else if (size.width || size.height) {\n            onResizeRef === null || onResizeRef === void 0 ? void 0 : onResizeRef({\n                width: null,\n                height: null,\n                entry: null\n            });\n            setSize({ width: undefined, height: undefined });\n        }\n        // Disconnect the ResizeObserver when the component is unmounted\n        return () => {\n            var _a, _b, _c;\n            (_a = resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect) === null || _a === void 0 ? void 0 : _a.call(resizeObserver);\n            (_c = (_b = resizeHandler).cancel) === null || _c === void 0 ? void 0 : _c.call(_b);\n        };\n    }, [resizeHandler, refElement]);\n    return Object.assign({ ref: refProxy }, size);\n}//# sourceMappingURL=index.esm.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVzaXplLWRldGVjdG9yL2J1aWxkL2luZGV4LmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtLO0FBQ2xLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQVE7QUFDM0I7QUFDQSxtQkFBbUIsc0RBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5Q0FBWTtBQUNwQyxJQUFJLDRDQUFlO0FBQ25CO0FBQ0EsS0FBSztBQUNMLFdBQVcsMENBQWEsdUJBQXVCLFFBQVEsdUdBQXVHO0FBQzlKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLDJDQUFjO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMENBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLDZCQUE2QixzSkFBc0osSUFBSTtBQUN2TDtBQUNBLHVCQUF1Qiw2Q0FBTTtBQUM3QjtBQUNBO0FBQ0EsNEJBQTRCLCtDQUFRO0FBQ3BDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQyxZQUFZLE1BQU07QUFDbEIsMkJBQTJCLGtEQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLDBCQUEwQixrREFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixzQkFBc0IscUNBQXFDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDJCQUEyQixlQUFlO0FBQzFDLENBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29ycHVzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlc2l6ZS1kZXRlY3Rvci9idWlsZC9pbmRleC5lc20uanM/OTFjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQqYXMgUmVhY3QgZnJvbSdyZWFjdCc7aW1wb3J0IHt1c2VSZWYsdXNlU3RhdGUsdXNlQ2FsbGJhY2ssdXNlRWZmZWN0fWZyb20ncmVhY3QnO2ltcG9ydCBkZWJvdW5jZSBmcm9tJ2xvZGFzaC9kZWJvdW5jZSc7aW1wb3J0IHRocm90dGxlIGZyb20nbG9kYXNoL3Rocm90dGxlJzsvKipcbiAqIFdyYXBzIHRoZSByZXNpemUgY2FsbGJhY2sgd2l0aCBhIGxvZGFzaCBkZWJvdW5jZSAvIHRocm90dGxlIGJhc2VkIG9uIHRoZSByZWZyZXNoIG1vZGVcbiAqL1xuY29uc3QgcGF0Y2hSZXNpemVDYWxsYmFjayA9IChyZXNpemVDYWxsYmFjaywgcmVmcmVzaE1vZGUsIHJlZnJlc2hSYXRlLCByZWZyZXNoT3B0aW9ucykgPT4ge1xuICAgIHN3aXRjaCAocmVmcmVzaE1vZGUpIHtcbiAgICAgICAgY2FzZSAnZGVib3VuY2UnOlxuICAgICAgICAgICAgcmV0dXJuIGRlYm91bmNlKHJlc2l6ZUNhbGxiYWNrLCByZWZyZXNoUmF0ZSwgcmVmcmVzaE9wdGlvbnMpO1xuICAgICAgICBjYXNlICd0aHJvdHRsZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhyb3R0bGUocmVzaXplQ2FsbGJhY2ssIHJlZnJlc2hSYXRlLCByZWZyZXNoT3B0aW9ucyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gcmVzaXplQ2FsbGJhY2s7XG4gICAgfVxufTtcbi8qKlxuICogQSBjdXN0b20gaG9vayB0aGF0IGNvbnZlcnRzIGEgY2FsbGJhY2sgdG8gYSByZWYgdG8gYXZvaWQgdHJpZ2dlcmluZyByZS1yZW5kZXJzIHdoZW4gcGFzc2VkIGFzIGFcbiAqIHByb3Agb3IgYXZvaWQgcmUtZXhlY3V0aW5nIGVmZmVjdHMgd2hlbiBwYXNzZWQgYXMgYSBkZXBlbmRlbmN5XG4gKi9cbmNvbnN0IHVzZUNhbGxiYWNrUmVmID0gXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2tSZWYgPSBSZWFjdC51c2VSZWYoY2FsbGJhY2spO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrUmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoKC4uLmFyZ3MpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gY2FsbGJhY2tSZWYuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwoY2FsbGJhY2tSZWYsIC4uLmFyZ3MpOyB9KSwgW10pO1xufTtcbi8qKiBgdXNlUmVmYCBob29rIGRvZXNuJ3QgaGFuZGxlIGNvbmRpdGlvbmFsIHJlbmRlcmluZyBvciBkeW5hbWljIHJlZiBjaGFuZ2VzLlxuICogVGhpcyBob29rIGNyZWF0ZXMgYSBwcm94eSB0aGF0IGVuc3VyZXMgdGhhdCBgcmVmRWxlbWVudGAgaXMgdXBkYXRlZCB3aGVuZXZlciB0aGUgcmVmIGlzIGNoYW5nZWQuICovXG5jb25zdCB1c2VSZWZQcm94eSA9IFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbih0YXJnZXRSZWYpID0+IHtcbiAgICAvLyB3ZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgcmVmIHRvIHN0b3JlIHRoZSBsYXN0IGVsZW1lbnQgdGhhdCB3YXMgcGFzc2VkIHRvIHRoZSBob29rXG4gICAgY29uc3QgW3JlZkVsZW1lbnQsIHNldFJlZkVsZW1lbnRdID0gUmVhY3QudXNlU3RhdGUoKHRhcmdldFJlZiA9PT0gbnVsbCB8fCB0YXJnZXRSZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldFJlZi5jdXJyZW50KSB8fCBudWxsKTtcbiAgICAvLyBpZiB0YXJnZXRSZWYgaXMgcGFzc2VkLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgcmVmRWxlbWVudFxuICAgIC8vIHdlIGhhdmUgdG8gdXNlIHNldFRpbWVvdXQgYmVjYXVzZSByZWYgZ2V0IGFzc2lnbmVkIGFmdGVyIHRoZSBob29rIGlzIGNhbGxlZFxuICAgIC8vIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMgd2UgYXJlIGdvaW5nIHRvIHJlbW92ZSB0YXJnZXRSZWYgYW5kIGZvcmNlIHVzZXJzIHRvIHVzZSByZWYgcmV0dXJuZWQgYnkgdGhlIGhvb2tcbiAgICBpZiAodGFyZ2V0UmVmKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhcmdldFJlZi5jdXJyZW50ICE9PSByZWZFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2V0UmVmRWxlbWVudCh0YXJnZXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cbiAgICAvLyB0aGlzIGlzIGEgbWVtbyB0aGF0IHdpbGwgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIHJlZiBpcyBjaGFuZ2VkXG4gICAgLy8gVGhpcyBwcm94eSB3aWxsIHByb3Blcmx5IGNhbGwgc2V0U3RhdGUgZWl0aGVyIHdoZW4gdGhlIHJlZiBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiBvciB3aGVuIGAuY3VycmVudGAgaXMgc2V0XG4gICAgLy8gd2UgY2FsbCBzZXRTdGF0ZSBpbnNpZGUgdG8gdHJpZ2dlciByZXJlbmRlclxuICAgIGNvbnN0IHJlZlByb3h5ID0gUmVhY3QudXNlTWVtbygoKSA9PiBuZXcgUHJveHkobm9kZSA9PiB7XG4gICAgICAgIGlmIChub2RlICE9PSByZWZFbGVtZW50KSB7XG4gICAgICAgICAgICBzZXRSZWZFbGVtZW50KG5vZGUpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBnZXQodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZkVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdjdXJyZW50Jykge1xuICAgICAgICAgICAgICAgIHNldFJlZkVsZW1lbnQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pLCBbcmVmRWxlbWVudF0pO1xuICAgIHJldHVybiB7IHJlZlByb3h5LCByZWZFbGVtZW50LCBzZXRSZWZFbGVtZW50IH07XG59O1xuLyoqIENhbGN1bGF0ZXMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGVsZW1lbnQgYmFzZWQgb24gdGhlIGN1cnJlbnQgYm94IG1vZGVsLlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0xlYXJuL0NTUy9CdWlsZGluZ19ibG9ja3MvVGhlX2JveF9tb2RlbFxuICovXG5jb25zdCBnZXREaW1lbnNpb25zID0gKGVudHJ5LCBib3gpID0+IHtcbiAgICAvLyBWYWx1ZVx0ICAgICAgICAgIEJvcmRlclx0ICBQYWRkaW5nXHQgIElubmVyIENvbnRlbnRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAnYm9yZGVyLWJveCdcdCAgICBZZXNcdCAgICAgIFllc1x0ICAgICAgWWVzXG4gICAgLy8gJ2NvbnRlbnQtYm94J1x0ICBOb1x0ICAgICAgTm9cdCAgICAgIFllc1xuICAgIC8vICB1bmRlZmluZWQgICAgICAgTm9cdCAgICAgIE5vP1x0ICAgICAgWWVzXG4gICAgaWYgKGJveCA9PT0gJ2JvcmRlci1ib3gnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogZW50cnkuYm9yZGVyQm94U2l6ZVswXS5pbmxpbmVTaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbnRyeS5ib3JkZXJCb3hTaXplWzBdLmJsb2NrU2l6ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoYm94ID09PSAnY29udGVudC1ib3gnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogZW50cnkuY29udGVudEJveFNpemVbMF0uaW5saW5lU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogZW50cnkuY29udGVudEJveFNpemVbMF0uYmxvY2tTaXplXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBlbnRyeS5jb250ZW50UmVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBlbnRyeS5jb250ZW50UmVjdC5oZWlnaHRcbiAgICB9O1xufTsvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gdXNlUmVzaXplRGV0ZWN0b3IoeyBza2lwT25Nb3VudCA9IGZhbHNlLCByZWZyZXNoTW9kZSwgcmVmcmVzaFJhdGUgPSAxMDAwLCByZWZyZXNoT3B0aW9ucywgaGFuZGxlV2lkdGggPSB0cnVlLCBoYW5kbGVIZWlnaHQgPSB0cnVlLCB0YXJnZXRSZWYsIG9ic2VydmVyT3B0aW9ucywgb25SZXNpemUgfSA9IHt9KSB7XG4gICAgLy8gSWYgYHNraXBPbk1vdW50YCBpcyBlbmFibGVkLCBza2lwIHRoZSBmaXJzdCByZXNpemUgZXZlbnRcbiAgICBjb25zdCBza2lwUmVzaXplID0gdXNlUmVmKHNraXBPbk1vdW50KTtcbiAgICAvLyBXcmFwIHRoZSBgb25SZXNpemVgIGNhbGxiYWNrIHdpdGggYSByZWYgdG8gYXZvaWQgcmUtcmVuZGVyc1xuICAgIGNvbnN0IG9uUmVzaXplUmVmID0gdXNlQ2FsbGJhY2tSZWYob25SZXNpemUpO1xuICAgIGNvbnN0IFtzaXplLCBzZXRTaXplXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgd2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVpZ2h0OiB1bmRlZmluZWRcbiAgICB9KTtcbiAgICAvLyBDcmVhdGUgYSBwcm94eSByZWYgdG8gaGFuZGxlIGNvbmRpdGlvbmFsIHJlbmRlcmluZyBhbmQgZHluYW1pYyByZWYgY2hhbmdlcyBvZiB0aGUgdGFyZ2V0IGVsZW1lbnRcbiAgICBjb25zdCB7IHJlZlByb3h5LCByZWZFbGVtZW50IH0gPSB1c2VSZWZQcm94eSh0YXJnZXRSZWYpO1xuICAgIGNvbnN0IHsgYm94IH0gPSBvYnNlcnZlck9wdGlvbnMgfHwge307XG4gICAgY29uc3QgcmVzaXplQ2FsbGJhY2sgPSB1c2VDYWxsYmFjaygoZW50cmllcykgPT4ge1xuICAgICAgICBpZiAoIWhhbmRsZVdpZHRoICYmICFoYW5kbGVIZWlnaHQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChza2lwUmVzaXplLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHNraXBSZXNpemUuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9ubHkgdXBkYXRlIHRoZSBzaXplIGlmIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZGltZW5zaW9ucyBoYXMgY2hhbmdlZFxuICAgICAgICBjb25zdCBzaG91bGRTZXRTaXplID0gKHByZXZTaXplLCBuZXh0U2l6ZSkgPT4gKGhhbmRsZVdpZHRoICYmIHByZXZTaXplLndpZHRoICE9PSBuZXh0U2l6ZS53aWR0aCkgfHwgKGhhbmRsZUhlaWdodCAmJiBwcmV2U2l6ZS5oZWlnaHQgIT09IG5leHRTaXplLmhlaWdodCk7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZ2V0RGltZW5zaW9ucyhlbnRyeSwgYm94KTtcbiAgICAgICAgICAgIHNldFNpemUocHJldlNpemUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc2hvdWxkU2V0U2l6ZShwcmV2U2l6ZSwgZGltZW5zaW9ucykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2U2l6ZTtcbiAgICAgICAgICAgICAgICBvblJlc2l6ZVJlZiA9PT0gbnVsbCB8fCBvblJlc2l6ZVJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25SZXNpemVSZWYoe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogZGltZW5zaW9ucy53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZW50cnlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LCBbaGFuZGxlV2lkdGgsIGhhbmRsZUhlaWdodCwgc2tpcFJlc2l6ZSwgYm94XSk7XG4gICAgLy8gVGhyb3R0bGUvRGVib3VuY2UgdGhlIHJlc2l6ZSBldmVudCBpZiByZWZyZXNoTW9kZSBpcyBjb25maWd1cmVkXG4gICAgY29uc3QgcmVzaXplSGFuZGxlciA9IHVzZUNhbGxiYWNrKHBhdGNoUmVzaXplQ2FsbGJhY2socmVzaXplQ2FsbGJhY2ssIHJlZnJlc2hNb2RlLCByZWZyZXNoUmF0ZSwgcmVmcmVzaE9wdGlvbnMpLCBbXG4gICAgICAgIHJlc2l6ZUNhbGxiYWNrLFxuICAgICAgICByZWZyZXNoTW9kZSxcbiAgICAgICAgcmVmcmVzaFJhdGUsXG4gICAgICAgIHJlZnJlc2hPcHRpb25zXG4gICAgXSk7XG4gICAgLy8gQXR0YWNoIFJlc2l6ZU9ic2VydmVyIHRvIHRoZSBlbGVtZW50XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbGV0IHJlc2l6ZU9ic2VydmVyO1xuICAgICAgICBpZiAocmVmRWxlbWVudCkge1xuICAgICAgICAgICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgd2luZG93LlJlc2l6ZU9ic2VydmVyKHJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZWZFbGVtZW50LCBvYnNlcnZlck9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHJlZkVsZW1lbnQgaXMgbm90IGF2YWlsYWJsZSwgcmVzZXQgdGhlIHNpemVcbiAgICAgICAgZWxzZSBpZiAoc2l6ZS53aWR0aCB8fCBzaXplLmhlaWdodCkge1xuICAgICAgICAgICAgb25SZXNpemVSZWYgPT09IG51bGwgfHwgb25SZXNpemVSZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uUmVzaXplUmVmKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZW50cnk6IG51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U2l6ZSh7IHdpZHRoOiB1bmRlZmluZWQsIGhlaWdodDogdW5kZWZpbmVkIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIERpc2Nvbm5lY3QgdGhlIFJlc2l6ZU9ic2VydmVyIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB1bm1vdW50ZWRcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgKF9hID0gcmVzaXplT2JzZXJ2ZXIgPT09IG51bGwgfHwgcmVzaXplT2JzZXJ2ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHJlc2l6ZU9ic2VydmVyKTtcbiAgICAgICAgICAgIChfYyA9IChfYiA9IHJlc2l6ZUhhbmRsZXIpLmNhbmNlbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNhbGwoX2IpO1xuICAgICAgICB9O1xuICAgIH0sIFtyZXNpemVIYW5kbGVyLCByZWZFbGVtZW50XSk7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyByZWY6IHJlZlByb3h5IH0sIHNpemUpO1xufWV4cG9ydHt1c2VSZXNpemVEZXRlY3Rvcn07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXNtLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-resize-detector/build/index.esm.js\n");

/***/ })

};
;