<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { IResponseData } from "@/@types/utils.request";

import IconSvg from "@/components/IconSvg/index.vue";
import TypeSelect from "./components/TypeSelect/index.vue";
import { ITableData, ITableListItem } from "./data";
import { queryList } from "./service";
import { formatDate } from "@/utils/index";
const table = reactive<ITableData>({
	loading: false,
	list: [],
	pagination: {
		total: 0,
		current: 1,
		pageSize: 20,
	},
});

// 充值记录

const getList = async (current: number): Promise<void> => {
	table.loading = true;

	const apiUrl = "http://184.168.123.91:8080/add2";

	fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...searchModelRef,
			page: table.pagination.current, // 当前页
			pageSize: table.pagination.pageSize, // 每页数量
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			table.loading = false;
			table.list = data.rows || [];

			table.pagination = {
				total: data.page_.totalPage || 0, // 记录总数
				current: data.page_.carrPage,
				pageSize: 20,
			};
		})
		.catch((error) => {
			// 处理错误
			table.loading = false;
			console.error(error);
		});
};
onMounted(() => {
	getList(1);
});

const searchModelRef = reactive({
	issue: null,
	hash: "",
	adrress: "",
});

// 查询条件变化
watch(
	() => searchModelRef,
	() => {
		getList(1);
	},
	{
		deep: true,
	},
);
</script>
<template>
	<el-card shadow="never" style="margin-bottom: 15px" :body-style="{ 'padding-bottom': '0' }">
		<el-form :model="searchModelRef" ref="searchFormRef" label-width="80px">
			<el-row type="flex" class="flex-wrap-wrap">
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="期数：">
						<el-input placeholder="1" v-model.number="searchModelRef.issue" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="hash：">
						<el-input placeholder="" v-model="searchModelRef.hash" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="address：">
						<el-input placeholder="" v-model="searchModelRef.adrress" />
					</el-form-item>
				</el-col>
				<!-- <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="链接：">
						<el-input placeholder="请输入" v-model="searchModelRef.href" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="位置：">
						<TypeSelect placeholder="请选择" v-model="searchModelRef.type" style="width: 100%" />
					</el-form-item>
				</el-col>
				<el-col v-if="searchOpen" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="备注：">
						<el-input placeholder="请输入" v-model="searchModelRef.desc" />
					</el-form-item>
				</el-col> -->
				<!-- <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<div style="padding-bottom: 24px; text-align: right">
						<el-button type="primary" @click="searchFormSubmit">查询</el-button>
						<el-button @click="searchResetFields">重置</el-button>
						<el-button type="primary" link style="margin-left: 8px" @click="setSearchOpen">
							<template v-if="searchOpen"> 收起 <IconSvg name="arrow-up"></IconSvg> </template>
							<template v-else> 展开 <IconSvg name="arrow-down"></IconSvg> </template>
						</el-button>
					</div>
				</el-col> -->
			</el-row>
		</el-form>
	</el-card>

	<el-card shadow="never">
		<!-- <template #header>
			<el-row>
				<el-col :span="8">
					<el-button type="primary">新增</el-button>
				</el-col>
				<el-col :span="16"> </el-col>
			</el-row>
		</template> -->

		<div style="width: 99.9%">
			<el-table row-key="id" :data="table.list" v-loading="table.loading">
				<el-table-column type="index" label="序号" :index="(index: any) => {
					return (table.pagination.current - 1) * table.pagination.pageSize + index + 1;
				}
					" width="80">
				</el-table-column>

				<el-table-column label="adrress" prop="adrress">
					<template #default="{ row }">
						{{ row.adrress }}
					</template>
				</el-table-column>

				<el-table-column label="hash" prop="hash">
					<template #default="{ row }">
						{{ row.hash }}
					</template>
				</el-table-column>

				<el-table-column label="期数" prop="issue">
					<template #default="{ row }">
						{{ row.issue }}
					</template>
				</el-table-column>

				<el-table-column label="交易时间" prop="time">
					<template #default="{ row }">
						{{ formatDate(new Date(row.time)) }}
					</template>
				</el-table-column>

				<el-table-column label="交易金额  ton" prop="val">
					<template #default="{ row }">
						{{ (row.val / 1000000000).toFixed(4) }}
					</template>
				</el-table-column>

				<!-- <el-table-column label="操作" prop="action" width="160">
					<template #default>
						<el-button type="primary" link>编辑</el-button>
						<el-button type="primary" link>删除</el-button>
					</template>
				</el-table-column> -->
			</el-table>
		</div>

		<div class="padding-t10">
			<el-pagination background layout="prev, pager, next" v-model:current-page="table.pagination.current"
				:page-size="table.pagination.pageSize" :total="table.pagination.total * table.pagination.pageSize"
				@current-change="(p: any) => {
					getList(p || 1);
				}
					">
			</el-pagination>
		</div>
	</el-card>
</template>
