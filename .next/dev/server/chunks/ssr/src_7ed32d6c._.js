module.exports = [
"[project]/src/types/signal.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Signal Types - Core data model for TokenTalks signals
// Aligned with PRD content model: What changed, Why it matters, Who cares, What to do
__turbopack_context__.s([
    "DOMAIN_CONFIG",
    ()=>DOMAIN_CONFIG,
    "SIGNAL_TYPE_CONFIG",
    ()=>SIGNAL_TYPE_CONFIG,
    "SOURCE_CONFIG",
    ()=>SOURCE_CONFIG
]);
const SIGNAL_TYPE_CONFIG = {
    breaking_change: {
        label: 'Breaking Change',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-500/10 border-red-500/20'
    },
    new_capability: {
        label: 'New Capability',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    security_fix: {
        label: 'Security Fix',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-500/10 border-amber-500/20'
    },
    cost_change: {
        label: 'Cost Change',
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-500/10 border-purple-500/20'
    },
    performance: {
        label: 'Performance',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    research: {
        label: 'Research',
        color: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-500/10 border-cyan-500/20'
    }
};
const DOMAIN_CONFIG = {
    ai: {
        label: 'AI',
        color: 'text-violet-500'
    },
    web: {
        label: 'Web',
        color: 'text-orange-500'
    },
    devops: {
        label: 'DevOps',
        color: 'text-teal-500'
    },
    security: {
        label: 'Security',
        color: 'text-red-500'
    },
    cloud: {
        label: 'Cloud',
        color: 'text-sky-500'
    },
    data: {
        label: 'Data',
        color: 'text-emerald-500'
    },
    mobile: {
        label: 'Mobile',
        color: 'text-pink-500'
    }
};
const SOURCE_CONFIG = {
    github: {
        label: 'GitHub',
        icon: '/icons/github.svg'
    },
    hackernews: {
        label: 'Hacker News',
        icon: '/icons/hn.svg'
    },
    arxiv: {
        label: 'arXiv',
        icon: '/icons/arxiv.svg'
    },
    osv: {
        label: 'OSV',
        icon: '/icons/osv.svg'
    },
    manual: {
        label: 'Manual',
        icon: '/icons/manual.svg'
    }
};
}),
"[project]/src/components/feed/SignalCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignalCard",
    ()=>SignalCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-ssr] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark-check.js [app-ssr] (ecmascript) <export default as BookmarkCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/github.js [app-ssr] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$signal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/signal.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// Source icons mapping
