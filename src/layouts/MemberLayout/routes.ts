import { RouteRecordRaw } from "vue-router";
import { homePath } from "@/config/settings";

const MemberLayoutRoutes: RouteRecordRaw[] = [
	{
		meta: {
			title: "系统设置",
			// icon: "menu-home",
		},
		path: "/sys",
		component: () => import("@/pages/index/index.vue"),
	},
	{
		meta: {
			title: "充值记录",
			// icon: "menu-home",
		},
		path: "/rechargeRecords",
		component: () => import("@/pages/rechargeRecords/filter/index.vue"),
	},
	{
		name: "filter2",
		meta: {
			title: "中奖记录",
			// icon: "menu-home",
		},
		path: "/filter2",
		component: () => import("@/pages/RecordsPast/filter2/index.vue"),
	},
	// {
	// 	meta: {
	// 		title: "历史期数",
	// 		icon: "menu-home",
	// 	},
	// 	path: "/RecordsPast",
	// 	children: [
	// 		{
	// 			name: "filter1",
	// 			meta: {
	// 				title: "参与信息",
	// 				isKeepAlive: true,
	// 			},
	// 			path: "filter1",
	// 			component: () => import("@/pages/RecordsPast/filter1/index.vue"),
	// 		},
	// 		{
	// 			name: "filter2",
	// 			meta: {
	// 				title: "中奖记录",
	// 				isKeepAlive: true,
	// 			},
	// 			path: "filter2",
	// 			component: () => import("@/pages/RecordsPast/filter2/index.vue"),
	// 		},
	// 		{
	// 			name: "filter3",
	// 			meta: {
	// 				title: "哈希排序",
	// 				isKeepAlive: true,
	// 			},
	// 			path: "filter3",
	// 			component: () => import("@/pages/RecordsPast/filter3/index.vue"),
	// 		},
	// 	],
	// },



	// {
	// 	meta: {
	// 		title: "工作台",
	// 		icon: "menu-home",
	// 	},
	// 	path: homePath,
	// 	component: () => import("@/pages/index/index.vue"),
	// },

	// {
	// 	meta: {
	// 		title: "表单页",
	// 		icon: "menu-edit",
	// 	},
	// 	path: "/form",
	// 	children: [
	// 		{
	// 			name: "FormBase",
	// 			meta: {
	// 				title: "基础表单",
	// 				isKeepAlive: true,
	// 			},
	// 			path: "basic",
	// 			component: () => import("@/pages/form/base/index.vue"),
	// 		},
	// 		{
	// 			name: "FormStep",
	// 			meta: {
	// 				title: "分步表单",
	// 				isKeepAlive: true,
	// 			},
	// 			path: "step",
	// 			component: () => import("@/pages/form/step/index.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	meta: {
	// 		title: "列表页",
	// 		icon: "menu-list",
	// 	},
	// 	path: "/list",
	// 	children: [
	// 		{
	// 			meta: {
	// 				title: "基础列表",
	// 			},
	// 			path: "basic",
	// 			component: () => import("@/pages/list/basic/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "筛选列表",
	// 			},
	// 			path: "filter",
	// 			component: () => import("@/pages/list/filter/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "高度自适应",
	// 			},
	// 			path: "highlyAdaptive",
	// 			component: () => import("@/pages/list/highlyAdaptive/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "高度自适应2",
	// 			},
	// 			path: "highlyAdaptive2",
	// 			component: () => import("@/pages/list/highlyAdaptive2/index.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	meta: {
	// 		title: "详情页",
	// 		icon: "menu-detail",
	// 	},
	// 	path: "/detail",
	// 	children: [
	// 		{
	// 			meta: {
	// 				title: "详情页1",
	// 			},
	// 			path: "basic",
	// 			component: () => import("@/pages/detail/basic/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "详情页2",
	// 			},
	// 			path: "module",
	// 			component: () => import("@/pages/detail/module/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "详情页3",
	// 			},
	// 			path: "table",
	// 			component: () => import("@/pages/detail/table/index.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	meta: {
	// 		title: "结果页",
	// 		icon: "menu-result",
	// 	},
	// 	path: "/result",
	// 	children: [
	// 		{
	// 			meta: {
	// 				title: "成功",
	// 			},
	// 			path: "success",
	// 			component: () => import("@/pages/result/success/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "失败",
	// 			},
	// 			path: "fail",
	// 			component: () => import("@/pages/result/fail/index.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	meta: {
	// 		title: "异常提示页面",
	// 		icon: "menu-anomaly",
	// 	},
	// 	path: "/exception",
	// 	children: [
	// 		{
	// 			meta: {
	// 				title: "member-layout.menu.exception.403",
	// 			},
	// 			path: "403",
	// 			component: () => import("@/pages/exception/403/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "member-layout.menu.exception.404",
	// 			},
	// 			path: "404",
	// 			component: () => import("@/pages/exception/404/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "member-layout.menu.exception.500",
	// 			},
	// 			path: "500",
	// 			component: () => import("@/pages/exception/500/index.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	meta: {
	// 		title: "权限验证",
	// 		icon: "menu-permission",
	// 	},
	// 	path: "/permission",
	// 	children: [
	// 		{
	// 			meta: {
	// 				title: "所有用户都有权限",
	// 			},
	// 			path: "all",
	// 			component: () => import("@/pages/permission/all/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "User用户有权限",
	// 				roles: ["user"],
	// 			},
	// 			path: "user",
	// 			component: () => import("@/pages/permission/user/index.vue"),
	// 		},
	// 		{
	// 			meta: {
	// 				title: "Test用户有权限",
	// 				roles: ["test"],
	// 			},
	// 			path: "test",
	// 			component: () => import("@/pages/permission/test/index.vue"),
	// 		},
	// 	],
	// },
	// {
	// 	meta: {
	// 		title: "member-layout.menu.routeMetaExtend",
	// 		icon: "router",
	// 	},
	// 	path: "/routeMetaExtend",
	// 	children: [
	// 		{
	// 			meta: {
	// 				title: "member-layout.menu.routeMetaExtend.breadcrumb",
	// 				breadcrumb: [
	// 					{
	// 						title: "member-layout.menu.routeMetaExtend.breadcrumb",
	// 						path: "",
	// 					},
	// 					{
	// 						title: "首页",
	// 						path: "/home",
	// 					},
	// 					{
	// 						title: "liqingsong.cc",
	// 						path: "http://liqingsong.cc",
	// 					},
	// 				],
	// 				tabNavCloseBefore: (close: () => void): void => {
	// 					if (window.confirm("确认关闭吗")) {
	// 						close();
	// 					}
	// 				},
	// 			},
	// 			path: "breadcrumb",
	// 			component: () => import("@/pages/routeMetaExtend/breadcrumb/index.vue"),
	// 		},
	// 	],
	// },
];

export default MemberLayoutRoutes;
