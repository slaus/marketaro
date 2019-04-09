"use strict";

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i), n && t(e, n), e
        }
    }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
! function(t) {
    function e(t) {
        if (void 0 === Function.prototype.name) {
            var e = /function\s([^(]{1,})\(/,
                i = e.exec(t.toString());
            return i && i.length > 1 ? i[1].trim() : ""
        }
        return void 0 === t.prototype ? t.constructor.name : t.prototype.constructor.name
    }

    function i(t) {
        return "true" === t || "false" !== t && (isNaN(1 * t) ? t : parseFloat(t))
    }

    function n(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }
    var o = "6.3.1",
        s = {
            version: o,
            _plugins: {},
            _uuids: [],
            rtl: function() {
                return "rtl" === t("html").attr("dir")
            },
            plugin: function(t, i) {
                var o = i || e(t),
                    s = n(o);
                this._plugins[s] = this[o] = t
            },
            registerPlugin: function(t, i) {
                var o = i ? n(i) : e(t.constructor).toLowerCase();
                t.uuid = this.GetYoDigits(6, o), t.$element.attr("data-" + o) || t.$element.attr("data-" + o, t.uuid), t.$element.data("zfPlugin") || t.$element.data("zfPlugin", t), t.$element.trigger("init.zf." + o), this._uuids.push(t.uuid)
            },
            unregisterPlugin: function(t) {
                var i = n(e(t.$element.data("zfPlugin").constructor));
                this._uuids.splice(this._uuids.indexOf(t.uuid), 1), t.$element.removeAttr("data-" + i).removeData("zfPlugin").trigger("destroyed.zf." + i);
                for (var o in t) t[o] = null
            },
            reInit: function(e) {
                var i = e instanceof t;
                try {
                    if (i) e.each(function() {
                        t(this).data("zfPlugin")._init()
                    });
                    else {
                        var o = "undefined" == typeof e ? "undefined" : _typeof(e),
                            s = this,
                            a = {
                                object: function(e) {
                                    e.forEach(function(e) {
                                        e = n(e), t("[data-" + e + "]").foundation("_init")
                                    })
                                },
                                string: function() {
                                    e = n(e), t("[data-" + e + "]").foundation("_init")
                                },
                                undefined: function() {
                                    this.object(Object.keys(s._plugins))
                                }
                            };
                        a[o](e)
                    }
                } catch (r) {
                    console.error(r)
                } finally {
                    return e
                }
            },
            GetYoDigits: function(t, e) {
                return t = t || 6, Math.round(Math.pow(36, t + 1) - Math.random() * Math.pow(36, t)).toString(36).slice(1) + (e ? "-" + e : "")
            },
            reflow: function(e, n) {
                "undefined" == typeof n ? n = Object.keys(this._plugins) : "string" == typeof n && (n = [n]);
                var o = this;
                t.each(n, function(n, s) {
                    var a = o._plugins[s],
                        r = t(e).find("[data-" + s + "]").addBack("[data-" + s + "]");
                    r.each(function() {
                        var e = t(this),
                            n = {};
                        if (e.data("zfPlugin")) return void console.warn("Tried to initialize " + s + " on an element that already has a Foundation plugin.");
                        if (e.attr("data-options")) {
                            e.attr("data-options").split(";").forEach(function(t, e) {
                                var o = t.split(":").map(function(t) {
                                    return t.trim()
                                });
                                o[0] && (n[o[0]] = i(o[1]))
                            })
                        }
                        try {
                            e.data("zfPlugin", new a(t(this), n))
                        } catch (o) {
                            console.error(o)
                        } finally {
                            return
                        }
                    })
                })
            },
            getFnName: e,
            transitionend: function(t) {
                var e, i = {
                        transition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "otransitionend"
                    },
                    n = document.createElement("div");
                for (var o in i) "undefined" != typeof n.style[o] && (e = i[o]);
                return e ? e : (e = setTimeout(function() {
                    t.triggerHandler("transitionend", [t])
                }, 1), "transitionend")
            }
        };
    s.util = {
        throttle: function(t, e) {
            var i = null;
            return function() {
                var n = this,
                    o = arguments;
                null === i && (i = setTimeout(function() {
                    t.apply(n, o), i = null
                }, e))
            }
        }
    };
    var a = function(i) {
        var n = "undefined" == typeof i ? "undefined" : _typeof(i),
            o = t("meta.foundation-mq"),
            a = t(".no-js");
        if (o.length || t('<meta class="foundation-mq">').appendTo(document.head), a.length && a.removeClass("no-js"), "undefined" === n) s.MediaQuery._init(), s.reflow(this);
        else {
            if ("string" !== n) throw new TypeError("We're sorry, " + n + " is not a valid parameter. You must use a string representing the method you wish to invoke.");
            var r = Array.prototype.slice.call(arguments, 1),
                l = this.data("zfPlugin");
            if (void 0 === l || void 0 === l[i]) throw new ReferenceError("We're sorry, '" + i + "' is not an available method for " + (l ? e(l) : "this element") + ".");
            1 === this.length ? l[i].apply(l, r) : this.each(function(e, n) {
                l[i].apply(t(n).data("zfPlugin"), r)
            })
        }
        return this
    };
    window.Foundation = s, t.fn.foundation = a,
        function() {
            Date.now && window.Date.now || (window.Date.now = Date.now = function() {
                return (new Date).getTime()
            });
            for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
                var i = t[e];
                window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var n = 0;
                window.requestAnimationFrame = function(t) {
                    var e = Date.now(),
                        i = Math.max(n + 16, e);
                    return setTimeout(function() {
                        t(n = i)
                    }, i - e)
                }, window.cancelAnimationFrame = clearTimeout
            }
            window.performance && window.performance.now || (window.performance = {
                start: Date.now(),
                now: function() {
                    return Date.now() - this.start
                }
            })
        }(), Function.prototype.bind || (Function.prototype.bind = function(t) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var e = Array.prototype.slice.call(arguments, 1),
                i = this,
                n = function() {},
                o = function() {
                    return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
                };
            return this.prototype && (n.prototype = this.prototype), o.prototype = new n, o
        })
}(jQuery), ! function(t) {
    function e(t, e, n, o) {
        var s, a, r, l, u = i(t);
        if (e) {
            var c = i(e);
            a = u.offset.top + u.height <= c.height + c.offset.top, s = u.offset.top >= c.offset.top, r = u.offset.left >= c.offset.left, l = u.offset.left + u.width <= c.width + c.offset.left
        } else a = u.offset.top + u.height <= u.windowDims.height + u.windowDims.offset.top, s = u.offset.top >= u.windowDims.offset.top, r = u.offset.left >= u.windowDims.offset.left, l = u.offset.left + u.width <= u.windowDims.width;
        var d = [a, s, r, l];
        return n ? r === l == !0 : o ? s === a == !0 : d.indexOf(!1) === -1
    }

    function i(t, e) {
        if (t = t.length ? t[0] : t, t === window || t === document) throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var i = t.getBoundingClientRect(),
            n = t.parentNode.getBoundingClientRect(),
            o = document.body.getBoundingClientRect(),
            s = window.pageYOffset,
            a = window.pageXOffset;
        return {
            width: i.width,
            height: i.height,
            offset: {
                top: i.top + s,
                left: i.left + a
            },
            parentDims: {
                width: n.width,
                height: n.height,
                offset: {
                    top: n.top + s,
                    left: n.left + a
                }
            },
            windowDims: {
                width: o.width,
                height: o.height,
                offset: {
                    top: s,
                    left: a
                }
            }
        }
    }

    function n(t, e, n, o, s, a) {
        var r = i(t),
            l = e ? i(e) : null;
        switch (n) {
            case "top":
                return {
                    left: Foundation.rtl() ? l.offset.left - r.width + l.width : l.offset.left,
                    top: l.offset.top - (r.height + o)
                };
            case "left":
                return {
                    left: l.offset.left - (r.width + s),
                    top: l.offset.top
                };
            case "right":
                return {
                    left: l.offset.left + l.width + s,
                    top: l.offset.top
                };
            case "center top":
                return {
                    left: l.offset.left + l.width / 2 - r.width / 2,
                    top: l.offset.top - (r.height + o)
                };
            case "center bottom":
                return {
                    left: a ? s : l.offset.left + l.width / 2 - r.width / 2,
                    top: l.offset.top + l.height + o
                };
            case "center left":
                return {
                    left: l.offset.left - (r.width + s),
                    top: l.offset.top + l.height / 2 - r.height / 2
                };
            case "center right":
                return {
                    left: l.offset.left + l.width + s + 1,
                    top: l.offset.top + l.height / 2 - r.height / 2
                };
            case "center":
                return {
                    left: r.windowDims.offset.left + r.windowDims.width / 2 - r.width / 2,
                    top: r.windowDims.offset.top + r.windowDims.height / 2 - r.height / 2
                };
            case "reveal":
                return {
                    left: (r.windowDims.width - r.width) / 2,
                    top: r.windowDims.offset.top + o
                };
            case "reveal full":
                return {
                    left: r.windowDims.offset.left,
                    top: r.windowDims.offset.top
                };
            case "left bottom":
                return {
                    left: l.offset.left,
                    top: l.offset.top + l.height + o
                };
            case "right bottom":
                return {
                    left: l.offset.left + l.width + s - r.width,
                    top: l.offset.top + l.height + o
                };
            default:
                return {
                    left: Foundation.rtl() ? l.offset.left - r.width + l.width : l.offset.left + s,
                    top: l.offset.top + l.height + o
                }
        }
    }
    Foundation.Box = {
        ImNotTouchingYou: e,
        GetDimensions: i,
        GetOffsets: n
    }
}(jQuery), ! function(t) {
    function e(t) {
        var e = {};
        for (var i in t) e[t[i]] = t[i];
        return e
    }
    var i = {
            9: "TAB",
            13: "ENTER",
            27: "ESCAPE",
            32: "SPACE",
            37: "ARROW_LEFT",
            38: "ARROW_UP",
            39: "ARROW_RIGHT",
            40: "ARROW_DOWN"
        },
        n = {},
        o = {
            keys: e(i),
            parseKey: function(t) {
                var e = i[t.which || t.keyCode] || String.fromCharCode(t.which).toUpperCase();
                return e = e.replace(/\W+/, ""), t.shiftKey && (e = "SHIFT_" + e), t.ctrlKey && (e = "CTRL_" + e), t.altKey && (e = "ALT_" + e), e = e.replace(/_$/, "")
            },
            handleKey: function(e, i, o) {
                var s, a, r, l = n[i],
                    u = this.parseKey(e);
                if (!l) return console.warn("Component not defined!");
                if (s = "undefined" == typeof l.ltr ? l : Foundation.rtl() ? t.extend({}, l.ltr, l.rtl) : t.extend({}, l.rtl, l.ltr), a = s[u], r = o[a], r && "function" == typeof r) {
                    var c = r.apply();
                    (o.handled || "function" == typeof o.handled) && o.handled(c)
                } else(o.unhandled || "function" == typeof o.unhandled) && o.unhandled()
            },
            findFocusable: function(e) {
                return !!e && e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
                    return !(!t(this).is(":visible") || t(this).attr("tabindex") < 0)
                })
            },
            register: function(t, e) {
                n[t] = e
            },
            trapFocus: function(t) {
                var e = Foundation.Keyboard.findFocusable(t),
                    i = e.eq(0),
                    n = e.eq(-1);
                t.on("keydown.zf.trapfocus", function(t) {
                    t.target === n[0] && "TAB" === Foundation.Keyboard.parseKey(t) ? (t.preventDefault(), i.focus()) : t.target === i[0] && "SHIFT_TAB" === Foundation.Keyboard.parseKey(t) && (t.preventDefault(), n.focus())
                })
            },
            releaseFocus: function(t) {
                t.off("keydown.zf.trapfocus")
            }
        };
    Foundation.Keyboard = o
}(jQuery), ! function(t) {
    function e(t) {
        var e = {};
        return "string" != typeof t ? e : (t = t.trim().slice(1, -1)) ? e = t.split("&").reduce(function(t, e) {
            var i = e.replace(/\+/g, " ").split("="),
                n = i[0],
                o = i[1];
            return n = decodeURIComponent(n), o = void 0 === o ? null : decodeURIComponent(o), t.hasOwnProperty(n) ? Array.isArray(t[n]) ? t[n].push(o) : t[n] = [t[n], o] : t[n] = o, t
        }, {}) : e
    }
    var i = {
        queries: [],
        current: "",
        _init: function() {
            var i, n = this,
                o = t(".foundation-mq").css("font-family");
            i = e(o);
            for (var s in i) i.hasOwnProperty(s) && n.queries.push({
                name: s,
                value: "only screen and (min-width: " + i[s] + ")"
            });
            this.current = this._getCurrentSize(), this._watcher()
        },
        atLeast: function(t) {
            var e = this.get(t);
            return !!e && window.matchMedia(e).matches
        },
        is: function(t) {
            return t = t.trim().split(" "), t.length > 1 && "only" === t[1] ? t[0] === this._getCurrentSize() : this.atLeast(t[0])
        },
        get: function(t) {
            for (var e in this.queries)
                if (this.queries.hasOwnProperty(e)) {
                    var i = this.queries[e];
                    if (t === i.name) return i.value
                }
            return null
        },
        _getCurrentSize: function() {
            for (var t, e = 0; e < this.queries.length; e++) {
                var i = this.queries[e];
                window.matchMedia(i.value).matches && (t = i)
            }
            return "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) ? t.name : t
        },
        _watcher: function() {
            var e = this;
            t(window).on("resize.zf.mediaquery", function() {
                var i = e._getCurrentSize(),
                    n = e.current;
                i !== n && (e.current = i, t(window).trigger("changed.zf.mediaquery", [i, n]))
            })
        }
    };
    Foundation.MediaQuery = i, window.matchMedia || (window.matchMedia = function() {
        var t = window.styleMedia || window.media;
        if (!t) {
            var e = document.createElement("style"),
                i = document.getElementsByTagName("script")[0],
                n = null;
            e.type = "text/css", e.id = "matchmediajs-test", i && i.parentNode && i.parentNode.insertBefore(e, i), n = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, t = {
                matchMedium: function(t) {
                    var i = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                    return e.styleSheet ? e.styleSheet.cssText = i : e.textContent = i, "1px" === n.width
                }
            }
        }
        return function(e) {
            return {
                matches: t.matchMedium(e || "all"),
                media: e || "all"
            }
        }
    }()), Foundation.MediaQuery = i
}(jQuery), ! function(t) {
    function e(t, e, i) {
        function n(r) {
            a || (a = r), s = r - a, i.apply(e), s < t ? o = window.requestAnimationFrame(n, e) : (window.cancelAnimationFrame(o), e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e]))
        }
        var o, s, a = null;
        return 0 === t ? (i.apply(e), void e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e])) : void(o = window.requestAnimationFrame(n))
    }

    function i(e, i, s, a) {
        function r() {
            e || i.hide(), l(), a && a.apply(i)
        }

        function l() {
            i[0].style.transitionDuration = 0, i.removeClass(u + " " + c + " " + s)
        }
        if (i = t(i).eq(0), i.length) {
            var u = e ? n[0] : n[1],
                c = e ? o[0] : o[1];
            l(), i.addClass(s).css("transition", "none"), requestAnimationFrame(function() {
                i.addClass(u), e && i.show()
            }), requestAnimationFrame(function() {
                i[0].offsetWidth, i.css("transition", "").addClass(c)
            }), i.one(Foundation.transitionend(i), r)
        }
    }
    var n = ["mui-enter", "mui-leave"],
        o = ["mui-enter-active", "mui-leave-active"],
        s = {
            animateIn: function(t, e, n) {
                i(!0, t, e, n)
            },
            animateOut: function(t, e, n) {
                i(!1, t, e, n)
            }
        };
    Foundation.Move = e, Foundation.Motion = s
}(jQuery), ! function(t) {
    var e = {
        Feather: function(e) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "zf";
            e.attr("role", "menubar");
            var n = e.find("li").attr({
                    role: "menuitem"
                }),
                o = "is-" + i + "-submenu",
                s = o + "-item",
                a = "is-" + i + "-submenu-parent";
            n.each(function() {
                var e = t(this),
                    n = e.children("ul");
                n.length && (e.addClass(a).attr({
                    "aria-haspopup": !0,
                    "aria-label": e.children("a:first").text()
                }), "drilldown" === i && e.attr({
                    "aria-expanded": !1
                }), n.addClass("submenu " + o).attr({
                    "data-submenu": "",
                    role: "menu"
                }), "drilldown" === i && n.attr({
                    "aria-hidden": !0
                })), e.parent("[data-submenu]").length && e.addClass("is-submenu-item " + s)
            })
        },
        Burn: function(t, e) {
            var i = "is-" + e + "-submenu",
                n = i + "-item",
                o = "is-" + e + "-submenu-parent";
            t.find(">li, .menu, .menu > li").removeClass(i + " " + n + " " + o + " is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "")
        }
    };
    Foundation.Nest = e
}(jQuery), ! function(t) {
    function e(t, e, i) {
        var n, o, s = this,
            a = e.duration,
            r = Object.keys(t.data())[0] || "timer",
            l = -1;
        this.isPaused = !1, this.restart = function() {
            l = -1, clearTimeout(o), this.start()
        }, this.start = function() {
            this.isPaused = !1, clearTimeout(o), l = l <= 0 ? a : l, t.data("paused", !1), n = Date.now(), o = setTimeout(function() {
                e.infinite && s.restart(), i && "function" == typeof i && i()
            }, l), t.trigger("timerstart.zf." + r)
        }, this.pause = function() {
            this.isPaused = !0, clearTimeout(o), t.data("paused", !0);
            var e = Date.now();
            l -= e - n, t.trigger("timerpaused.zf." + r)
        }
    }

    function i(e, i) {
        function n() {
            o--, 0 === o && i()
        }
        var o = e.length;
        0 === o && i(), e.each(function() {
            if (this.complete || 4 === this.readyState || "complete" === this.readyState) n();
            else {
                var e = t(this).attr("src");
                t(this).attr("src", e + (e.indexOf("?") >= 0 ? "&" : "?") + (new Date).getTime()), t(this).one("load", function() {
                    n()
                })
            }
        })
    }
    Foundation.Timer = e, Foundation.onImagesLoaded = i
}(jQuery),
function(t) {
    function e() {
        this.removeEventListener("touchmove", i), this.removeEventListener("touchend", e), u = !1
    }

    function i(i) {
        if (t.spotSwipe.preventDefault && i.preventDefault(), u) {
            var n, o = i.touches[0].pageX,
                a = (i.touches[0].pageY, s - o);
            l = (new Date).getTime() - r, Math.abs(a) >= t.spotSwipe.moveThreshold && l <= t.spotSwipe.timeThreshold && (n = a > 0 ? "left" : "right"), n && (i.preventDefault(), e.call(this), t(this).trigger("swipe", n).trigger("swipe" + n))
        }
    }

    function n(t) {
        1 == t.touches.length && (s = t.touches[0].pageX, a = t.touches[0].pageY, u = !0, r = (new Date).getTime(), this.addEventListener("touchmove", i, !1), this.addEventListener("touchend", e, !1))
    }

    function o() {
        this.addEventListener && this.addEventListener("touchstart", n, !1)
    }
    t.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: !1,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var s, a, r, l, u = !1;
    t.event.special.swipe = {
        setup: o
    }, t.each(["left", "up", "down", "right"], function() {
        t.event.special["swipe" + this] = {
            setup: function() {
                t(this).on("swipe", t.noop)
            }
        }
    })
}(jQuery), ! function(t) {
    t.fn.addTouch = function() {
        this.each(function(i, n) {
            t(n).bind("touchstart touchmove touchend touchcancel", function() {
                e(event)
            })
        });
        var e = function(t) {
            var e, i = t.changedTouches,
                n = i[0],
                o = {
                    touchstart: "mousedown",
                    touchmove: "mousemove",
                    touchend: "mouseup"
                },
                s = o[t.type];
            "MouseEvent" in window && "function" == typeof window.MouseEvent ? e = new window.MouseEvent(s, {
                bubbles: !0,
                cancelable: !0,
                screenX: n.screenX,
                screenY: n.screenY,
                clientX: n.clientX,
                clientY: n.clientY
            }) : (e = document.createEvent("MouseEvent"), e.initMouseEvent(s, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null)), n.target.dispatchEvent(e)
        }
    }
}(jQuery), ! function(t) {
    function e() {
        a(), n(), o(), s(), i()
    }

    function i(e) {
        var i = t("[data-yeti-box]"),
            n = ["dropdown", "tooltip", "reveal"];
        if (e && ("string" == typeof e ? n.push(e) : "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && "string" == typeof e[0] ? n.concat(e) : console.error("Plugin names must be strings")), i.length) {
            var o = n.map(function(t) {
                return "closeme.zf." + t
            }).join(" ");
            t(window).off(o).on(o, function(e, i) {
                var n = e.namespace.split(".")[0],
                    o = t("[data-" + n + "]").not('[data-yeti-box="' + i + '"]');
                o.each(function() {
                    var e = t(this);
                    e.triggerHandler("close.zf.trigger", [e])
                })
            })
        }
    }

    function n(e) {
        var i = void 0,
            n = t("[data-resize]");
        n.length && t(window).off("resize.zf.trigger").on("resize.zf.trigger", function(o) {
            i && clearTimeout(i), i = setTimeout(function() {
                r || n.each(function() {
                    t(this).triggerHandler("resizeme.zf.trigger")
                }), n.attr("data-events", "resize")
            }, e || 10)
        })
    }

    function o(e) {
        var i = void 0,
            n = t("[data-scroll]");
        n.length && t(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function(o) {
            i && clearTimeout(i), i = setTimeout(function() {
                r || n.each(function() {
                    t(this).triggerHandler("scrollme.zf.trigger")
                }), n.attr("data-events", "scroll")
            }, e || 10)
        })
    }

    function s(e) {
        var i = t("[data-mutate]");
        i.length && r && i.each(function() {
            t(this).triggerHandler("mutateme.zf.trigger")
        })
    }

    function a() {
        if (!r) return !1;
        var e = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),
            i = function(e) {
                var i = t(e[0].target);
                switch (e[0].type) {
                    case "attributes":
                        "scroll" === i.attr("data-events") && "data-events" === e[0].attributeName && i.triggerHandler("scrollme.zf.trigger", [i, window.pageYOffset]), "resize" === i.attr("data-events") && "data-events" === e[0].attributeName && i.triggerHandler("resizeme.zf.trigger", [i]), "style" === e[0].attributeName && (i.closest("[data-mutate]").attr("data-events", "mutate"), i.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [i.closest("[data-mutate]")]));
                        break;
                    case "childList":
                        i.closest("[data-mutate]").attr("data-events", "mutate"), i.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [i.closest("[data-mutate]")]);
                        break;
                    default:
                        return !1
                }
            };
        if (e.length)
            for (var n = 0; n <= e.length - 1; n++) {
                var o = new r(i);
                o.observe(e[n], {
                    attributes: !0,
                    childList: !0,
                    characterData: !1,
                    subtree: !0,
                    attributeFilter: ["data-events", "style"]
                })
            }
    }
    var r = function() {
            for (var t = ["WebKit", "Moz", "O", "Ms", ""], e = 0; e < t.length; e++)
                if (t[e] + "MutationObserver" in window) return window[t[e] + "MutationObserver"];
            return !1
        }(),
        l = function(e, i) {
            e.data(i).split(" ").forEach(function(n) {
                t("#" + n)["close" === i ? "trigger" : "triggerHandler"](i + ".zf.trigger", [e])
            })
        };
    t(document).on("click.zf.trigger", "[data-open]", function() {
        l(t(this), "open")
    }), t(document).on("click.zf.trigger", "[data-close]", function() {
        var e = t(this).data("close");
        e ? l(t(this), "close") : t(this).trigger("close.zf.trigger")
    }), t(document).on("click.zf.trigger", "[data-toggle]", function() {
        var e = t(this).data("toggle");
        e ? l(t(this), "toggle") : t(this).trigger("toggle.zf.trigger")
    }), t(document).on("close.zf.trigger", "[data-closable]", function(e) {
        e.stopPropagation();
        var i = t(this).data("closable");
        "" !== i ? Foundation.Motion.animateOut(t(this), i, function() {
            t(this).trigger("closed.zf")
        }) : t(this).fadeOut().trigger("closed.zf")
    }), t(document).on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", function() {
        var e = t(this).data("toggle-focus");
        t("#" + e).triggerHandler("toggle.zf.trigger", [t(this)])
    }), t(window).on("load", function() {
        e()
    }), Foundation.IHearYou = e
}(jQuery), ! function(t) {
    var e = function() {
        function e(i, n) {
            _classCallCheck(this, e), this.$element = i, this.options = t.extend({}, e.defaults, this.$element.data(), n), this._init(), this.calcPoints(), Foundation.registerPlugin(this, "Magellan")
        }
        return _createClass(e, [{
            key: "_init",
            value: function() {
                var e = this.$element[0].id || Foundation.GetYoDigits(6, "magellan");
                this.$targets = t("[data-magellan-target]"), this.$links = this.$element.find("a"), this.$element.attr({
                    "data-resize": e,
                    "data-scroll": e,
                    id: e
                }), this.$active = t(), this.scrollPos = parseInt(window.pageYOffset, 10), this._events()
            }
        }, {
            key: "calcPoints",
            value: function() {
                var e = this,
                    i = document.body,
                    n = document.documentElement;
                this.points = [], this.winHeight = Math.round(Math.max(window.innerHeight, n.clientHeight)), this.docHeight = Math.round(Math.max(i.scrollHeight, i.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight)), this.$targets.each(function() {
                    var i = t(this),
                        n = Math.round(i.offset().top - e.options.threshold);
                    i.targetPoint = n, e.points.push(n)
                })
            }
        }, {
            key: "_events",
            value: function() {
                var e = this;
                t("html, body"), {
                    duration: e.options.animationDuration,
                    easing: e.options.animationEasing
                };
                t(window).one("load", function() {
                    e.options.deepLinking && location.hash && e.scrollToLoc(location.hash), e.calcPoints(), e._updateActive()
                }), this.$element.on({
                    "resizeme.zf.trigger": this.reflow.bind(this),
                    "scrollme.zf.trigger": this._updateActive.bind(this)
                }).on("click.zf.magellan", 'a[href^="#"]', function(t) {
                    t.preventDefault();
                    var i = this.getAttribute("href");
                    e.scrollToLoc(i)
                }), t(window).on("popstate", function(t) {
                    e.options.deepLinking && e.scrollToLoc(window.location.hash)
                })
            }
        }, {
            key: "scrollToLoc",
            value: function(e) {
                if (!t(e).length) return !1;
                this._inTransition = !0;
                var i = this,
                    n = Math.round(t(e).offset().top - this.options.threshold / 2 - this.options.barOffset);
                t("html, body").stop(!0).animate({
                    scrollTop: n
                }, this.options.animationDuration, this.options.animationEasing, function() {
                    i._inTransition = !1, i._updateActive()
                })
            }
        }, {
            key: "reflow",
            value: function() {
                this.calcPoints(), this._updateActive()
            }
        }, {
            key: "_updateActive",
            value: function() {
                if (!this._inTransition) {
                    var t, e = parseInt(window.pageYOffset, 10);
                    if (e + this.winHeight === this.docHeight) t = this.points.length - 1;
                    else if (e < this.points[0]) t = void 0;
                    else {
                        var i = this.scrollPos < e,
                            n = this,
                            o = this.points.filter(function(t, o) {
                                return i ? t - n.options.barOffset <= e : t - n.options.barOffset - n.options.threshold <= e
                            });
                        t = o.length ? o.length - 1 : 0
                    }
                    if (this.$active.removeClass(this.options.activeClass), this.$active = this.$links.filter('[href="#' + this.$targets.eq(t).data("magellan-target") + '"]').addClass(this.options.activeClass), this.options.deepLinking) {
                        var s = "";
                        void 0 != t && (s = this.$active[0].getAttribute("href")), s !== window.location.hash && (window.history.pushState ? window.history.pushState(null, null, s) : window.location.hash = s)
                    }
                    this.scrollPos = e, this.$element.trigger("update.zf.magellan", [this.$active])
                }
            }
        }, {
            key: "destroy",
            value: function() {
                if (this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass), this.options.deepLinking) {
                    var t = this.$active[0].getAttribute("href");
                    window.location.hash.replace(t, "")
                }
                Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: !1,
        barOffset: 0
    }, Foundation.plugin(e, "Magellan")
}(jQuery), ! function(t) {
    var e = function() {
        function e(i, n) {
            _classCallCheck(this, e), this.$element = i, this.options = t.extend({}, e.defaults, this.$element.data(), n), this._init(), Foundation.registerPlugin(this, "Orbit"), Foundation.Keyboard.register("Orbit", {
                ltr: {
                    ARROW_RIGHT: "next",
                    ARROW_LEFT: "previous"
                },
                rtl: {
                    ARROW_LEFT: "next",
                    ARROW_RIGHT: "previous"
                }
            })
        }
        return _createClass(e, [{
            key: "_init",
            value: function() {
                this._reset(), this.$wrapper = this.$element.find("." + this.options.containerClass), this.$slides = this.$element.find("." + this.options.slideClass);
                var t = this.$element.find("img"),
                    e = this.$slides.filter(".is-active"),
                    i = this.$element[0].id || Foundation.GetYoDigits(6, "orbit");
                this.$element.attr({
                    "data-resize": i,
                    id: i
                }), e.length || this.$slides.eq(0).addClass("is-active"), this.options.useMUI || this.$slides.addClass("no-motionui"), t.length ? Foundation.onImagesLoaded(t, this._prepareForOrbit.bind(this)) : this._prepareForOrbit(), this.options.bullets && this._loadBullets(), this._events(), this.options.autoPlay && this.$slides.length > 1 && this.geoSync(), this.options.accessible && this.$wrapper.attr("tabindex", 0)
            }
        }, {
            key: "_loadBullets",
            value: function() {
                this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button")
            }
        }, {
            key: "geoSync",
            value: function() {
                var t = this;
                this.timer = new Foundation.Timer(this.$element, {
                    duration: this.options.timerDelay,
                    infinite: !1
                }, function() {
                    t.changeSlide(!0)
                }), this.timer.start()
            }
        }, {
            key: "_prepareForOrbit",
            value: function() {
                this._setWrapperHeight()
            }
        }, {
            key: "_setWrapperHeight",
            value: function(e) {
                var i, n = 0,
                    o = 0,
                    s = this;
                this.$slides.each(function() {
                    i = this.getBoundingClientRect().height, t(this).attr("data-slide", o), s.$slides.filter(".is-active")[0] !== s.$slides.eq(o)[0] && t(this).css({
                        position: "relative",
                        display: "none"
                    }), n = i > n ? i : n, o++
                }), o === this.$slides.length && (this.$wrapper.css({
                    height: n
                }), e && e(n))
            }
        }, {
            key: "_setSlideHeight",
            value: function(e) {
                this.$slides.each(function() {
                    t(this).css("max-height", e)
                })
            }
        }, {
            key: "_events",
            value: function() {
                var e = this;
                if (this.$element.off(".resizeme.zf.trigger").on({
                        "resizeme.zf.trigger": this._prepareForOrbit.bind(this)
                    }), this.$slides.length > 1) {
                    if (this.options.swipe && this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function(t) {
                            t.preventDefault(), e.changeSlide(!0)
                        }).on("swiperight.zf.orbit", function(t) {
                            t.preventDefault(), e.changeSlide(!1)
                        }), this.options.autoPlay && (this.$slides.on("click.zf.orbit", function() {
                            e.$element.data("clickedOn", !e.$element.data("clickedOn")), e.timer[e.$element.data("clickedOn") ? "pause" : "start"]()
                        }), this.options.pauseOnHover && this.$element.on("mouseenter.zf.orbit", function() {
                            e.timer.pause()
                        }).on("mouseleave.zf.orbit", function() {
                            e.$element.data("clickedOn") || e.timer.start()
                        })), this.options.navButtons) {
                        var i = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass);
                        i.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function(i) {
                            i.preventDefault(), e.changeSlide(t(this).hasClass(e.options.nextClass))
                        })
                    }
                    this.options.bullets && this.$bullets.on("click.zf.orbit touchend.zf.orbit", function() {
                        if (/is-active/g.test(this.className)) return !1;
                        var i = t(this).data("slide"),
                            n = i > e.$slides.filter(".is-active").data("slide"),
                            o = e.$slides.eq(i);
                        e.changeSlide(n, o, i)
                    }), this.options.accessible && this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function(i) {
                        Foundation.Keyboard.handleKey(i, "Orbit", {
                            next: function() {
                                e.changeSlide(!0)
                            },
                            previous: function() {
                                e.changeSlide(!1)
                            },
                            handled: function() {
                                t(i.target).is(e.$bullets) && e.$bullets.filter(".is-active").focus()
                            }
                        })
                    })
                }
            }
        }, {
            key: "_reset",
            value: function() {
                "undefined" != typeof this.$slides && this.$slides.length > 1 && (this.$element.off(".zf.orbit").find("*").off(".zf.orbit"), this.options.autoPlay && this.timer.restart(), this.$slides.each(function(e) {
                    t(e).removeClass("is-active is-active is-in").removeAttr("aria-live").hide()
                }), this.$slides.first().addClass("is-active").show(), this.$element.trigger("slidechange.zf.orbit", [this.$slides.first()]), this.options.bullets && this._updateBullets(0))
            }
        }, {
            key: "changeSlide",
            value: function(t, e, i) {
                if (this.$slides) {
                    var n = this.$slides.filter(".is-active").eq(0);
                    if (/mui/g.test(n[0].className)) return !1;
                    var o, s = this.$slides.first(),
                        a = this.$slides.last(),
                        r = t ? "Right" : "Left",
                        l = t ? "Left" : "Right",
                        u = this;
                    o = e ? e : t ? this.options.infiniteWrap ? n.next("." + this.options.slideClass).length ? n.next("." + this.options.slideClass) : s : n.next("." + this.options.slideClass) : this.options.infiniteWrap ? n.prev("." + this.options.slideClass).length ? n.prev("." + this.options.slideClass) : a : n.prev("." + this.options.slideClass), o.length && (this.$element.trigger("beforeslidechange.zf.orbit", [n, o]), this.options.bullets && (i = i || this.$slides.index(o), this._updateBullets(i)), this.options.useMUI && !this.$element.is(":hidden") ? (Foundation.Motion.animateIn(o.addClass("is-active").css({
                        position: "absolute",
                        top: 0
                    }), this.options["animInFrom" + r], function() {
                        o.css({
                            position: "relative",
                            display: "block"
                        }).attr("aria-live", "polite")
                    }), Foundation.Motion.animateOut(n.removeClass("is-active"), this.options["animOutTo" + l], function() {
                        n.removeAttr("aria-live"), u.options.autoPlay && !u.timer.isPaused && u.timer.restart()
                    })) : (n.removeClass("is-active is-in").removeAttr("aria-live").hide(), o.addClass("is-active is-in").attr("aria-live", "polite").show(), this.options.autoPlay && !this.timer.isPaused && this.timer.restart()), this.$element.trigger("slidechange.zf.orbit", [o]))
                }
            }
        }, {
            key: "_updateBullets",
            value: function(t) {
                var e = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),
                    i = e.find("span:last").detach();
                this.$bullets.eq(t).addClass("is-active").append(i)
            }
        }, {
            key: "destroy",
            value: function() {
                this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {
        bullets: !0,
        navButtons: !0,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: !0,
        timerDelay: 5e3,
        infiniteWrap: !0,
        swipe: !0,
        pauseOnHover: !0,
        accessible: !0,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: !0
    }, Foundation.plugin(e, "Orbit")
}(jQuery), ! function(t) {
    function e() {
        return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
    }

    function i() {
        return /Android/.test(window.navigator.userAgent)
    }

    function n() {
        return e() || i()
    }
    var o = function() {
        function e(i, n) {
            _classCallCheck(this, e), this.$element = i, this.options = t.extend({}, e.defaults, this.$element.data(), n), this._init(), Foundation.registerPlugin(this, "Reveal"), Foundation.Keyboard.register("Reveal", {
                ENTER: "open",
                SPACE: "open",
                ESCAPE: "close"
            })
        }
        return _createClass(e, [{
            key: "_init",
            value: function() {
                this.id = this.$element.attr("id"), this.isActive = !1, this.cached = {
                    mq: Foundation.MediaQuery.current
                }, this.isMobile = n(), this.$anchor = t(t('[data-open="' + this.id + '"]').length ? '[data-open="' + this.id + '"]' : '[data-toggle="' + this.id + '"]'), this.$anchor.attr({
                    "aria-controls": this.id,
                    "aria-haspopup": !0,
                    tabindex: 0
                }), (this.options.fullScreen || this.$element.hasClass("full")) && (this.options.fullScreen = !0, this.options.overlay = !1), this.options.overlay && !this.$overlay && (this.$overlay = this._makeOverlay(this.id)), this.$element.attr({
                    role: "dialog",
                    "aria-hidden": !0,
                    "data-yeti-box": this.id,
                    "data-resize": this.id
                }), this.$overlay ? this.$element.detach().appendTo(this.$overlay) : (this.$element.detach().appendTo(t(this.options.appendTo)), this.$element.addClass("without-overlay")), this._events(), this.options.deepLink && window.location.hash === "#" + this.id && t(window).one("load.zf.reveal", this.open.bind(this))
            }
        }, {
            key: "_makeOverlay",
            value: function() {
                return t("<div></div>").addClass("reveal-overlay").appendTo(this.options.appendTo)
            }
        }, {
            key: "_updatePosition",
            value: function() {
                var e, i, n = this.$element.outerWidth(),
                    o = t(window).width(),
                    s = this.$element.outerHeight(),
                    a = t(window).height();
                e = "auto" === this.options.hOffset ? parseInt((o - n) / 2, 10) : parseInt(this.options.hOffset, 10), i = "auto" === this.options.vOffset ? s > a ? parseInt(Math.min(100, a / 10), 10) : parseInt((a - s) / 4, 10) : parseInt(this.options.vOffset, 10), this.$element.css({
                    top: i + "px"
                }), this.$overlay && "auto" === this.options.hOffset || (this.$element.css({
                    left: e + "px"
                }), this.$element.css({
                    margin: "0px"
                }))
            }
        }, {
            key: "_events",
            value: function() {
                var e = this,
                    i = this;
                this.$element.on({
                    "open.zf.trigger": this.open.bind(this),
                    "close.zf.trigger": function(n, o) {
                        if (n.target === i.$element[0] || t(n.target).parents("[data-closable]")[0] === o) return e.close.apply(e)
                    },
                    "toggle.zf.trigger": this.toggle.bind(this),
                    "resizeme.zf.trigger": function() {
                        i._updatePosition()
                    }
                }), this.$anchor.length && this.$anchor.on("keydown.zf.reveal", function(t) {
                    13 !== t.which && 32 !== t.which || (t.stopPropagation(), t.preventDefault(), i.open())
                }), this.options.closeOnClick && this.options.overlay && this.$overlay.off(".zf.reveal").on("click.zf.reveal", function(e) {
                    e.target !== i.$element[0] && !t.contains(i.$element[0], e.target) && t.contains(document, e.target) && i.close()
                }), this.options.deepLink && t(window).on("popstate.zf.reveal:" + this.id, this._handleState.bind(this))
            }
        }, {
            key: "_handleState",
            value: function(t) {
                window.location.hash !== "#" + this.id || this.isActive ? this.close() : this.open()
            }
        }, {
            key: "open",
            value: function() {
                function e() {
                    o.isMobile ? (o.originalScrollPos || (o.originalScrollPos = window.pageYOffset), t("html, body").addClass("is-reveal-open")) : t("body").addClass("is-reveal-open")
                }
                var i = this;
                if (this.options.deepLink) {
                    var n = "#" + this.id;
                    window.history.pushState ? window.history.pushState(null, null, n) : window.location.hash = n
                }
                this.isActive = !0, this.$element.css({
                        visibility: "hidden"
                    }).show().scrollTop(0), this.options.overlay && this.$overlay.css({
                        visibility: "hidden"
                    }).show(), this._updatePosition(), this.$element.hide().css({
                        visibility: ""
                    }), this.$overlay && (this.$overlay.css({
                        visibility: ""
                    }).hide(), this.$element.hasClass("fast") ? this.$overlay.addClass("fast") : this.$element.hasClass("slow") && this.$overlay.addClass("slow")),
                    this.options.multipleOpened || this.$element.trigger("closeme.zf.reveal", this.id);
                var o = this;
                if (this.options.animationIn) {
                    var s = function() {
                        o.$element.attr({
                            "aria-hidden": !1,
                            tabindex: -1
                        }).focus(), e(), Foundation.Keyboard.trapFocus(o.$element)
                    };
                    this.options.overlay && Foundation.Motion.animateIn(this.$overlay, "fade-in"), Foundation.Motion.animateIn(this.$element, this.options.animationIn, function() {
                        i.$element && (i.focusableElements = Foundation.Keyboard.findFocusable(i.$element), s())
                    })
                } else this.options.overlay && this.$overlay.show(0), this.$element.show(this.options.showDelay);
                this.$element.attr({
                    "aria-hidden": !1,
                    tabindex: -1
                }).focus(), Foundation.Keyboard.trapFocus(this.$element), this.$element.trigger("open.zf.reveal"), e(), setTimeout(function() {
                    i._extraHandlers()
                }, 0)
            }
        }, {
            key: "_extraHandlers",
            value: function() {
                var e = this;
                this.$element && (this.focusableElements = Foundation.Keyboard.findFocusable(this.$element), this.options.overlay || !this.options.closeOnClick || this.options.fullScreen || t("body").on("click.zf.reveal", function(i) {
                    i.target !== e.$element[0] && !t.contains(e.$element[0], i.target) && t.contains(document, i.target) && e.close()
                }), this.options.closeOnEsc && t(window).on("keydown.zf.reveal", function(t) {
                    Foundation.Keyboard.handleKey(t, "Reveal", {
                        close: function() {
                            e.options.closeOnEsc && (e.close(), e.$anchor.focus())
                        }
                    })
                }), this.$element.on("keydown.zf.reveal", function(i) {
                    var n = t(this);
                    Foundation.Keyboard.handleKey(i, "Reveal", {
                        open: function() {
                            e.$element.find(":focus").is(e.$element.find("[data-close]")) ? setTimeout(function() {
                                e.$anchor.focus()
                            }, 1) : n.is(e.focusableElements) && e.open()
                        },
                        close: function() {
                            e.options.closeOnEsc && (e.close(), e.$anchor.focus())
                        },
                        handled: function(t) {
                            t && i.preventDefault()
                        }
                    })
                }))
            }
        }, {
            key: "close",
            value: function() {
                function e() {
                    i.isMobile ? (t("html, body").removeClass("is-reveal-open"), i.originalScrollPos && (t("body").scrollTop(i.originalScrollPos), i.originalScrollPos = null)) : t("body").removeClass("is-reveal-open"), Foundation.Keyboard.releaseFocus(i.$element), i.$element.attr("aria-hidden", !0), i.$element.trigger("closed.zf.reveal")
                }
                if (!this.isActive || !this.$element.is(":visible")) return !1;
                var i = this;
                this.options.animationOut ? (this.options.overlay ? Foundation.Motion.animateOut(this.$overlay, "fade-out", e) : e(), Foundation.Motion.animateOut(this.$element, this.options.animationOut)) : (this.options.overlay ? this.$overlay.hide(0, e) : e(), this.$element.hide(this.options.hideDelay)), this.options.closeOnEsc && t(window).off("keydown.zf.reveal"), !this.options.overlay && this.options.closeOnClick && t("body").off("click.zf.reveal"), this.$element.off("keydown.zf.reveal"), this.options.resetOnClose && this.$element.html(this.$element.html()), this.isActive = !1, i.options.deepLink && (window.history.replaceState ? window.history.replaceState("", document.title, window.location.href.replace("#" + this.id, "")) : window.location.hash = "")
            }
        }, {
            key: "toggle",
            value: function() {
                this.isActive ? this.close() : this.open()
            }
        }, {
            key: "destroy",
            value: function() {
                this.options.overlay && (this.$element.appendTo(t(this.options.appendTo)), this.$overlay.hide().off().remove()), this.$element.hide().off(), this.$anchor.off(".zf"), t(window).off(".zf.reveal:" + this.id), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    o.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: !0,
        closeOnEsc: !0,
        multipleOpened: !1,
        vOffset: "auto",
        hOffset: "auto",
        fullScreen: !1,
        btmOffsetPct: 10,
        overlay: !0,
        resetOnClose: !1,
        deepLink: !1,
        appendTo: "body"
    }, Foundation.plugin(o, "Reveal")
}(jQuery), ! function(t) {
    function e(t) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * t
    }
    var i = function() {
        function i(e, n) {
            _classCallCheck(this, i), this.$element = e, this.options = t.extend({}, i.defaults, this.$element.data(), n), this._init(), Foundation.registerPlugin(this, "Sticky")
        }
        return _createClass(i, [{
            key: "_init",
            value: function() {
                var e = this.$element.parent("[data-sticky-container]"),
                    i = this.$element[0].id || Foundation.GetYoDigits(6, "sticky"),
                    n = this;
                e.length || (this.wasWrapped = !0), this.$container = e.length ? e : t(this.options.container).wrapInner(this.$element), this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({
                    "data-resize": i
                }), this.scrollCount = this.options.checkEvery, this.isStuck = !1, t(window).one("load.zf.sticky", function() {
                    n.containerHeight = "none" == n.$element.css("display") ? 0 : n.$element[0].getBoundingClientRect().height, n.$container.css("height", n.containerHeight), n.elemHeight = n.containerHeight, "" !== n.options.anchor ? n.$anchor = t("#" + n.options.anchor) : n._parsePoints(), n._setSizes(function() {
                        var t = window.pageYOffset;
                        n._calc(!1, t), n.isStuck || n._removeSticky(!(t >= n.topPoint))
                    }), n._events(i.split("-").reverse().join("-"))
                })
            }
        }, {
            key: "_parsePoints",
            value: function() {
                for (var e = "" == this.options.topAnchor ? 1 : this.options.topAnchor, i = "" == this.options.btmAnchor ? document.documentElement.scrollHeight : this.options.btmAnchor, n = [e, i], o = {}, s = 0, a = n.length; s < a && n[s]; s++) {
                    var r;
                    if ("number" == typeof n[s]) r = n[s];
                    else {
                        var l = n[s].split(":"),
                            u = t("#" + l[0]);
                        r = u.offset().top, l[1] && "bottom" === l[1].toLowerCase() && (r += u[0].getBoundingClientRect().height)
                    }
                    o[s] = r
                }
                this.points = o
            }
        }, {
            key: "_events",
            value: function(e) {
                var i = this,
                    n = this.scrollListener = "scroll.zf." + e;
                this.isOn || (this.canStick && (this.isOn = !0, t(window).off(n).on(n, function(t) {
                    0 === i.scrollCount ? (i.scrollCount = i.options.checkEvery, i._setSizes(function() {
                        i._calc(!1, window.pageYOffset)
                    })) : (i.scrollCount--, i._calc(!1, window.pageYOffset))
                })), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function(t, o) {
                    i._setSizes(function() {
                        i._calc(!1), i.canStick ? i.isOn || i._events(e) : i.isOn && i._pauseListeners(n)
                    })
                }))
            }
        }, {
            key: "_pauseListeners",
            value: function(e) {
                this.isOn = !1, t(window).off(e), this.$element.trigger("pause.zf.sticky")
            }
        }, {
            key: "_calc",
            value: function(t, e) {
                return t && this._setSizes(), this.canStick ? (e || (e = window.pageYOffset), void(e >= this.topPoint ? e <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0))) : (this.isStuck && this._removeSticky(!0), !1)
            }
        }, {
            key: "_setSticky",
            value: function() {
                var t = this,
                    e = this.options.stickTo,
                    i = "top" === e ? "marginTop" : "marginBottom",
                    n = "top" === e ? "bottom" : "top",
                    o = {};
                o[i] = this.options[i] + "em", o[e] = 0, o[n] = "auto", this.isStuck = !0, this.$element.removeClass("is-anchored is-at-" + n).addClass("is-stuck is-at-" + e).css(o).trigger("sticky.zf.stuckto:" + e), this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                    t._setSizes()
                })
            }
        }, {
            key: "_removeSticky",
            value: function(t) {
                var e = this.options.stickTo,
                    i = "top" === e,
                    n = {},
                    o = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                    s = i ? "marginTop" : "marginBottom",
                    a = t ? "top" : "bottom";
                n[s] = 0, n.bottom = "auto", t ? n.top = 0 : n.top = o, this.isStuck = !1, this.$element.removeClass("is-stuck is-at-" + e).addClass("is-anchored is-at-" + a).css(n).trigger("sticky.zf.unstuckfrom:" + a)
            }
        }, {
            key: "_setSizes",
            value: function(t) {
                this.canStick = Foundation.MediaQuery.is(this.options.stickyOn), this.canStick || t && "function" == typeof t && t();
                var e = this.$container[0].getBoundingClientRect().width,
                    i = window.getComputedStyle(this.$container[0]),
                    n = parseInt(i["padding-left"], 10),
                    o = parseInt(i["padding-right"], 10);
                this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), this.$element.css({
                    "max-width": e - n - o + "px"
                });
                var s = this.$element[0].getBoundingClientRect().height || this.containerHeight;
                if ("none" == this.$element.css("display") && (s = 0), this.containerHeight = s, this.$container.css({
                        height: s
                    }), this.elemHeight = s, !this.isStuck && this.$element.hasClass("is-at-bottom")) {
                    var a = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                    this.$element.css("top", a)
                }
                this._setBreakPoints(s, function() {
                    t && "function" == typeof t && t()
                })
            }
        }, {
            key: "_setBreakPoints",
            value: function(t, i) {
                if (!this.canStick) {
                    if (!i || "function" != typeof i) return !1;
                    i()
                }
                var n = e(this.options.marginTop),
                    o = e(this.options.marginBottom),
                    s = this.points ? this.points[0] : this.$anchor.offset().top,
                    a = this.points ? this.points[1] : s + this.anchorHeight,
                    r = window.innerHeight;
                "top" === this.options.stickTo ? (s -= n, a -= t + n) : "bottom" === this.options.stickTo && (s -= r - (t + o), a -= r - o), this.topPoint = s, this.bottomPoint = a, i && "function" == typeof i && i()
            }
        }, {
            key: "destroy",
            value: function() {
                this._removeSticky(!0), this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
                    height: "",
                    top: "",
                    bottom: "",
                    "max-width": ""
                }).off("resizeme.zf.trigger"), this.$anchor && this.$anchor.length && this.$anchor.off("change.zf.sticky"), t(window).off(this.scrollListener), this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({
                    height: ""
                }), Foundation.unregisterPlugin(this)
            }
        }]), i
    }();
    i.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    }, Foundation.plugin(i, "Sticky")
}(jQuery), ! function(t) {
    var e = function() {
        function e(i, n) {
            _classCallCheck(this, e), this.$element = i, this.options = t.extend({}, e.defaults, i.data(), n), this.className = "", this._init(), this._events(), Foundation.registerPlugin(this, "Toggler")
        }
        return _createClass(e, [{
            key: "_init",
            value: function() {
                var e;
                this.options.animate ? (e = this.options.animate.split(" "), this.animationIn = e[0], this.animationOut = e[1] || null) : (e = this.$element.data("toggler"), this.className = "." === e[0] ? e.slice(1) : e);
                var i = this.$element[0].id;
                t('[data-open="' + i + '"], [data-close="' + i + '"], [data-toggle="' + i + '"]').attr("aria-controls", i), this.$element.attr("aria-expanded", !this.$element.is(":hidden"))
            }
        }, {
            key: "_events",
            value: function() {
                this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this))
            }
        }, {
            key: "toggle",
            value: function() {
                this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]()
            }
        }, {
            key: "_toggleClass",
            value: function() {
                this.$element.toggleClass(this.className);
                var t = this.$element.hasClass(this.className);
                t ? this.$element.trigger("on.zf.toggler") : this.$element.trigger("off.zf.toggler"), this._updateARIA(t), this.$element.find("[data-mutate]").trigger("mutateme.zf.trigger")
            }
        }, {
            key: "_toggleAnimate",
            value: function() {
                var t = this;
                this.$element.is(":hidden") ? Foundation.Motion.animateIn(this.$element, this.animationIn, function() {
                    t._updateARIA(!0), this.trigger("on.zf.toggler"), this.find("[data-mutate]").trigger("mutateme.zf.trigger")
                }) : Foundation.Motion.animateOut(this.$element, this.animationOut, function() {
                    t._updateARIA(!1), this.trigger("off.zf.toggler"), this.find("[data-mutate]").trigger("mutateme.zf.trigger")
                })
            }
        }, {
            key: "_updateARIA",
            value: function(t) {
                this.$element.attr("aria-expanded", !!t)
            }
        }, {
            key: "destroy",
            value: function() {
                this.$element.off(".zf.toggler"), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {
        animate: !1
    }, Foundation.plugin(e, "Toggler")
}(jQuery), ! function(t) {
    var e = function() {
        function e(i, n) {
            _classCallCheck(this, e), this.$element = i, this.options = t.extend({}, e.defaults, this.$element.data(), n), this.isActive = !1, this.isClick = !1, this._init(), Foundation.registerPlugin(this, "Tooltip")
        }
        return _createClass(e, [{
            key: "_init",
            value: function() {
                var e = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
                this.options.positionClass = this.options.positionClass || this._getPositionClass(this.$element), this.options.tipText = this.options.tipText || this.$element.attr("title"), this.template = this.options.template ? t(this.options.template) : this._buildTemplate(e), this.options.allowHtml ? this.template.appendTo(document.body).html(this.options.tipText).hide() : this.template.appendTo(document.body).text(this.options.tipText).hide(), this.$element.attr({
                    title: "",
                    "aria-describedby": e,
                    "data-yeti-box": e,
                    "data-toggle": e,
                    "data-resize": e
                }).addClass(this.options.triggerClass), this.usedPositions = [], this.counter = 4, this.classChanged = !1, this._events()
            }
        }, {
            key: "_getPositionClass",
            value: function(t) {
                if (!t) return "";
                var e = t[0].className.match(/\b(top|left|right)\b/g);
                return e = e ? e[0] : ""
            }
        }, {
            key: "_buildTemplate",
            value: function(e) {
                var i = (this.options.tooltipClass + " " + this.options.positionClass + " " + this.options.templateClasses).trim(),
                    n = t("<div></div>").addClass(i).attr({
                        role: "tooltip",
                        "aria-hidden": !0,
                        "data-is-active": !1,
                        "data-is-focus": !1,
                        id: e
                    });
                return n
            }
        }, {
            key: "_reposition",
            value: function(t) {
                this.usedPositions.push(t ? t : "bottom"), !t && this.usedPositions.indexOf("top") < 0 ? this.template.addClass("top") : "top" === t && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "left" === t && this.usedPositions.indexOf("right") < 0 ? this.template.removeClass(t).addClass("right") : "right" === t && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : !t && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.addClass("left") : "top" === t && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : "left" === t && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "right" === t && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : this.template.removeClass(t), this.classChanged = !0, this.counter--
            }
        }, {
            key: "_setPosition",
            value: function() {
                var t = this._getPositionClass(this.template),
                    e = Foundation.Box.GetDimensions(this.template),
                    i = Foundation.Box.GetDimensions(this.$element),
                    n = "left" === t ? "left" : "right" === t ? "left" : "top",
                    o = "top" === n ? "height" : "width";
                "height" === o ? this.options.vOffset : this.options.hOffset;
                if (e.width >= e.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) return this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
                    width: i.windowDims.width - 2 * this.options.hOffset,
                    height: "auto"
                }), !1;
                for (this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (t || "bottom"), this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.template) && this.counter;) this._reposition(t), this._setPosition()
            }
        }, {
            key: "show",
            value: function() {
                if ("all" !== this.options.showOn && !Foundation.MediaQuery.is(this.options.showOn)) return !1;
                var t = this;
                this.template.css("visibility", "hidden").show(), this._setPosition(), this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")), this.template.attr({
                    "data-is-active": !0,
                    "aria-hidden": !1
                }), t.isActive = !0, this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {}), this.$element.trigger("show.zf.tooltip")
            }
        }, {
            key: "hide",
            value: function() {
                var t = this;
                this.template.stop().attr({
                    "aria-hidden": !0,
                    "data-is-active": !1
                }).fadeOut(this.options.fadeOutDuration, function() {
                    t.isActive = !1, t.isClick = !1, t.classChanged && (t.template.removeClass(t._getPositionClass(t.template)).addClass(t.options.positionClass), t.usedPositions = [], t.counter = 4, t.classChanged = !1)
                }), this.$element.trigger("hide.zf.tooltip")
            }
        }, {
            key: "_events",
            value: function() {
                var t = this,
                    e = (this.template, !1);
                this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function(e) {
                    t.isActive || (t.timeout = setTimeout(function() {
                        t.show()
                    }, t.options.hoverDelay))
                }).on("mouseleave.zf.tooltip", function(i) {
                    clearTimeout(t.timeout), (!e || t.isClick && !t.options.clickOpen) && t.hide()
                }), this.options.clickOpen ? this.$element.on("mousedown.zf.tooltip", function(e) {
                    e.stopImmediatePropagation(), t.isClick || (t.isClick = !0, !t.options.disableHover && t.$element.attr("tabindex") || t.isActive || t.show())
                }) : this.$element.on("mousedown.zf.tooltip", function(e) {
                    e.stopImmediatePropagation(), t.isClick = !0
                }), this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function(e) {
                    t.isActive ? t.hide() : t.show()
                }), this.$element.on({
                    "close.zf.trigger": this.hide.bind(this)
                }), this.$element.on("focus.zf.tooltip", function(i) {
                    return e = !0, t.isClick ? (t.options.clickOpen || (e = !1), !1) : void t.show()
                }).on("focusout.zf.tooltip", function(i) {
                    e = !1, t.isClick = !1, t.hide()
                }).on("resizeme.zf.trigger", function() {
                    t.isActive && t._setPosition()
                })
            }
        }, {
            key: "toggle",
            value: function() {
                this.isActive ? this.hide() : this.show()
            }
        }, {
            key: "destroy",
            value: function() {
                this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tooltip").removeClass("has-tip top right left").removeAttr("aria-describedby aria-haspopup data-disable-hover data-resize data-toggle data-tooltip data-yeti-box"), this.template.remove(), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        vOffset: 10,
        hOffset: 12,
        allowHtml: !1
    }, Foundation.plugin(e, "Tooltip")
}(jQuery),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = e(require("jquery")) : t.MotionUI = e(t.jQuery)
}(void 0, function(t) {
    function e(e, s, a, r) {
        function l() {
            e || s.hide(), u(), r && r.apply(s)
        }

        function u() {
            s[0].style.transitionDuration = 0, s.removeClass(c + " " + d + " " + a)
        }
        if (s = t(s).eq(0), s.length) {
            if (null === o) return e ? s.show() : s.hide(), void r();
            var c = e ? i[0] : i[1],
                d = e ? n[0] : n[1];
            u(), s.addClass(a), s.css("transition", "none"), requestAnimationFrame(function() {
                s.addClass(c), e && s.show()
            }), requestAnimationFrame(function() {
                s[0].offsetWidth, s.css("transition", ""), s.addClass(d)
            }), s.one("transitionend", l)
        }
    }! function() {
        Date.now || (Date.now = function() {
            return (new Date).getTime()
        });
        for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
            var i = t[e];
            window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var n = 0;
            window.requestAnimationFrame = function(t) {
                var e = Date.now(),
                    i = Math.max(n + 16, e);
                return setTimeout(function() {
                    t(n = i)
                }, i - e)
            }, window.cancelAnimationFrame = clearTimeout
        }
    }();
    var i = ["mui-enter", "mui-leave"],
        n = ["mui-enter-active", "mui-leave-active"],
        o = function() {
            var t = {
                    transition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend"
                },
                e = window.document.createElement("div");
            for (var i in t)
                if ("undefined" != typeof e.style[i]) return t[i];
            return null
        }(),
        s = {
            animateIn: function(t, i, n) {
                e(!0, t, i, n)
            },
            animateOut: function(t, i, n) {
                e(!1, t, i, n)
            }
        };
    return s
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
    var e, i, n, o, s, a, r = "Close",
        l = "BeforeClose",
        u = "AfterClose",
        c = "BeforeAppend",
        d = "MarkupParse",
        f = "Open",
        h = "Change",
        p = "mfp",
        m = "." + p,
        g = "mfp-ready",
        v = "mfp-removing",
        w = "mfp-prevent-close",
        y = function() {},
        b = !!window.jQuery,
        C = t(window),
        k = function(t, i) {
            e.ev.on(p + t + m, i)
        },
        $ = function(e, i, n, o) {
            var s = document.createElement("div");
            return s.className = "mfp-" + e, n && (s.innerHTML = n), o ? i && i.appendChild(s) : (s = t(s), i && s.appendTo(i)), s
        },
        z = function(i, n) {
            e.ev.triggerHandler(p + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
        },
        _ = function(i) {
            return i === a && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), a = i), e.currTemplate.closeBtn
        },
        O = function() {
            t.magnificPopup.instance || (e = new y, e.init(), t.magnificPopup.instance = e)
        },
        T = function() {
            var t = document.createElement("p").style,
                e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition) return !0;
            for (; e.length;)
                if (e.pop() + "Transition" in t) return !0;
            return !1
        };
    y.prototype = {
        constructor: y,
        init: function() {
            var i = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = T(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {}
        },
        open: function(i) {
            var o;
            if (i.isObj === !1) {
                e.items = i.items.toArray(), e.index = 0;
                var a, r = i.items;
                for (o = 0; o < r.length; o++)
                    if (a = r[o], a.parsed && (a = a.el[0]), a === i.el[0]) {
                        e.index = o;
                        break
                    }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
            if (e.isOpen) return void e.updateItemHTML();
            e.types = [], s = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = $("bg").on("click" + m, function() {
                e.close()
            }), e.wrap = $("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                e._checkIfClose(t.target) && e.close()
            }), e.container = $("container", e.wrap)), e.contentContainer = $("content"), e.st.preloader && (e.preloader = $("preloader", e.container, e.st.tLoading));
            var l = t.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var u = l[o];
                u = u.charAt(0).toUpperCase() + u.slice(1), e["init" + u].call(e)
            }
            z("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (k(d, function(t, e, i, n) {
                i.close_replaceWith = _(n.type)
            }), s += " mfp-close-btn-in") : e.wrap.append(_())), e.st.alignTop && (s += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            }) : e.wrap.css({
                top: C.scrollTop(),
                position: "absolute"
            }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: n.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && n.on("keyup" + m, function(t) {
                27 === t.keyCode && e.close()
            }), C.on("resize" + m, function() {
                e.updateSize()
            }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
            var c = e.wH = C.height(),
                h = {};
            if (e.fixedContentPos && e._hasScrollBar(c)) {
                var p = e._getScrollbarSize();
                p && (h.marginRight = p)
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : h.overflow = "hidden");
            var v = e.st.mainClass;
            return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), z("BuildControls"), t("html").css(h), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                e.content ? (e._addClassToMFP(g), e._setFocus()) : e.bgOverlay.addClass(g), n.on("focusin" + m, e._onFocusIn)
            }, 16), e.isOpen = !0, e.updateSize(c), z(f), i
        },
        close: function() {
            e.isOpen && (z(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(v), setTimeout(function() {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function() {
            z(r);
            var i = v + " " + g + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
            }
            n.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, z(u)
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * i;
                e.wrap.css("height", n), e.wH = n
            } else e.wH = t || C.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), z("Resize")
        },
        updateItemHTML: function() {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var n = i.type;
            if (z("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
                var s = !!e.st[n] && e.st[n].markup;
                z("FirstMarkupParse", s), s ? e.currTemplate[n] = t(s) : e.currTemplate[n] = !0
            }
            o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
            var a = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
            e.appendContent(a, n), i.preloaded = !0, z(h, i), o = i.type, e.container.prepend(e.contentContainer), z("AfterChange")
        },
        appendContent: function(t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[i] === !0 ? e.content.find(".mfp-close").length || e.content.append(_()) : e.content = t : e.content = "", z(c), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        },
        parseEl: function(i) {
            var n, o = e.items[i];
            if (o.tagName ? o = {
                    el: t(o)
                } : (n = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var s = e.types, a = 0; a < s.length; a++)
                    if (o.el.hasClass("mfp-" + s[a])) {
                        n = s[a];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = n || e.st.type || "inline", o.index = i, o.parsed = !0, e.items[i] = o, z("ElementParse", o), e.items[i]
        },
        addGroup: function(t, i) {
            var n = function(n) {
                n.mfpEl = this, e._openClick(n, t, i)
            };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t, t.off(o).on(o, n)))
        },
        _openClick: function(i, n, o) {
            var s = void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick;
            if (s || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var a = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (a)
                    if (t.isFunction(a)) {
                        if (!a.call(e)) return !0
                    } else if (C.width() < a) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o)
            }
        },
        updateStatus: function(t, n) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                var o = {
                    status: t,
                    text: n
                };
                z("UpdateStatus", o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        },
        _checkIfClose: function(i) {
            if (!t(i).hasClass(w)) {
                var n = e.st.closeOnContentClick,
                    o = e.st.closeOnBgClick;
                if (n && o) return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n) return !0
                } else if (o && t.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || C.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function(i) {
            if (i.target !== e.wrap[0] && !t.contains(e.wrap[0], i.target)) return e._setFocus(), !1
        },
        _parseMarkup: function(e, i, n) {
            var o;
            n.data && (i = t.extend(n.data, i)), z(d, [e, i, n]), t.each(i, function(i, n) {
                if (void 0 === n || n === !1) return !0;
                if (o = i.split("_"), o.length > 1) {
                    var s = e.find(m + "-" + o[0]);
                    if (s.length > 0) {
                        var a = o[1];
                        "replaceWith" === a ? s[0] !== n[0] && s.replaceWith(n) : "img" === a ? s.is("img") ? s.attr("src", n) : s.replaceWith(t("<img>").attr("src", n).attr("class", s.attr("class"))) : s.attr(o[1], n)
                    }
                } else e.find(m + "-" + i).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: y.prototype,
        modules: [],
        open: function(e, i) {
            return O(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function(i) {
        O();
        var n = t(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var o, s = b ? n.data("magnificPopup") : n[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                s.items ? o = s.items[a] : (o = n, s.delegate && (o = o.find(s.delegate)), o = o.eq(a)), e._openClick({
                    mfpEl: o
                }, n, s)
            } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else i = t.extend(!0, {}, i), b ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
        return n
    };
    var x, F, P, S = "inline",
        I = function() {
            P && (F.after(P.addClass(x)).detach(), P = null)
        };
    t.magnificPopup.registerModule(S, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(S), k(r + "." + S, function() {
                    I()
                })
            },
            getInline: function(i, n) {
                if (I(), i.src) {
                    var o = e.st.inline,
                        s = t(i.src);
                    if (s.length) {
                        var a = s[0].parentNode;
                        a && a.tagName && (F || (x = o.hiddenClass, F = $(x), x = "mfp-" + x), P = s.after(F).detach().removeClass(x)), e.updateStatus("ready")
                    } else e.updateStatus("error", o.tNotFound), s = t("<div>");
                    return i.inlineElement = s, s
                }
                return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n
            }
        }
    });
    var A, E = "ajax",
        M = function() {
            A && t(document.body).removeClass(A)
        },
        H = function() {
            M(), e.req && e.req.abort()
        };
    t.magnificPopup.registerModule(E, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(E), A = e.st.ajax.cursor, k(r + "." + E, H), k("BeforeChange." + E, H)
            },
            getAjax: function(i) {
                A && t(document.body).addClass(A), e.updateStatus("loading");
                var n = t.extend({
                    url: i.src,
                    success: function(n, o, s) {
                        var a = {
                            data: n,
                            xhr: s
                        };
                        z("ParseAjax", a), e.appendContent(t(a.data), E), i.finished = !0, M(), e._setFocus(), setTimeout(function() {
                            e.wrap.addClass(g)
                        }, 16), e.updateStatus("ready"), z("AjaxContentAdded")
                    },
                    error: function() {
                        M(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(n), ""
            }
        }
    });
    var D, B = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = e.st.image.titleSrc;
        if (n) {
            if (t.isFunction(n)) return n.call(e, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = e.st.image,
                    n = ".image";
                e.types.push("image"), k(f + n, function() {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), k(r + n, function() {
                    i.cursor && t(document.body).removeClass(i.cursor), C.off("resize" + m)
                }), k("Resize" + n, e.resizeImage), e.isLowIE && k("AfterChange", e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, D && clearInterval(D), t.isCheckingImgSize = !1, z("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    n = t.img[0],
                    o = function s(o) {
                        D && clearInterval(D), D = setInterval(function() {
                            return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(D), i++, void(3 === i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                        }, o)
                    };
                o(1)
            },
            getImage: function(i, n) {
                var o = 0,
                    s = function c() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, z("ImageLoadComplete")) : (o++, o < 200 ? setTimeout(c, 100) : a()))
                    },
                    a = function() {
                        i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", r.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    r = e.st.image,
                    l = n.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")), i.img = t(u).on("load.mfploader", s).on("error.mfploader", a), u.src = i.src, l.is("img") && (i.img = i.img.clone()), u = i.img[0], u.naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                }
                return e._parseMarkup(n, {
                    title: B(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (D && clearInterval(D), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", r.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n)
            }
        }
    });
    var L, R = function() {
        return void 0 === L && (L = void 0 !== document.createElement("p").style.MozTransform), L
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, i = e.st.zoom,
                    n = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var o, s, a = i.duration,
                        u = function(t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                s = "transition";
                            return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = n, e.css(o), e
                        },
                        c = function() {
                            e.content.css("visibility", "visible")
                        };
                    k("BuildControls" + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void c();
                            s = u(t), s.css(e._getOffset()), e.wrap.append(s), o = setTimeout(function() {
                                s.css(e._getOffset(!0)), o = setTimeout(function() {
                                    c(), setTimeout(function() {
                                        s.remove(), t = s = null, z("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), k(l + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.st.removalDelay = a, !t) {
                                if (t = e._getItemToZoom(), !t) return;
                                s = u(t)
                            }
                            s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function() {
                                s.css(e._getOffset())
                            }, 16)
                        }
                    }), k(r + n, function() {
                        e._allowZoom() && (c(), s && s.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function() {
                return !!e.currItem.hasSize && e.currItem.img
            },
            _getOffset: function(i) {
                var n;
                n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var o = n.offset(),
                    s = parseInt(n.css("padding-top"), 10),
                    a = parseInt(n.css("padding-bottom"), 10);
                o.top -= t(window).scrollTop() - s;
                var r = {
                    width: n.width(),
                    height: (b ? n.innerHeight() : n[0].offsetHeight) - a - s
                };
                return R() ? r["-moz-transform"] = r.transform = "translate(" + o.left + "px," + o.top + "px)" : (r.left = o.left, r.top = o.top), r
            }
        }
    });
    var j = "iframe",
        q = "//about:blank",
        W = function(t) {
            if (e.currTemplate[j]) {
                var i = e.currTemplate[j].find("iframe");
                i.length && (t || (i[0].src = q), e.isIE8 && i.css("display", t ? "block" : "none"))
            }
        };
    t.magnificPopup.registerModule(j, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(j), k("BeforeChange", function(t, e, i) {
                    e !== i && (e === j ? W() : i === j && W(!0))
                }), k(r + "." + j, function() {
                    W()
                })
            },
            getIframe: function(i, n) {
                var o = i.src,
                    s = e.st.iframe;
                t.each(s.patterns, function() {
                    if (o.indexOf(this.index) > -1) return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1
                });
                var a = {};
                return s.srcAction && (a[s.srcAction] = o), e._parseMarkup(n, a, i), e.updateStatus("ready"), n
            }
        }
    });
    var N = function(t) {
            var i = e.items.length;
            return t > i - 1 ? t - i : t < 0 ? i + t : t
        },
        K = function(t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
        };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = e.st.gallery,
                    o = ".mfp-gallery";
                return e.direction = !0, !(!i || !i.enabled) && (s += " mfp-gallery", k(f + o, function() {
                    i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function() {
                        if (e.items.length > 1) return e.next(), !1
                    }), n.on("keydown" + o, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), k("UpdateStatus" + o, function(t, i) {
                    i.text && (i.text = K(i.text, e.currItem.index, e.items.length))
                }), k(d + o, function(t, n, o, s) {
                    var a = e.items.length;
                    o.counter = a > 1 ? K(i.tCounter, s.index, a) : ""
                }), k("BuildControls" + o, function() {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var n = i.arrowMarkup,
                            o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(w),
                            s = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(w);
                        o.click(function() {
                            e.prev()
                        }), s.click(function() {
                            e.next()
                        }), e.container.append(o.add(s))
                    }
                }), k(h + o, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void k(r + o, function() {
                    n.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                }))
            },
            next: function() {
                e.direction = !0, e.index = N(e.index + 1), e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1, e.index = N(e.index - 1), e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, i = e.st.gallery.preload,
                    n = Math.min(i[0], e.items.length),
                    o = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : n); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : o); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function(i) {
                if (i = N(i), !e.items[i].preloaded) {
                    var n = e.items[i];
                    n.parsed || (n = e.parseEl(i)), z("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0, n.loadError = !0, z("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var Y = "retina";
    t.magnificPopup.registerModule(Y, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina,
                        i = t.ratio;
                    i = isNaN(i) ? i() : i, i > 1 && (k("ImageHasSize." + Y, function(t, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }), k("ElementParse." + Y, function(e, n) {
                        n.src = t.replaceSrc(n, i)
                    }))
                }
            }
        }
    }), O()
});