const SourceIcon = ({ source })=>{
    const iconClasses = "w-4 h-4 text-muted-foreground";
    switch(source){
        case 'github':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                className: iconClasses
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 21,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0));
        case 'hackernews':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(iconClasses, "flex items-center justify-center font-bold text-[10px] text-orange-500"),
                children: "Y"
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 24,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        case 'arxiv':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(iconClasses, "flex items-center justify-center font-mono text-[10px] text-red-500"),
                children: "arX"
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        case 'osv':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(iconClasses, "flex items-center justify-center font-bold text-[10px] text-amber-500"),
                children: "OSV"
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 36,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                className: iconClasses
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 41,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0));
    }
};
// Source name mapping
const getSourceName = (source)=>{
    const names = {
        github: 'GitHub',
        hackernews: 'Hacker News',
        arxiv: 'arXiv',
        osv: 'OSV',
        manual: 'Manual'
    };
    return names[source];
};
function SignalCard({ signal, onSave }) {
    const typeConfig = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$signal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_TYPE_CONFIG"][signal.signalType];
    const timeAgo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(signal.publishedAt), {
        addSuffix: true
    });
    const hasActions = signal.docsUrl || signal.repoUrl || signal.paperUrl || signal.videoUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].article, {
        initial: {
            opacity: 0,
            y: 12
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: "group bg-card border border-border/60 rounded-xl p-4 hover:border-border hover:shadow-sm transition-all",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-wrap min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border", typeConfig.bgColor, typeConfig.color),
                                children: typeConfig.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, this),
                            signal.domains.slice(0, 2).map((domain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-medium uppercase tracking-wide", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$signal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DOMAIN_CONFIG"][domain].color),
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$signal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DOMAIN_CONFIG"][domain].label
                                }, domain, false, {
                                    fileName: "[project]/src/components/feed/SignalCard.tsx",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-[11px] text-muted-foreground shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceIcon, {
                                        source: signal.source
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium hidden sm:inline",
                                        children: getSourceName(signal.source)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                                        lineNumber: 99,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 97,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: timeAgo
                            }, void 0, false, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 102,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: signal.sourceUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:underline",
                    children: signal.whatChanged
                }, void 0, false, {
                    fileName: "[project]/src/components/feed/SignalCard.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3",
                children: signal.whyItMatters
            }, void 0, false, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2 pt-2 border-t border-border/40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            signal.docsUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: signal.docsUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                                        lineNumber: 129,
                                        columnNumber: 29
                                    }, this),
                                    "Docs"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 123,
                                columnNumber: 25
                            }, this),
                            signal.repoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: signal.repoUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                                        lineNumber: 140,
                                        columnNumber: 29
                                    }, this),
                                    "Repo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 134,
                                columnNumber: 25
                            }, this),
                            signal.paperUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: signal.paperUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                                        lineNumber: 151,
                                        columnNumber: 29
                                    }, this),
                                    "Paper"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 145,
                                columnNumber: 25
                            }, this),
                            signal.videoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: signal.videoUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, this),
                                    "Video"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 156,
                                columnNumber: 25
                            }, this),
                            !hasActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-muted-foreground/50",
                                children: "No additional resources"
                            }, void 0, false, {
                                fileName: "[project]/src/components/feed/SignalCard.tsx",
                                lineNumber: 167,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                        lineNumber: 121,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: ()=>onSave?.(signal.id),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-7 px-2 gap-1 text-[10px]", signal.isSaved && "text-primary"),
                        children: signal.isSaved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkCheck$3e$__["BookmarkCheck"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feed/SignalCard.tsx",
                                    lineNumber: 183,
                                    columnNumber: 29
                                }, this),
                                "Saved"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feed/SignalCard.tsx",
                                    lineNumber: 188,
                                    columnNumber: 29
                                }, this),
                                "Save"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/feed/SignalCard.tsx",
                        lineNumber: 172,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/feed/SignalCard.tsx",
                lineNumber: 119,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feed/SignalCard.tsx",
        lineNumber: 64,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/scroll-area.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function ScrollArea({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "scroll-area",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                "data-slot": "scroll-area-viewport",
                className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/feed/FeedFilters.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedFilters",
    ()=>FeedFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const DOMAIN_OPTIONS = [
    {
        key: 'all',
        label: 'All'
    },
    {
        key: 'ai',
        label: 'AI'
    },
    {
        key: 'web',
        label: 'Web'
    },
    {
        key: 'devops',
        label: 'DevOps'
    },
    {
        key: 'security',
        label: 'Security'
    },
    {
        key: 'cloud',
        label: 'Cloud'
    },
    {
        key: 'data',
        label: 'Data'
    },
    {
        key: 'mobile',
        label: 'Mobile'
    }
];
function FeedFilters({ activeDomain, onDomainChange, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-b border-border/40", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollArea"], {
            className: "w-full whitespace-nowrap",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-max space-x-1.5 px-4 py-2 max-w-2xl mx-auto",
                    children: DOMAIN_OPTIONS.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onDomainChange(key),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border", activeDomain === key ? "bg-foreground text-background border-foreground" : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"),
                            children: label
                        }, key, false, {
                            fileName: "[project]/src/components/feed/FeedFilters.tsx",
                            lineNumber: 31,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/feed/FeedFilters.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollBar"], {
                    orientation: "horizontal",
                    className: "invisible"
                }, void 0, false, {
                    fileName: "[project]/src/components/feed/FeedFilters.tsx",
                    lineNumber: 45,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/feed/FeedFilters.tsx",
            lineNumber: 28,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/feed/FeedFilters.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-accent animate-pulse rounded-md", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/lib/api/signals/github.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// GitHub Releases API Adapter
// Fetches release signals from popular repositories
__turbopack_context__.s([
    "fetchGitHubReleases",
    ()=>fetchGitHubReleases,
    "githubApi",
    ()=>githubApi
]);
// Key repositories to track - organized by domain
const TRACKED_REPOS = [
    // AI/ML
    {
        owner: 'openai',
        repo: 'openai-python',
        domains: [
            'ai'
        ]
    },
    {
        owner: 'langchain-ai',
        repo: 'langchain',
        domains: [
            'ai'
        ]
    },
    {
        owner: 'huggingface',
        repo: 'transformers',
        domains: [
            'ai',
            'data'
        ]
    },
    {
        owner: 'anthropics',
        repo: 'anthropic-sdk-python',
        domains: [
            'ai'
        ]
    },
    // Web/Frontend
    {
        owner: 'vercel',
        repo: 'next.js',
        domains: [
            'web'
        ]
    },
    {
        owner: 'facebook',
        repo: 'react',
        domains: [
            'web'
        ]
    },
    {
        owner: 'sveltejs',
        repo: 'svelte',
        domains: [
            'web'
        ]
    },
    {
        owner: 'vuejs',
        repo: 'core',
        domains: [
            'web'
        ]
    },
    {
        owner: 'tailwindlabs',
        repo: 'tailwindcss',
        domains: [
            'web'
        ]
    },
    // DevOps/Cloud
    {
        owner: 'docker',
        repo: 'cli',
        domains: [
            'devops',
            'cloud'
        ]
    },
    {
        owner: 'kubernetes',
        repo: 'kubernetes',
        domains: [
            'devops',
            'cloud'
        ]
    },
    {
        owner: 'terraform-providers',
        repo: 'terraform-provider-aws',
        domains: [
            'cloud',
            'devops'
        ]
    },
    // Data
    {
        owner: 'apache',
        repo: 'spark',
        domains: [
            'data'
        ]
    },
    {
        owner: 'duckdb',
        repo: 'duckdb',
        domains: [
            'data'
        ]
    },
    // Mobile
    {
        owner: 'flutter',
        repo: 'flutter',
        domains: [
            'mobile'
        ]
    },
    {
        owner: 'facebook',
        repo: 'react-native',
        domains: [
            'mobile',
            'web'
        ]
    }
];
// Detect signal type from release content
function detectSignalType(release) {
    const content = `${release.name} ${release.body}`.toLowerCase();
    if (content.includes('breaking') || content.includes('deprecat') || content.includes('removed')) {
        return 'breaking_change';
    }
    if (content.includes('security') || content.includes('cve') || content.includes('vulnerability')) {
        return 'security_fix';
    }
    if (content.includes('performance') || content.includes('faster') || content.includes('optimiz')) {
        return 'performance';
    }
    return 'new_capability';
}
// Extract a summary from release body
function extractSummary(body, maxLength = 280) {
    if (!body) return 'New release available. Check the release notes for details.';
    // Clean up markdown
    let clean = body.replace(/#{1,6}\s*/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Keep link text only
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/^\s*[-*]\s*/gm, '• ') // Normalize bullets
    .replace(/\n{2,}/g, ' ') // Collapse newlines
    .trim();
    if (clean.length > maxLength) {
        clean = clean.substring(0, maxLength - 3) + '...';
    }
    return clean || 'New release available. Check the release notes for details.';
}
// Fetch releases for a single repo
async function fetchRepoReleases(owner, repo, domains) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=3`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            next: {
                revalidate: 3600
            } // Cache for 1 hour
        });
        if (!response.ok) {
            console.warn(`GitHub API error for ${owner}/${repo}: ${response.status}`);
            return [];
        }
        const releases = await response.json();
        return releases.filter((r)=>!r.draft && !r.prerelease).map((release)=>({
                id: `github-${owner}-${repo}-${release.id}`,
                signalType: detectSignalType(release),
                domains,
                source: 'github',
                sourceUrl: release.html_url,
                publishedAt: release.published_at,
                fetchedAt: new Date().toISOString(),
                whatChanged: `${repo} ${release.tag_name}${release.name && release.name !== release.tag_name ? `: ${release.name}` : ''}`,
                whyItMatters: extractSummary(release.body),
                repoUrl: `https://github.com/${owner}/${repo}`,
                docsUrl: `https://github.com/${owner}/${repo}/releases/tag/${release.tag_name}`
            }));
    } catch (error) {
        console.error(`Error fetching releases for ${owner}/${repo}:`, error);
        return [];
    }
}
async function fetchGitHubReleases() {
    const allReleases = await Promise.all(TRACKED_REPOS.map(({ owner, repo, domains })=>fetchRepoReleases(owner, repo, domains)));
    // Flatten and sort by date
    return allReleases.flat().sort((a, b)=>new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
const githubApi = {
    fetchReleases: fetchGitHubReleases,
    trackedRepos: TRACKED_REPOS
};
}),
"[project]/src/lib/api/signals/hackernews.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Hacker News Algolia API Adapter
// Fetches tech-relevant stories using the Algolia HN Search API
__turbopack_context__.s([
    "fetchHNSignals",
    ()=>fetchHNSignals,
    "hackerNewsApi",
    ()=>hackerNewsApi
]);
// Domain detection based on keywords in title
function detectDomains(title) {
    const lower = title.toLowerCase();
    const domains = [];
    // AI/ML keywords
    if (/\b(ai|gpt|llm|openai|anthropic|claude|gemini|transformer|neural|machine learning|ml|deep learning)\b/.test(lower)) {
        domains.push('ai');
    }
    // Web keywords
    if (/\b(react|vue|svelte|next\.?js|nuxt|astro|tailwind|css|html|javascript|typescript|frontend|web)\b/.test(lower)) {
        domains.push('web');
    }
    // DevOps keywords
    if (/\b(docker|kubernetes|k8s|ci\/cd|terraform|ansible|helm|devops|infrastructure|deploy)\b/.test(lower)) {
        domains.push('devops');
    }
    // Security keywords
    if (/\b(security|cve|vulnerability|exploit|breach|hack|ransomware|malware|zero.?day)\b/.test(lower)) {
        domains.push('security');
    }
    // Cloud keywords
    if (/\b(aws|gcp|azure|cloud|serverless|lambda|s3|cloudflare)\b/.test(lower)) {
        domains.push('cloud');
    }
    // Data keywords
    if (/\b(database|sql|postgres|mysql|mongodb|redis|kafka|spark|data|analytics|bigquery)\b/.test(lower)) {
        domains.push('data');
    }
    // Mobile keywords
    if (/\b(ios|android|swift|kotlin|flutter|react.?native|mobile|app store)\b/.test(lower)) {
        domains.push('mobile');
    }
    // Default to web if no domain detected (most HN content is web-related)
    return domains.length > 0 ? domains : [
        'web'
    ];
}
// Detect signal type from title
function detectSignalType(title) {
    const lower = title.toLowerCase();
    if (/\b(security|cve|vulnerability|breach|exploit)\b/.test(lower)) {
        return 'security_fix';
    }
    if (/\b(breaking|deprecat|removed|sunset)\b/.test(lower)) {
        return 'breaking_change';
    }
    if (/\b(faster|performance|optimiz|speed|benchmark)\b/.test(lower)) {
        return 'performance';
    }
    if (/\b(paper|research|study|arxiv|findings)\b/.test(lower)) {
        return 'research';
    }
    if (/\b(pricing|cost|free|tier|billing)\b/.test(lower)) {
        return 'cost_change';
    }
    return 'new_capability';
}
// Search HN for tech-relevant content
async function searchHN(query, tags = 'story') {
    try {
        const url = new URL('https://hn.algolia.com/api/v1/search');
        url.searchParams.set('query', query);
        url.searchParams.set('tags', tags);
        url.searchParams.set('hitsPerPage', '10');
        url.searchParams.set('numericFilters', 'points>50'); // Only popular stories
        const response = await fetch(url.toString(), {
            next: {
                revalidate: 1800
            } // Cache for 30 minutes
        });
        if (!response.ok) {
            console.warn(`HN Algolia API error: ${response.status}`);
            return [];
        }
        const data = await response.json();
        return data.hits.map((hit)=>({
                id: `hn-${hit.objectID}`,
                signalType: detectSignalType(hit.title),
                domains: detectDomains(hit.title),
                source: 'hackernews',
                sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
                publishedAt: hit.created_at,
                fetchedAt: new Date().toISOString(),
                whatChanged: hit.title,
                whyItMatters: `Trending on Hacker News with ${hit.points} points and ${hit.num_comments} comments. ${hit.story_text?.substring(0, 150) || ''}`.trim()
            }));
    } catch (error) {
        console.error('Error fetching from HN Algolia:', error);
        return [];
    }
}
// Fetch front page stories
async function fetchFrontPage() {
    try {
        const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page', {
            next: {
                revalidate: 900
            }
        } // Cache for 15 minutes
        );
        if (!response.ok) {
            return [];
        }
        const data = await response.json();
        return data.hits.map((hit)=>({
                id: `hn-${hit.objectID}`,
                signalType: detectSignalType(hit.title),
                domains: detectDomains(hit.title),
                source: 'hackernews',
                sourceUrl: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
                publishedAt: hit.created_at,
                fetchedAt: new Date().toISOString(),
                whatChanged: hit.title,
                whyItMatters: `Currently on the Hacker News front page with ${hit.points} points and ${hit.num_comments} comments.`
            }));
    } catch (error) {
        console.error('Error fetching HN front page:', error);
        return [];
    }
}
async function fetchHNSignals() {
    const [frontPage, releases, security] = await Promise.all([
        fetchFrontPage(),
        searchHN('release OR launched OR announcing'),
        searchHN('security OR vulnerability OR CVE')
    ]);
    // Dedupe by objectID
    const seen = new Set();
    const all = [
        ...frontPage,
        ...releases,
        ...security
    ].filter((signal)=>{
        if (seen.has(signal.id)) return false;
        seen.add(signal.id);
        return true;
    });
    return all.sort((a, b)=>new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
const hackerNewsApi = {
    fetchSignals: fetchHNSignals,
    fetchFrontPage,
    search: searchHN
};
}),
"[project]/src/lib/api/signals/arxiv.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// arXiv API Adapter
// Fetches recent CS/AI research papers from arXiv
__turbopack_context__.s([
    "arxivApi",
    ()=>arxivApi,
    "fetchArxivSignals",
    ()=>fetchArxivSignals
]);
// Category to domain mapping
const CATEGORY_DOMAINS = {
    'cs.AI': [
        'ai'
    ],
    'cs.LG': [
        'ai',
        'data'
    ],
    'cs.CL': [
        'ai'
    ],
    'cs.CV': [
        'ai'
    ],
    'cs.NE': [
        'ai'
    ],
    'cs.CR': [
        'security'
    ],
    'cs.DB': [
        'data'
    ],
    'cs.DC': [
        'cloud',
        'devops'
    ],
    'cs.SE': [
        'web',
        'devops'
    ],
    'cs.PL': [
        'web'
    ],
    'cs.HC': [
        'web',
        'mobile'
    ],
    'stat.ML': [
        'ai',
        'data'
    ]
};
// Parse arXiv Atom feed
function parseArxivFeed(xml) {
    const entries = [];
    // Simple regex-based parsing (works for server-side)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    while((match = entryRegex.exec(xml)) !== null){
        const entry = match[1];
        const getId = (str)=>str.match(/<id>([^<]+)<\/id>/)?.[1] || '';
        const getTitle = (str)=>str.match(/<title>([^<]+)<\/title>/)?.[1]?.trim().replace(/\s+/g, ' ') || '';
        const getSummary = (str)=>str.match(/<summary>([^]*?)<\/summary>/)?.[1]?.trim().replace(/\s+/g, ' ') || '';
        const getPublished = (str)=>str.match(/<published>([^<]+)<\/published>/)?.[1] || '';
        const getUpdated = (str)=>str.match(/<updated>([^<]+)<\/updated>/)?.[1] || '';
        // Get authors
        const authorRegex = /<author>\s*<name>([^<]+)<\/name>/g;
        const authors = [];
        let authorMatch;
        while((authorMatch = authorRegex.exec(entry)) !== null){
            authors.push(authorMatch[1]);
        }
        // Get categories
        const categoryRegex = /category[^>]*term="([^"]+)"/g;
        const categories = [];
        let catMatch;
        while((catMatch = categoryRegex.exec(entry)) !== null){
            categories.push(catMatch[1]);
        }
        // Get PDF link
        const pdfMatch = entry.match(/link[^>]*href="([^"]*\/pdf\/[^"]+)"/);
        const absMatch = entry.match(/link[^>]*href="([^"]*\/abs\/[^"]+)"/);
        const id = getId(entry);
        const arxivId = id.split('/').pop()?.replace('abs/', '') || id;
        entries.push({
            id: arxivId,
            title: getTitle(entry),
            summary: getSummary(entry),
            authors,
            published: getPublished(entry),
            updated: getUpdated(entry),
            categories,
            pdfUrl: pdfMatch?.[1] || `https://arxiv.org/pdf/${arxivId}`,
            absUrl: absMatch?.[1] || `https://arxiv.org/abs/${arxivId}`
        });
    }
    return entries;
}
// Determine domains from arXiv categories
function getDomains(categories) {
    const domains = new Set();
    for (const cat of categories){
        const mapped = CATEGORY_DOMAINS[cat];
        if (mapped) {
            mapped.forEach((d)=>domains.add(d));
        }
    }
    return domains.size > 0 ? Array.from(domains) : [
        'ai'
    ];
}
// Truncate summary
function truncateSummary(summary, maxLength = 280) {
    if (summary.length <= maxLength) return summary;
    return summary.substring(0, maxLength - 3) + '...';
}
// Fetch papers from specific categories
async function fetchCategory(category, maxResults = 10) {
    try {
        const url = new URL('https://export.arxiv.org/api/query');
        url.searchParams.set('search_query', `cat:${category}`);
        url.searchParams.set('start', '0');
        url.searchParams.set('max_results', maxResults.toString());
        url.searchParams.set('sortBy', 'submittedDate');
        url.searchParams.set('sortOrder', 'descending');
        const response = await fetch(url.toString(), {
            next: {
                revalidate: 3600
            } // Cache for 1 hour
        });
        if (!response.ok) {
            console.warn(`arXiv API error for ${category}: ${response.status}`);
            return [];
        }
        const xml = await response.text();
        return parseArxivFeed(xml);
    } catch (error) {
        console.error(`Error fetching arXiv ${category}:`, error);
        return [];
    }
}
async function fetchArxivSignals() {
    const priorityCategories = [
        'cs.AI',
        'cs.LG',
        'cs.CL',
        'cs.CV',
        'cs.CR'
    ];
    const allPapers = await Promise.all(priorityCategories.map((cat)=>fetchCategory(cat, 5)));
    // Dedupe by ID
    const seen = new Set();
    const papers = allPapers.flat().filter((paper)=>{
        if (seen.has(paper.id)) return false;
        seen.add(paper.id);
        return true;
    });
    return papers.map((paper)=>({
            id: `arxiv-${paper.id}`,
            signalType: 'research',
            domains: getDomains(paper.categories),
            source: 'arxiv',
            sourceUrl: paper.absUrl,
            publishedAt: paper.published,
            fetchedAt: new Date().toISOString(),
            whatChanged: paper.title,
            whyItMatters: truncateSummary(paper.summary),
            paperUrl: paper.pdfUrl,
            whoShouldCare: paper.authors.slice(0, 3)
        }));
}
const arxivApi = {
    fetchSignals: fetchArxivSignals,
    fetchCategory
};
}),
"[project]/src/lib/api/signals/osv.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// OSV (Open Source Vulnerabilities) API Adapter
// Fetches security vulnerability signals from Google's OSV database
__turbopack_context__.s([
    "fetchOSVSignals",
    ()=>fetchOSVSignals,
    "osvApi",
    ()=>osvApi
]);
// Ecosystem to domain mapping
const ECOSYSTEM_DOMAINS = {
    'npm': [
        'web'
    ],
    'PyPI': [
        'ai',
        'data',
        'web'
    ],
    'Go': [
        'devops',
        'cloud'
    ],
    'crates.io': [
        'web',
        'devops'
    ],
    'RubyGems': [
        'web'
    ],
    'Maven': [
        'web',
        'data'
    ],
    'NuGet': [
        'web'
    ],
    'Packagist': [
        'web'
    ],
    'Hex': [
        'web'
    ],
    'Pub': [
        'mobile'
    ],
    'CocoaPods': [
        'mobile'
    ],
    'SwiftPM': [
        'mobile'
    ],
    'Linux': [
        'devops',
        'security'
    ],
    'Debian': [
        'devops'
    ],
    'Alpine': [
        'devops',
        'cloud'
    ],
    'OSS-Fuzz': [
        'security'
    ]
};
// Priority packages to monitor (high-impact in their ecosystems)
const PRIORITY_PACKAGES = [
    // JavaScript/Node.js
    {
        ecosystem: 'npm',
        name: 'express'
    },
    {
        ecosystem: 'npm',
        name: 'lodash'
    },
    {
        ecosystem: 'npm',
        name: 'axios'
    },
    {
        ecosystem: 'npm',
        name: 'next'
    },
    {
        ecosystem: 'npm',
        name: 'react'
    },
    // Python
    {
        ecosystem: 'PyPI',
        name: 'django'
    },
    {
        ecosystem: 'PyPI',
        name: 'flask'
    },
    {
        ecosystem: 'PyPI',
        name: 'requests'
    },
    {
        ecosystem: 'PyPI',
        name: 'numpy'
    },
    {
        ecosystem: 'PyPI',
        name: 'tensorflow'
    },
    {
        ecosystem: 'PyPI',
        name: 'pytorch'
    },
    // Go
    {
        ecosystem: 'Go',
        name: 'github.com/gin-gonic/gin'
    },
    {
        ecosystem: 'Go',
        name: 'github.com/gorilla/mux'
    }
];
// Get domains from ecosystem
function getDomains(ecosystem) {
    return ECOSYSTEM_DOMAINS[ecosystem] || [
        'security'
    ];
}
// Get severity label
function getSeverityLabel(vuln) {
    if (!vuln.severity?.length) return 'Unknown severity';
    const cvss = vuln.severity.find((s)=>s.type === 'CVSS_V3');
    if (cvss) {
        const score = parseFloat(cvss.score);
        if (score >= 9.0) return 'Critical';
        if (score >= 7.0) return 'High';
        if (score >= 4.0) return 'Medium';
        return 'Low';
    }
    return 'Unknown severity';
}
// Format affected packages
function formatAffected(vuln) {
    if (!vuln.affected?.length) return '';
    const packages = vuln.affected.filter((a)=>a.package).map((a)=>`${a.package.name} (${a.package.ecosystem})`).slice(0, 3);
    return packages.length > 0 ? `Affects: ${packages.join(', ')}` : '';
}
// Get advisory URL
function getAdvisoryUrl(vuln) {
    const advisory = vuln.references?.find((r)=>r.type === 'ADVISORY');
    if (advisory) return advisory.url;
    // Default to OSV.dev page
    return `https://osv.dev/vulnerability/${vuln.id}`;
}
// Get fix/docs URL
function getDocsUrl(vuln) {
    const fix = vuln.references?.find((r)=>r.type === 'FIX' || r.type === 'PACKAGE');
    return fix?.url;
}
// Query vulnerabilities for a specific package
async function queryPackage(ecosystem, name) {
    try {
        const response = await fetch('https://api.osv.dev/v1/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                package: {
                    ecosystem,
                    name
                }
            }),
            next: {
                revalidate: 3600
            } // Cache for 1 hour
        });
        if (!response.ok) {
            console.warn(`OSV API error for ${ecosystem}/${name}: ${response.status}`);
            return [];
        }
        const data = await response.json();
        return data.vulns || [];
    } catch (error) {
        console.error(`Error querying OSV for ${ecosystem}/${name}:`, error);
        return [];
    }
}
async function fetchOSVSignals() {
    const allVulns = await Promise.all(PRIORITY_PACKAGES.map(({ ecosystem, name })=>queryPackage(ecosystem, name)));
    // Dedupe by ID and filter to recent (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const seen = new Set();
    const recentVulns = allVulns.flat().filter((vuln)=>{
        if (seen.has(vuln.id)) return false;
        seen.add(vuln.id);
        const published = new Date(vuln.published);
        return published >= thirtyDaysAgo;
    }).sort((a, b)=>new Date(b.published).getTime() - new Date(a.published).getTime());
    return recentVulns.map((vuln)=>{
        const ecosystem = vuln.affected?.[0]?.package?.ecosystem || 'Unknown';
        const severity = getSeverityLabel(vuln);
        const affected = formatAffected(vuln);
        return {
            id: `osv-${vuln.id}`,
            signalType: 'security_fix',
            domains: [
                ...getDomains(ecosystem),
                'security'
            ],
            source: 'osv',
            sourceUrl: getAdvisoryUrl(vuln),
            publishedAt: vuln.published,
            fetchedAt: new Date().toISOString(),
            whatChanged: `${severity} Vulnerability: ${vuln.id}${vuln.aliases?.[0] ? ` (${vuln.aliases[0]})` : ''}`,
            whyItMatters: `${vuln.summary || 'Security vulnerability discovered.'} ${affected}`.trim(),
            docsUrl: getDocsUrl(vuln)
        };
    });
}
const osvApi = {
    fetchSignals: fetchOSVSignals,
    queryPackage
};
}),
"[project]/src/lib/api/signals/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Unified Signal Aggregator
// Combines signals from all sources into a single feed
__turbopack_context__.s([
    "fetchAllSignals",
    ()=>fetchAllSignals,
    "generateMockSignals",
    ()=>generateMockSignals,
    "signalAggregator",
    ()=>signalAggregator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$github$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/signals/github.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$hackernews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/signals/hackernews.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$arxiv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/signals/arxiv.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$osv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/signals/osv.ts [app-ssr] (ecmascript)");
;
;
;
;
async function fetchAllSignals(options = {}) {
    const { domains, limit = 50, sources = [
        'github',
        'hackernews',
        'arxiv',
        'osv'
    ] } = options;
    const fetchers = [];
    if (sources.includes('github')) {
        fetchers.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$github$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["githubApi"].fetchReleases());
    }
    if (sources.includes('hackernews')) {
        fetchers.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$hackernews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hackerNewsApi"].fetchSignals());
    }
    if (sources.includes('arxiv')) {
        fetchers.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$arxiv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arxivApi"].fetchSignals());
    }
    if (sources.includes('osv')) {
        fetchers.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$osv$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["osvApi"].fetchSignals());
    }
    const results = await Promise.allSettled(fetchers);
    let allSignals = results.filter((r)=>r.status === 'fulfilled').flatMap((r)=>r.value);
    // Filter by domains if specified
    if (domains && domains.length > 0) {
        allSignals = allSignals.filter((signal)=>signal.domains.some((d)=>domains.includes(d)));
    }
    // Sort by published date (newest first)
    allSignals.sort((a, b)=>new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    // Limit results
    return allSignals.slice(0, limit);
}
function generateMockSignals() {
    const mockSignals = [
        {
            id: 'mock-1',
            signalType: 'new_capability',
            domains: [
                'ai'
            ],
            source: 'github',
            sourceUrl: 'https://github.com/openai/openai-python/releases/tag/v1.50.0',
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'OpenAI Python SDK v1.50.0: New Responses API with streaming',
            whyItMatters: 'Adds native support for the new Responses API, enabling structured outputs and tool use with streaming. Breaking: Completion.create() is now async-only.',
            repoUrl: 'https://github.com/openai/openai-python',
            docsUrl: 'https://platform.openai.com/docs'
        },
        {
            id: 'mock-2',
            signalType: 'breaking_change',
            domains: [
                'web'
            ],
            source: 'github',
            sourceUrl: 'https://github.com/vercel/next.js/releases/tag/v15.1.0',
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Next.js 15.1: React 19 is now the default',
            whyItMatters: 'React 19 is now the default React version. Pages using older React patterns may need migration. App Router is now the recommended default.',
            repoUrl: 'https://github.com/vercel/next.js',
            docsUrl: 'https://nextjs.org/docs/upgrading'
        },
        {
            id: 'mock-3',
            signalType: 'security_fix',
            domains: [
                'security',
                'web'
            ],
            source: 'osv',
            sourceUrl: 'https://osv.dev/vulnerability/GHSA-1234',
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Critical Vulnerability: axios < 1.7.5 allows SSRF',
            whyItMatters: 'Server-Side Request Forgery vulnerability in axios affects all versions below 1.7.5. Upgrade immediately if you use axios on the server.',
            docsUrl: 'https://github.com/axios/axios/security/advisories'
        },
        {
            id: 'mock-4',
            signalType: 'research',
            domains: [
                'ai'
            ],
            source: 'arxiv',
            sourceUrl: 'https://arxiv.org/abs/2401.12345',
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Scaling Laws for Reasoning: A Unified Framework',
            whyItMatters: 'New paper from DeepMind presents unified scaling laws for chain-of-thought reasoning, showing 10x compute efficiency gains are possible with optimal prompting.',
            paperUrl: 'https://arxiv.org/pdf/2401.12345'
        },
        {
            id: 'mock-5',
            signalType: 'performance',
            domains: [
                'data',
                'cloud'
            ],
            source: 'github',
            sourceUrl: 'https://github.com/duckdb/duckdb/releases/tag/v1.2.0',
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'DuckDB v1.2.0: 3x faster JSON parsing, native Parquet compression',
            whyItMatters: 'Major performance release with 3x faster JSON ingestion and native zstd Parquet support. Memory usage reduced by 40% for large joins.',
            repoUrl: 'https://github.com/duckdb/duckdb',
            docsUrl: 'https://duckdb.org/docs/changelog'
        },
        {
            id: 'mock-6',
            signalType: 'cost_change',
            domains: [
                'ai',
                'cloud'
            ],
            source: 'hackernews',
            sourceUrl: 'https://news.ycombinator.com/item?id=12345',
            publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Anthropic cuts Claude 3.5 Sonnet pricing by 50%',
            whyItMatters: 'Claude 3.5 Sonnet now costs $1.50/M input tokens (down from $3). Makes it competitive with GPT-4-mini for production workloads.'
        },
        {
            id: 'mock-7',
            signalType: 'new_capability',
            domains: [
                'devops',
                'cloud'
            ],
            source: 'github',
            sourceUrl: 'https://github.com/kubernetes/kubernetes/releases/tag/v1.32.0',
            publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Kubernetes v1.32: Native sidecar containers, improved GPU scheduling',
            whyItMatters: 'Sidecar containers are now GA! Built-in lifecycle management for sidecars. Also adds DRA (Dynamic Resource Allocation) for better GPU/TPU scheduling.',
            repoUrl: 'https://github.com/kubernetes/kubernetes',
            docsUrl: 'https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/'
        },
        {
            id: 'mock-8',
            signalType: 'new_capability',
            domains: [
                'mobile'
            ],
            source: 'github',
            sourceUrl: 'https://github.com/flutter/flutter/releases/tag/v3.25.0',
            publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
            fetchedAt: new Date().toISOString(),
            whatChanged: 'Flutter 3.25: Native web components, improved iOS compilation',
            whyItMatters: 'Flutter web apps can now use native web components directly. iOS builds are 25% faster with the new compilation pipeline.',
            repoUrl: 'https://github.com/flutter/flutter',
            docsUrl: 'https://flutter.dev/docs/whats-new'
        }
    ];
    return mockSignals;
}
const signalAggregator = {
    fetchAll: fetchAllSignals,
    mockSignals: generateMockSignals
};
}),
"[project]/src/components/ui/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger,
    "tabsListVariants",
    ()=>tabsListVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Tabs({ className, orientation = "horizontal", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        "data-orientation": orientation,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
const tabsListVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col", {
    variants: {
        variant: {
            default: "bg-muted",
            line: "gap-1 bg-transparent"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function TabsList({ className, variant = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(tabsListVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent", "data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground", "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 outline-none", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/feed/FeedContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedContainer",
    ()=>FeedContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feed$2f$SignalCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feed/SignalCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feed$2f$FeedFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feed/FeedFilters.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/signals/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rss$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rss$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rss.js [app-ssr] (ecmascript) <export default as Rss>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
'use client';
;
;
;
;
;
;
;
;
;
function FeedContainer() {
    const [activeDomain, setActiveDomain] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('all');
    const [activeTab, setActiveTab] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('stream');
    const [savedSignals, setSavedSignals] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Set());
    // For now, use mock signals. In production, switch to signalAggregator.fetchAll()
    const { data: signals, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'signals',
            activeDomain
        ],
        queryFn: async ()=>{
            // Use mock signals for demo - switch to real API when ready:
            // return signalAggregator.fetchAll({ 
            //     domains: activeDomain === 'all' ? undefined : [activeDomain],
            //     limit: 30 
            // });
            let allSignals = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$signals$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signalAggregator"].mockSignals();
            if (activeDomain !== 'all') {
                allSignals = allSignals.filter((s)=>s.domains.includes(activeDomain));
            }
            return allSignals;
        },
        staleTime: 1000 * 60 * 5
    });
    const handleSave = (id)=>{
        setSavedSignals((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };
    // Enrich signals with saved state
    const enrichedSignals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!signals) return [];
        return signals.map((signal)=>({
                ...signal,
                isSaved: savedSignals.has(signal.id)
            }));
    }, [
        signals,
        savedSignals
    ]);
    // Filter for "My Tokens" tab
    const displayedSignals = activeTab === 'my-tokens' ? enrichedSignals.filter((s)=>s.isSaved) : enrichedSignals;
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-[50vh] p-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground mb-4",
                    children: "Unable to load signals. Please try again."
                }, void 0, false, {
                    fileName: "[project]/src/components/feed/FeedContainer.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>window.location.reload(),
                    className: "text-primary hover:underline text-sm",
                    children: "Retry"
                }, void 0, false, {
                    fileName: "[project]/src/components/feed/FeedContainer.tsx",
                    lineNumber: 69,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/feed/FeedContainer.tsx",
            lineNumber: 67,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl mx-auto px-4 py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                            value: activeTab,
                            onValueChange: (v)=>setActiveTab(v),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                                className: "w-full grid grid-cols-2 h-9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                        value: "stream",
                                        className: "text-xs gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rss$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rss$3e$__["Rss"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                                lineNumber: 88,
                                                columnNumber: 33
                                            }, this),
                                            "Token Stream"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                        lineNumber: 87,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                        value: "my-tokens",
                                        className: "text-xs gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                                lineNumber: 92,
                                                columnNumber: 33
                                            }, this),
                                            "My Tokens"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                        lineNumber: 91,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                lineNumber: 86,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                            lineNumber: 85,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/feed/FeedContainer.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feed$2f$FeedFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeedFilters"], {
                        activeDomain: activeDomain,
                        onDomainChange: setActiveDomain
                    }, void 0, false, {
                        fileName: "[project]/src/components/feed/FeedContainer.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/feed/FeedContainer.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto w-full px-4 pt-4 pb-20 space-y-3",
                children: [
                    isLoading ? // Skeleton Loading State
                    Array.from({
                        length: 4
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 p-4 border border-border/40 rounded-xl bg-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-5 w-24 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-4 w-12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 114,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 115,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-4 w-20"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 116,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                    lineNumber: 112,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-5 w-4/5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-12 w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                    lineNumber: 119,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2 border-t border-border/40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-14 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 121,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-14 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 122,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 123,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-16 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                            lineNumber: 124,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/feed/FeedContainer.tsx",
                                    lineNumber: 120,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                            lineNumber: 111,
                            columnNumber: 25
                        }, this)) : displayedSignals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-sm",
                            children: activeTab === 'my-tokens' ? "No saved signals yet. Save signals from the Token Stream to see them here." : "No signals found for this filter."
                        }, void 0, false, {
                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                            lineNumber: 130,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/feed/FeedContainer.tsx",
                        lineNumber: 129,
                        columnNumber: 21
                    }, this) : displayedSignals.map((signal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feed$2f$SignalCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignalCard"], {
                            signal: signal,
                            onSave: handleSave
                        }, signal.id, false, {
                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                            lineNumber: 138,
                            columnNumber: 25
                        }, this)),
                    !isLoading && displayedSignals.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: activeTab === 'my-tokens' ? `${displayedSignals.length} saved signal${displayedSignals.length !== 1 ? 's' : ''}` : "You're all caught up!"
                        }, void 0, false, {
                            fileName: "[project]/src/components/feed/FeedContainer.tsx",
                            lineNumber: 148,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/feed/FeedContainer.tsx",
                        lineNumber: 147,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/feed/FeedContainer.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feed/FeedContainer.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=src_7ed32d6c._.js.map