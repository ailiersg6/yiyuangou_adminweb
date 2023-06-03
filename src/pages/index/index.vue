<script lang="ts">
export default {
	name: "FormBase",
};
</script>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElLoading, ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { IFormData } from "./data";
interface IFormData {
	product: string; // 产品名称
	productValue: number; // 产品价值
	productLimit: number; // 最低有效金额
	productP: number; //中奖人数
	wintime: number; // 开奖时间间隔 分钟
	productN: number; //  有效参与人数
	open: 1 | 0; // 抢单开关 是否开启
	issue: number; // 当前期数
	// radio1: string;
	// radio2: string;
	// checkbox: string[];
	// remark: string;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<IFormData>({
	product: "",
	productValue: 0,
	productLimit: 100000000,
	productP: 1,
	wintime: 100, //分钟
	open: 1,
	productN: 10,
	issue: 1,
});
onMounted(() => {
	getdata();
});
function getdata() {
	// http://103.56.115.196:8080/product1

	const loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	const apiUrl = "http://103.56.115.196:8080/product1";

	fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: "{}",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			delete data.rows[0].id;
			Object.assign(ruleForm, { ...data.rows[0] });

			loading.close();
		})
		.catch((error) => {
			// 处理错误
			console.error(error);
			loading.close();
		});
}

const rules = reactive<FormRules>({
	name: [
		{ required: true, message: "请输入标题", trigger: "blur" },
		{ min: 3, max: 5, message: "标题长度3到5个字", trigger: "blur" },
	],
	date: [
		{
			required: true,
			message: "起止日期不能为空",
			trigger: "change",
			type: "array",
		},
	],
	select: [
		{
			required: true,
			message: "请选择",
		},
	],
	radio1: [],
	radio2: [
		{
			required: true,
			message: "请选择",
		},
	],
	checkbox: [],
	remark: [],
});
// 修改产品
function submData() {
	const apiUrl = "http://103.56.115.196:8080/product";

	fetch(apiUrl, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...ruleForm }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			ElMessage.success("提交成功");
			console.log(data);
		})
		.catch((error) => {
			// 处理错误
			console.error(error);
		});

	if (ruleForm.open == 1) {
	}
}
// 设置open  =1

function editOpen() {
	return new Promise((resolve) => {
		const apiUrl = "http://103.56.115.196:8080/product";

		fetch(apiUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ open: 1 }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// 处理响应数据
				resolve(true);
			})
			.catch((error) => {
				// 处理错误
				console.error(error);
				resolve(false);
			});
	});
}

const submitForm = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef.value?.validate();
		if (valid === true) {
			submData();
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};
const resetForm = async () => {
	ruleFormRef.value?.resetFields();
};
// 开始抢单
const onStart = async () => {
	const loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	await editOpen(); //  设置open = 1

	const apiUrl = "http://103.56.115.196:8080/rewarded";

	fetch(apiUrl, {
		method: "Post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ open: 1 }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			// getdata();
			// loading.close();
			// ElMessage.success("抢单开始");
		})
		.catch((error) => {
			// 处理错误
			// console.error(error);
			// loading.close();
		});

	setTimeout(() => {
		getdata();
		loading.close();
		ElMessage.success("抢单开始");
	}, 2000);
};
// 停止活动
const onStop = async () => {
	const apiUrl = "http://103.56.115.196:8080/product3";
	// 停止活动
	fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			ElMessage.success("活动结束");
			getdata();
		})
		.catch((error) => {
			// 处理错误
			console.error(error);
		});
};
// 提现
const onWithdr = () => {
	ElMessageBox.confirm("注意！ 将提现到部署此合约的钱包中。", "Warning", {
		confirmButtonText: "提现",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(() => {
			const apiUrl = "http://103.56.115.196:8080/withdraw1";
			// 停止活动
			fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					// 处理响应数据
					ElMessage.success("提现成功！ 有几秒延迟");
				})
				.catch((error) => {
					// 处理错误
					console.error(error);
				});
		})
		.catch(() => {});
};
</script>

<template>
	<el-card shadow="never" :inline="true">
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			:rules="rules"
			label-position="top"
			label-width="120px"
			require-asterisk-position="right"
			style="max-width: 900px"
		>
			<el-form-item label="产品名称" prop="product">
				<el-input v-model="ruleForm.product" placeholder="请输入产品名称" />
			</el-form-item>
			<el-form-item label="产品价值" prop="productValue">
				<el-input v-model.number="ruleForm.productValue" placeholder="产品价值" />
			</el-form-item>
			<el-form-item label="最低有效金额( ton货币有9位小数 1个币 = 1000000000 )" prop="productLimit">
				<el-input v-model.number="ruleForm.productLimit" placeholder="最低有效金额" />
			</el-form-item>
			<el-form-item label="中奖人数" prop="productP">
				<el-input v-model.number="ruleForm.productP" placeholder="中奖人数" />
			</el-form-item>
			<el-form-item label="有效参与人数" prop="productN">
				<el-input v-model.number="ruleForm.productN" placeholder="有效参与人数" />
			</el-form-item>
			<el-form-item label="开奖时间间隔 （分钟）" prop="wintime">
				<el-input v-model.number="ruleForm.wintime" placeholder="开奖时间间隔" />
			</el-form-item>
			<el-form-item label="期数" prop="issue">
				<el-input v-model.number="ruleForm.issue" placeholder="期数" />
			</el-form-item>

			<el-form-item label="开启状态" prop="open">
				<span v-if="ruleForm.open == 1" style="color: #15e307">已经开启</span>
				<span v-else style="color: red">已关闭</span>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()"> 保存设置 </el-button>
				<!-- <el-button @click="resetForm()">重置</el-button> -->
				<el-button type="success" @click="onStart()" :disabled="ruleForm.open == 1">开启活动</el-button>
				<el-button type="danger" @click="onStop()" :disabled="ruleForm.open == 0">停止活动</el-button>
			</el-form-item>

			<el-divider />
			<el-form-item>
				<el-button type="success" @click="onWithdr()">提现</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<style scoped lang="scss"></style>
